from flask import Flask, jsonify, request
import speech_recognition as sr
import pyttsx3
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
import random
import threading
from urllib.parse import quote_plus
import pymongo
from flask_cors import CORS
from flask_socketio import SocketIO
import smtplib
from bson import json_util

sender_email = 'ecommerce0617@gmail.com'
receiver_email = 'tippatninad17@gmail.com'
app_password = 'jxeyjqekoxbzzrrd'

message = """\
Subject: VoiceBank Credentials

This is a Credentials email sent from VoiceBank."""

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login(sender_email, app_password)


# Prepare dataset with utterances and intents
data = {
    "utterance": [
        "I don't have an online account, what do I have to do to register?",
        "i want an online account, create one",
        "I don't have a user account, how do I create one?",
        "I want a user account, open one",
        "I don't have a user account, register",
        "Send money to someone",
        "Help me doing a transaction",
        "Transfer money",
        "I want to do a transaction.",
        "I want to transfer money"

    ],
    "intent": [
        "create_account",
        "create_account",
        "create_account",
        "create_account",
        "create_account",
        "transaction",
        "transaction",
        "transaction",
        "transaction",
        "transaction"
    ]
}

df = pd.DataFrame(data)
# Define and train intent recognition model
model = Pipeline([
    ("vectorizer", CountVectorizer()),
    ("classifier", RandomForestClassifier())
])

model.fit(df["utterance"], df["intent"])

# Creating mongo database which I think is useless
username = quote_plus("sahil")
password = quote_plus("sa123")
client = pymongo.MongoClient("mongodb+srv://sahil:sa123@cluster1.ybwic8i.mongodb.net/?retryWrites=true&w=majority")
db = client["bank"]
account_collection = db["accounts"]
transaction_collection = db["transactions"]



# Initialize speech recognition and text-to-speech engines
engine = pyttsx3.init()

# Create a global flag to control the speech recognition loop
listening = False
sender_account=None

def generate_response(response_text):
    # Generate text output
    print(response_text)
    # Emit the response text through the WebSocket connection
    socketio.emit('response', response_text)
    # Start the speech synthesis loop
    # engine.startLoop()
    # Generate voice output
    engine.say(response_text)
    engine.startLoop(False)
    # engine.runAndWait()
    engine.iterate()  # Process the speech synthesis events
    engine.endLoop()
    
    return response_text

def get_voice_input():
    while True:
        # Initialize the speech recognition engine
        # print("before")
        r = sr.Recognizer()
        # print("after")
        # Use the default microphone as the audio source
        with sr.Microphone() as source:
            print("Speak now...")
            # Adjust the ambient noise level for better recognition
            r.adjust_for_ambient_noise(source)
            # Listen for the user's voice input
            audio = r.listen(source)
        # Convert the audio to text
        try:
            user_input = r.recognize_google(audio)
            generate_response("You said: " + user_input)
            # Output the text response in voice
            # engine.say("You said " + user_input)
            # engine.runAndWait()
            return user_input
        except sr.UnknownValueError:
            # If the speech recognition engine can't recognize the user's voice input
            engine.say("Sorry, I could not understand your voice input. Please try again.")
            engine.startLoop(False)
            # engine.runAndWait()
            engine.iterate()  # Process the speech synthesis events
            engine.endLoop()
            return
        except sr.RequestError:
            generate_response("Sorry, my speech service is down")
            # engine.runAndWait()
            return ""

def store_transaction_data(transaction_data):
    transaction_collection.insert_one(transaction_data)
    generate_response("Transaction data stored successfully.")

def store_deposit_data(deposit_data):
    # updatedBalance=balance+deposit_data
    # account_collection.update_one(
    #     {'account_number': int(account_number)},
    #     {'$set': {'balance': updatedBalance}}
    # )
    generate_response("Deposited Success")

def store_account_data(account_data):
    account_collection.insert_one(account_data)

def create_bank_account(name,address,balance):
    # Generate a random account number
    account_number = random.randint(100, 999)
    # Store account data in MongoDB or any other database
    account_data = {
        "name": name,
        "address": address,
        "balance": balance,
        "account_number": account_number
    }
    store_account_data(account_data)
    generate_response(f"Your account has been created successfully.")
    # generate_response(f"Your account has been created successfully. Your account number is {account_number}.")
    # Return the account number to the user
    return account_number

