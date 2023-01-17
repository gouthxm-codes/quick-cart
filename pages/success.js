import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { runFireWorks } from "../lib/utils";
const success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantiy } = useStateContext();
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantiy(0);
    runFireWorks();
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank You For Your Order !</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any queries please email us
          <a className="email" href="mailto:ninja777official@gmail.com">
            ninja777official@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default success;
