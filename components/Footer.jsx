import React from "react";
import Image from "next/image";
import DEAP from "../assets/DEAP.png";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="footer-container">
        <div className="footerlogo-container">
          <Image src={DEAP} alt="DEAP logo" width={180} height={60} />
          <p className="footer-p">Shop Quality Music Essentials With Us</p>
        </div>

        <div>
          <h1>Get In Touch</h1>
          <ul className="social-medialist">
            <li className="socialmedia">
              <a href="https://www.instagram.com/">Instagram</a>
            </li>
            <li className="socialmedia">
              <a href="https://twitter.com/">Twitter</a>
            </li>
            <li className="socialmedia">
              <a href="https://facebook.com/">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copyright-container">
        <div className="copyright-div">
          <p className="copyright">2024 DEAP Headphones All rights reserved</p>
          <p className="icon">
            <a href="https://www.instagram.com/"> <AiFillInstagram /></a>
            <a href="https://twitter.com/"><AiOutlineTwitter /></a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
