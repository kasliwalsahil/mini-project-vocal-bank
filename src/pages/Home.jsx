import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser, AiTwotoneBank } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FiArrowUpRight } from "react-icons/fi";
import { BsFillCreditCard2FrontFill, BsArrowUpRight } from "react-icons/bs";
import { MdPayment, MdOutlineAccountBalance, MdOutlineCallReceived } from "react-icons/md";
import moneyTransfer from "../assets/money-transfer.png";
import money from "../assets/money.png"
import saveMoney from "../assets/save-money.png"
import investing from "../assets/investing.png"
import shield from "../assets/shield.png"
import saving from "../assets/saving.png"
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [isListening, setIsListening] = useState(false);
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    const phone = sessionStorage.getItem("phone");
    fetchAccountData(phone);
  }, []);

  const fetchAccountData = async (phone) => {
    try {
      const response = await axios.get(`http://localhost:5000/get-account-data/${phone}`);
      setAccountData(response.data);
      sessionStorage.setItem("account_number", response.data.account_number);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const toggleListening = () => {
    setIsListening(!isListening);

    if (!isListening) {
      startListening(accountData.account_number);
    } else {
      // stopListening();
      return console.log("Error");
    }
  };

  const startListening = () => {
    axios
      .post(`http://localhost:5000/api/start-transaction/${accountData.account_number}`)
      .then((response) => {
        if (response.data.success) {
          console.log("Listening started successfully.");
        } else {
          console.log("Failed to start listening.");
        }
      })
      .catch((error) => {
        console.error("Error starting listening:", error);
      });
  };

  const [receive, setReceive] = useState(false);

  const logout = () => {
    try {
      sessionStorage.removeItem("phone");
      sessionStorage.removeItem("account_number");
      navigate("/");
    } catch (error) {
      console.log(error);
      
    }
  };

  const transaction = [
    {
      from: receive ? MdOutlineCallReceived : FiArrowUpRight,
      name: "Ninad Tippat",
      amount: "₹43,500",
      time: "11:23 AM",
      date: "May 6th 2023",
      success: "success",
    },
    {
      from: receive ? MdOutlineCallReceived : FiArrowUpRight,
      name: "Sahil Kasliwal",
      amount: "₹500",
      time: "11:23 AM",
      date: "May 6th 2023",
      success: "success",
    },
    {
      from: receive ? MdOutlineCallReceived : FiArrowUpRight,
      name: "Rishita Soni",
      amount: "₹100",
      time: "11:23 AM",
      date: "May 6th 2023",
      success: "success",
    },
    {
      from: receive ? MdOutlineCallReceived : FiArrowUpRight,
      name: "Shruti Kalani",
      amount: "₹1500",
      time: "11:23 AM",
      date: "May 6th 2023",
      success: "success",
    },
    {
      from: receive ? MdOutlineCallReceived : FiArrowUpRight,
      name: "Ranjeet Kumar",
      amount: "₹150",
      time: "11:23 AM",
      date: "May 6th 2023",
      success: "success",
    },
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
            <a href="/">
              <div className="section1-left">
                <h1>
                  VOCAL<span className="vault">Bank</span>
                </h1>
              </div>
            </a>
            <div className="section1-right">
              <span className="welcome1">
                Welcome, {accountData && accountData.name}
              </span>
            </div>
          </div>
          <div className="section2">
            <div className="section2-left">
              <p>
                Account Holder Name :<br />
                <span className="balance">{accountData && accountData.name}</span>{" "}
              </p>
              <p>
                Account no {accountData && accountData.account_number}
                <span className="expiring-date">08/25</span>
              </p>
            </div>
            <div className="section2-right">
              <div className="section2-right1">
                <div className="income">Balance</div>
                <div>
                  <p>₹ {accountData && accountData.balance}</p>
                  <span className="income">---------------------</span>
                </div>
              </div>
              <button className="section2-right1" onClick={toggleListening}>
                  <div className="income">Transaction</div>
                  <div className="bank-img">
                    <img src={moneyTransfer} alt="" />
                  </div>
              </button>
            </div>
          </div>

          <div className="transaction-history">
            <h2></h2>
          </div>
          <div className="section3">
            {/* <div className="section3_box">
              <p>Rewards</p>
            </div>
            <div className="section3_box">
              <p>Digi Gold</p>
            </div>
            <div className="section3_box">
              <p>Mutual Funds</p>
            </div> */}
           <div className="service">
              <div className="services1">
                <div className="income">Rewards</div>
                <div className="service-img">
                    <img src={saveMoney} alt="" />
                </div>
              </div>
              <div className="services1">
                  <div className="income">Mutual Funds</div>
                  <div className="service-img">
                    <img src={investing} alt="" />
                  </div>
              </div>
              <div className="services1">
                  <div className="income">Digi Gold</div>
                  <div className="service-img">
                    <img src={saving} alt="" />
                  </div>
              </div>
              <div className="services1">
                  <div className="income">Insurance</div>
                  <div className="service-img">
                    <img src={shield} alt="" />
                  </div>
              </div>
            </div>
            {/* {transaction?.map((entry, i) => (
              <div className="entries" key={i}>
                <p className="baki-boxes">{React.createElement(entry.from, { size: "20" })}</p>
                <p className="baki-boxes">{entry.name}</p>
                <p className="baki-boxes">{entry.amount}</p>
                <p className="baki-boxes">{entry.time}</p>
                <p className="baki-boxes">{entry.date}</p>
                <p className="success">{entry.success}</p>
              </div>
            ))} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