def listen():
    global listening
    global sender_account
    print(sender_account)
    generate_response("Hi, I am your virtual assistant, how can I assist you?")
    # print( "Hi, I am your virtual assistant")
    user_input = get_voice_input().lower()
    # print( user_input )
    # Predict the intent using the trained model
    predicted_intent = model.predict([user_input])[0]
    # Generate the response text based on the predicted intent
    if predicted_intent == "create_account":
        # response_text="You want to create an account."
        # generate_response(response_text)
        generate_response("What is your name?")
        name = get_voice_input().lower()
        while True:
            generate_response(f"Your name is {name}. Is that correct?")  # Confirmation prompt
            confirmation = get_voice_input().lower()
            if confirmation == "yes" or confirmation == "yes yes" or confirmation == "ha" or confirmation == "ya" or confirmation == "true" or confirmation == "absolutely":
                break
            else:
                generate_response("Please enter your name again.")
                name = get_voice_input().lower()
        generate_response("What is your address?")
        address = get_voice_input().lower()
        while True:
            generate_response(f"Your address is {address}. Is that correct?")  # Confirmation prompt
            confirmation = get_voice_input().lower()
            if confirmation == "yes" or confirmation == "yes yes" or confirmation == "ha" or confirmation == "ya" or confirmation == "true" or confirmation == "absolutely":
                break
            else:
                generate_response("Please enter your address again.")
                address = get_voice_input().lower()
        generate_response("How much would you like to deposit into your new account?")
        balance = get_voice_input().lower()
        while True:
            generate_response(f"You would like to deposit {balance}. Is that correct?")  # Confirmation prompt
            confirmation = get_voice_input()
            if confirmation == "yes" or confirmation == "yes yes" or confirmation == "ha" or confirmation == "ya" or confirmation == "true" or confirmation == "absolutely":
                break
            else:
                generate_response("Please enter the deposit amount again.")
                balance = get_voice_input().lower()
        account_number = create_bank_account(name,address,balance)
        generate_response(f"Your new account number is {account_number}.")
        server.sendmail('ecommerce0617@gmail.com', 'tippatninad17@gmail.com', f"Your new account number is {account_number}.")
        return

    elif predicted_intent == "transaction":
        # generate_response("You want to perform a transaction.")
        generate_response("would you like to transfer money or deposit money?")
        u_input=get_voice_input().lower()
        if u_input == "transfer" or u_input == "transfer money":
            # generate_response("Please enter your account number.")
            while True:
                
                generate_response(f"Your account number is {sender_account}.")  # Confirmation prompt
                sender_document = account_collection.find_one({"account_number":int(sender_account)})
                # print(sender_document)
                # if sender_document is None:
                #     generate_response("Sender account not found. Transaction stopped.")
                #     break
                # else:
                #     generate_response("Please enter your account number again.")
                #     sender_account = get_voice_input().lower()
                generate_response("Please enter the receiver's account number.")
                receiver_account = get_voice_input().lower()
                while True:
                    generate_response(f"The recipient's account number is {receiver_account}. Is that correct?")  # Confirmation prompt
                    confirmation = get_voice_input().lower()
                    if confirmation == "yes" or confirmation == "yes yes" or confirmation == "ha" or confirmation == "ya" or confirmation == "true" or confirmation == "absolutely":
                        receiver_document = account_collection.find_one({"account_number": int(receiver_account)})
                        print(receiver_document)
                        if receiver_document is None:
                            generate_response("Receiver account not found.")
                            break
                    else:
                        generate_response("Please enter the recipient's account number again.")
                        receiver_account = get_voice_input().lower()
                        receiver_document = account_collection.find_one({"account_number": int(receiver_account)})
                        # print(receiver_document)
                    generate_response("Please enter the amount to transfer.")
                    amount = float(get_voice_input().lower())
                    while True:
                        generate_response(f"The amount to transfer is {amount}. Is that correct?") # Confirmation prompt
                        confirmation = get_voice_input().lower()
                        if confirmation == "yes" or confirmation == "yes yes" or confirmation == "ha" or confirmation == "ya" or confirmation == "true" or confirmation == "absolutely":
                            sender_balance = float(sender_document["balance"])
                        else:
                            generate_response("Please enter the amount to transfer again.")
                            amount = float(get_voice_input().lower())

                        # sender_balance = float(sender_document["balance"])
                        if amount > sender_balance:
                            generate_response("Insufficient balance. Transaction cannot be processed.")
                            break
                        else:
                            # Deduct amount from sender's account
                            new_sender_balance = float(sender_balance) - amount
                            account_collection.update_one({"account_number": int(sender_account)}, {"$set": {"balance": new_sender_balance}})

                            # Add amount to receiver's account
                            receiver_balance = receiver_document["balance"]
                            new_receiver_balance = float(receiver_balance) + amount
                            account_collection.update_one({"account_number": int(receiver_account)}, {"$set": {"balance": new_receiver_balance}})

                            print(new_sender_balance)
                            print(new_receiver_balance)
                            # Store transaction data in the transactions collection
                            transaction_data = {
                                "sender_account": sender_account,
                                "receiver_account": receiver_account,
                                "amount": amount
                            }
                            store_transaction_data(transaction_data)

                            generate_response("Your transaction has been processed successfully.")
                            stop_listening()
                            break
                    break
                break
                
        elif u_input == "deposit" or u_input == "deposit money":
            deposit_account = sender_account
            generate_response(f"Your account number is {deposit_account}.")  # Confirmation prompt
            # sender_document = account_collection.find_one({"account_number":int(deposit_account)})
            # print(sender_document)
                
            generate_response("How much would you like to deposit in your account?")
            deposit_data = float(get_voice_input().lower())
            while True:
                generate_response(f"Your would like to deposit {deposit_data}. Is that correct?")  # Confirmation prompt
                confirmation = get_voice_input().lower()
                if confirmation == "yes" or confirmation == "yes yes" or confirmation == "ha" or confirmation == "ya" or confirmation == "true" or confirmation == "absolutely":
                    sender_document = account_collection.find_one({"account_number":int(deposit_account)})
                    account_balance = sender_document["balance"]
                else:
                    generate_response("Please enter the amount you want to deposit.")
                    deposit_data = float(get_voice_input().lower())
                new_account_balance = float(account_balance) + deposit_data
                account_collection.update_one({"account_number": int(deposit_account)}, {"$set": {"balance": new_account_balance}})
                print(new_account_balance)
                # Store transaction data in the transactions collection
                transaction_data = {
                    "receiver_account": sender_account,
                    "deposit_amount": deposit_data
                }
                generate_response("Your amount has been deposited Successfully")
                store_transaction_data(transaction_data)
                stop_listening()
                # store_deposit_data(transaction_data)
                break
        

    else:
        generate_response("I'm sorry, I didn't understand what you're looking for.")

    # return jsonify({'responseText': generate_response()})



