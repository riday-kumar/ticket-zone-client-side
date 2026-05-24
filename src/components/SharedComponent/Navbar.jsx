import { NavLink } from "react-router";
import Logo from "./Logo";
import useAuth from "../../hooks/useAuth";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const { user, loading, logOut } = useAuth();
  // console.log(user);

  const handleLogOut = () => {
    logOut().then(() => {
      toast.success("Log Out Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-white z-50 shadow-sm sticky top-0">
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
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/all-tickets">All Tickets</NavLink>
              </li>

              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              {user ? (
                <>
                  <li>
                    <NavLink to="/dashboard/my-profile">Profile</NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="btn btn-sm bg-red-600 text-white"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      className="btn btn-sm btn-outline btn-primary"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="btn btn-sm btn-grad" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Logo></Logo>
          {user && (
            <img
              className="absolute right-3 md:hidden animate-pulse rounded-full border-2 border-primary w-10"
              src={user?.photoURL}
              alt=""
            />
          )}
        </div>
        {/* desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-[18px] text-primary">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/all-tickets">All Tickets</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
        <div className="max-md:hidden navbar-end gap-2">
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    {user.photoURL ? (
                      <img
                        className="rounded-full border-2 border-primary w-10"
                        src={user?.photoURL}
                        alt=""
                      />
                    ) : (
                      <img
                        className="rounded-full border-2 border-primary w-10"
                        src="https://img.icons8.com/?size=100&id=kDoeg22e5jUY&format=png&color=000000"
                        alt=""
                      />
                    )}
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <NavLink
                      to="/dashboard/my-profile"
                      className="text-[18px] font-medium mb-2 text-center"
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="btn btn-sm bg-red-600 text-white"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <NavLink
                className="btn btn-sm btn-outline btn-primary"
                to="/login"
              >
                Login
              </NavLink>
              <NavLink className="btn btn-sm btn-grad" to="/register">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
