import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser} from "react-icons/ai";
import {BiLogOut} from "react-icons/bi"
import {FiArrowUpRight} from "react-icons/fi"
import {BsFillCreditCard2FrontFill, BsArrowUpRight} from "react-icons/bs"
import {MdPayment, MdOutlineAccountBalance, MdOutlineCallReceived} from "react-icons/md"
import { Link, useNavigate } from "react-router-dom";
import "./PaymentHistory.css"
import axios from 'axios'

  
  
const PaymentHistory = () => {

  const [accountData, setAccountData] = useState(null);
  const [transactionReceiver, setTransactionReceiver] = useState([]);
  const [transactionSender, setTransactionSender] = useState([]);
  
  useEffect(()=>{
    const phone = sessionStorage.getItem("phone");
    const acc_num = sessionStorage.getItem("account_number")
    fetcheAccountData(phone);
    fetcheTransactionReceiverData(acc_num);
    fetcheTransactionSenderData(acc_num);
  }, [])

  const fetcheAccountData =async (phone)=>{
    try {
      const response = await axios.get(`http://localhost:5000/get-account-data/${phone}`);
      // console.log(response.data);
      setAccountData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetcheTransactionReceiverData =async (acc_num)=>{
    try {
      const response1 = await axios.get(`http://localhost:5000/get-transaction-receiver/${acc_num}`);
      console.log(response1.data[0].deposit_amount);
      setTransactionReceiver(response1.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetcheTransactionSenderData =async (acc_num)=>{
    try {
      const response2 = await axios.get(`http://localhost:5000/get-transaction-sender/${acc_num}`);
      console.log(response2.data[0].deposit_amount);
      setTransactionSender(response2.data);
    } catch (error) {
      console.log(error);
    }
  }
  const navigate = useNavigate();

  const logout = () => {
    try {
      sessionStorage.removeItem("phone");
      sessionStorage.removeItem("account_number");
      navigate("/");   
    } catch (error) {
      console.log(error);
      
    }
  };

  const [receive, setReceive] = useState(false);
  
  const menus = [
    
    { name: "Dashboard", link: "/home", icon: MdOutlineDashboard },
    
    { name: "Payment History", link: "/payment-history", icon: MdPayment },
    { name: "Profile", link: "/profile",  icon: AiOutlineUser },
    { name: "logout", link: "/logout" , icon:BiLogOut},
  ];

  const [open, setOpen] = useState(true);
  
  return (
    <>
    <section className="flex gap-6 homepage">
      <div
          className={`bg-[#0e0e0e] min-h-screen ${
            open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            <Link
              to="/home"
              className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>
                <MdOutlineDashboard size="20" />
              </div>
              <h2
                style={{
                  transitionDelay: "300ms",
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
              Dashboard
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                Dashboard
              </h2>
            </Link>
            <Link
              to="/payment-history"
              className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>
                <MdPayment size="20" />
              </div>
              <h2
                style={{
                  transitionDelay: "600ms",
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Payment History
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                Payment History
              </h2>
            </Link>
            <Link
              to="/profile"
              className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>
                <AiOutlineUser size="20" />
              </div>
             <h2
                style={{
                  transitionDelay: "900ms",
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Profile
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                Profile
              </h2>
            </Link>
            <button
            onClick={logout}
              className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>
                <BiLogOut size="20" />
              </div>
              <h2
                style={{
                  transitionDelay: "1200ms",
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
               Logout
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                Logout
              </h2>
            </button>
          </div>
        </div>

      <div className="m-3 text-xl text-gray-900 font-semibold section">
        <div className="section1">
          <a href="/"><div className="section1-left"><h1>VOCAL<span className="vault">Bank</span></h1></div></a>
          <div className="section1-right"> <span className="welcome1">Welcome, {accountData && accountData.name}</span> </div>
        </div>
        
        <div className="transaction-history trans_heading niche">
            <h2>Transaction History</h2>
          </div>
        <h1 className="credited">Credited</h1>
        <div className=" credit-box">
        <div>
            {transactionReceiver.map((transaction, index) => (
          <div key={index} className="entries">
           {transaction.deposit_amount ? <p>Deposit</p> : <p>From: {transaction && transaction.sender_account}</p>}
            <p>{accountData.name}</p>
           <p>₹ {transaction && transaction.amount || transaction.deposit_amount}</p>
          </div>
        ))}</div>
         </div>
        
          <h1 className="credited">Debited</h1>
         <div className=" credit-box">
          <div>
            {transactionSender.map((transaction, index) => (
          <div key={index} className="entries">
           <p>{accountData && accountData.name}</p>
           <p>To: {transaction && transaction.receiver_account}</p>
           <p>₹ {transaction.amount}</p>
          </div>
        ))}</div>
         </div>

      </div>
    </section>
    </>
     
  );
};

export default PaymentHistory;