app = Flask(__name__)
CORS(app)  # Initialize CORS
socketio = SocketIO(app, cors_allowed_origins='http://localhost:3000')


@app.route('/api/start_listening', methods=['POST'])
def start_listening():
    global listening

    if not listening:
        listening = True
        threading.Thread(target=listen).start()


    return jsonify({'success': True})


@app.route('/api/stop_listening', methods=['POST'])
def stop_listening():
    global listening, listening_thread

    if listening:
        listening = False
        listening_thread.join()
        listening_thread = None

    return jsonify({'success': True})

@app.route('/api/start-transaction/<account_number>', methods=['POST', 'GET']) 
def transactionStart(account_number):
    global listening
    global sender_account

    if not listening:
        listening = True
        # print(account_number)
        sender_account=account_number
        # session['account_number'] = account_number  # Remove request.json.get('account_number')
        threading.Thread(target=listen).start()

    return jsonify({'success': True})


        

@app.route('/update-phone', methods = ['PUT'])
def updateDataPhone():
    # currentCollection = mongo.db.accounts
    account_number = request.json["account_number"]
    phone = request.json['phone']
    password = request.json['password']
    account_collection.update_one(
        {'account_number': int(account_number)},
        {'$set': {'phone': int(phone), 'password': password}}
    )
    return jsonify({'phone': int(phone), 'password': password})


@app.route('/login', methods=['POST'])
def login():
    phone = request.json['phone']
    password = request.json['password']

    # Check if user exists in the database
    user = account_collection.find_one({'phone': int(phone), 'password': password})

    if user:
        # Authentication successful
        return jsonify({'message': 'Login successful'})
    else:
        # Authentication failed
        return jsonify({'message': 'Invalid credentials'})



from bson import json_util

@app.route('/get-account-data/<phone>', methods=['GET'])
def getAccount(phone):
    # Check if user exists in the database
    user1 = account_collection.find_one({'phone': int(phone)})

    if user1:
        user1['_id'] = str(user1['_id'])
        return jsonify(user1), 200
    else:
        # User not found
        return jsonify({'message': 'User not found'}), 404


@app.route('/get-transaction-sender/<sender>', methods=['GET'])
def getSenderTransaction(sender):
    # Check if user exists in the database
    transaction_sender = list(transaction_collection.find({'sender_account': sender}))

    if transaction_sender:
        for transaction in transaction_sender:
            transaction['_id'] = str(transaction['_id'])

        return jsonify(transaction_sender), 200
    else:
        # User not found
        return jsonify({'message': 'User not found'}), 404


@app.route('/get-transaction-receiver/<sender>', methods=['GET'])
def getReceiverTransaction(sender):
    # Check if user exists in the database
    transaction_sender = list(transaction_collection.find({'receiver_account': sender}))

    if transaction_sender:
        for transaction in transaction_sender:
            transaction['_id'] = str(transaction['_id'])

        return jsonify(transaction_sender), 200
    else:
        # User not found
        return jsonify({'message': 'User not found'}), 404




if __name__ == '__main__':
    socketio.run(app)