import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser} from "react-icons/ai";
import {BiLogOut} from "react-icons/bi"
import {FiArrowUpRight} from "react-icons/fi"
import {BsFillCreditCard2FrontFill, BsArrowUpRight} from "react-icons/bs"
import {MdPayment, MdOutlineAccountBalance, MdOutlineCallReceived} from "react-icons/md"
import { Link } from "react-router-dom";
import "./Home.css"
import axios from 'axios'

  
  
const Accounts = () => {

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

  const [receive, setReceive] = useState(false);
  
  const menus = [
    
    { name: "Dashboard", link: "/home", icon: MdOutlineDashboard },
    { name: "Accounts", link: "/accounts", icon: MdOutlineAccountBalance, margin: true },
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
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      <div className="m-3 text-xl text-gray-900 font-semibold section">
        <div className="section1">
          <a href="/"><div className="section1-left"><h1>VOCAL<span className="vault">Bank</span></h1></div></a>
          <div className="section1-right"> <span className="welcome1">Welcome, {accountData && accountData.name}</span> </div>
        </div>
       

       

      </div>
    </section>
    </>
     
  );
};

export default Accounts;
