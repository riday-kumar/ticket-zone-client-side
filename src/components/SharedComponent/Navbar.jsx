import { Link } from "react-router";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <div className="bg-base-100 shadow-sm sticky top-0">
      <div className="navbar custom-container">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="text-primary menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link
                  className="btn btn-sm btn-outline btn-primary"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link className="btn btn-sm btn-grad" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <Logo></Logo>
        </div>
        {/* desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-[18px] text-primary">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="max-md:hidden navbar-end gap-2">
          <Link className="btn btn-sm btn-outline btn-primary" to="/login">
            Login
          </Link>
          <Link className="btn btn-sm btn-grad" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
