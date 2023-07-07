import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser} from "react-icons/ai";
import {BiLogOut} from "react-icons/bi"
import {FiArrowUpRight} from "react-icons/fi"
import {BsFillCreditCard2FrontFill, BsArrowUpRight} from "react-icons/bs"
import {MdPayment, MdOutlineAccountBalance, MdOutlineCallReceived} from "react-icons/md"
import { Link, Navigate } from "react-router-dom";
import "./Profile.css"
import axios from 'axios'
import {useNavigate} from "react-router-dom"

  
  
const Profile = () => {

  const [accountData, setAccountData] = useState(null);
  
  useEffect(()=>{
    const phone = sessionStorage.getItem("phone");
    
    fetcheAccountData(phone);
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

  const transaction = [
    {from : receive ? MdOutlineCallReceived : FiArrowUpRight, name: "Manthan Indane", amount: "₹3500", time: "11:23 AM", date:"May 6th 2023", success: "success"},
    {from : receive ? MdOutlineCallReceived : FiArrowUpRight, name: "Ninad Tippat", amount: "₹43,500", time: "11:23 AM", date:"May 6th 2023", success: "success"},
    {from : receive ? MdOutlineCallReceived : FiArrowUpRight, name: "Sahil Kasliwal", amount: "₹500", time: "11:23 AM", date:"May 6th 2023", success: "success"},
    {from : receive ? MdOutlineCallReceived : FiArrowUpRight, name: "Rishita Soni", amount: "₹100", time: "11:23 AM", date:"May 6th 2023", success: "success"},
    {from : receive ? MdOutlineCallReceived : FiArrowUpRight, name: "Shruti Kalani", amount: "₹1500", time: "11:23 AM", date:"May 6th 2023", success: "success"},
    {from : receive ? MdOutlineCallReceived : FiArrowUpRight, name: "Ranjeet Kumar", amount: "₹150", time: "11:23 AM", date:"May 6th 2023", success: "success"},
  ]

  const [open, setOpen] = useState(true);
  const navi=()=>{
    navigate("/payment-history")
  }
  
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
        <div className="account_details">


            <div className="acc_fld">

            </div>
            <div className="acc_fld">
              <span>Account Holder Name : </span>
              <span>{accountData && accountData.name}</span>
            </div>
            <div className="acc_fld">
              <span>Account Number : </span>
              <span>{accountData && accountData.account_number}</span>
            </div>
            <div className="acc_fld">
              <span>Phone No : </span>
              <span>{accountData && accountData.phone}</span>
            </div>
            <div className="acc_fld">
              <span>Address : </span>
              <span>{accountData && accountData.address}</span>
            </div>
            <div className="acc_fld">
              <span>Current Account Balance : ₹</span>
              <span>{accountData && accountData.balance}</span>
            </div>
            <div className="acc_fld see-transaction-history">
              <button onClick={navi} className="acc_btn ">See Transaction history</button>
            </div>
          </div>
      </div>
    </section>
    </>
     
  );
};

export default Profile;
