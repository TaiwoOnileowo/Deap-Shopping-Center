"use client";
import React, { useEffect , useState} from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import { Cart } from ".";
import DEAP from "../assets/DEAP.png";

const Navbar = () => {
  const { totalQuantities, showCart, setShowCart } = useStateContext();
  const [showWelcomeMessage, setShowWelcomeMessage]= useState(false);
  useEffect(()=>{
    const timer= setTimeout(()=>{
      setShowWelcomeMessage(true)
    },4500)
    return ()=>clearTimeout(timer)
  },[])
  return (
    <>
    
    <div className="welcome-message">
        <div className={`message ${showWelcomeMessage && "show"}`}>

<h1>Welcome To Our Shopping Center for Audio Devices!</h1>
<p>Enjoy Your Music With Us</p>
        </div>
      </div>
    <div className="navbar-container">
      
      <div className="logo-div">
        <Link href="/">
          <Image
            src={DEAP}
            alt="DEAP"
          
            width={180}
            height={60}
          />
        </Link>
      </div>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
    </>
  );
};

export default Navbar;
