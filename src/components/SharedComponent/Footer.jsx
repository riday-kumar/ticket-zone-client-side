import { FaFacebook } from "react-icons/fa";
import stripe from "../../assets/strip.png";
import { Link } from "react-router";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="custom-container">
      <div className="py-15 grid max-md:gap-5 md:grid-cols-4 justify-items-center text-white">
        <div className="">
          <Link
            to="/"
            className="flex items-center max-md:justify-center text-2xl gap-2 mb-5"
          >
            <span className="bg-primary p-2 text-white logo-color font-bold rounded-xl">
              <h1>TZ</h1>
            </span>
            <h1 className="font-bold">Ticket Zone</h1>
          </Link>
          <p className="text-[16px] text-center md:text-justify max-md:px-10">
            Book bus, train, launch & flight tickets easily. Fast, secure &
            reliable booking platform for Bangladesh.
          </p>
        </div>
        {/* quic links */}
        <div>
          <h4 className="text-[20px] font-bold mb-5">Quick Links</h4>
          <ul className="*:mb-3">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link>All Tickets</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        {/* contact info */}
        <div>
          <h4 className="text-[20px] font-bold mb-5">Contact Info</h4>
          <p className="font-semibold mb-3">ticketzone@gmail.com</p>
          <p className="font-semibold mb-3">01676731778</p>
          <div className="text-3xl flex gap-3">
            <Link>
              <FaFacebook />
            </Link>
            <Link>
              <FaSquareXTwitter />
            </Link>
          </div>
        </div>
        {/* payment info */}
        <div>
          <h4 className="text-center text-[20px] font-bold mb-5">
            Payment Methods
          </h4>
          <div className="bg-white rounded-xl w-[60%] mx-auto">
            <img src={stripe} alt="stripe" />
          </div>
        </div>
      </div>
      <hr className="text-white" />
      <p className="text-center py-5 text-white">
        Copyright © {new Date().getFullYear()} - All right reserved
      </p>
    </div>
  );
};

export default Footer;
