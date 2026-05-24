import { FaHome, FaMoneyBillWave, FaUserCircle, FaUsers } from "react-icons/fa";
import { FaClockRotateLeft, FaFileLines } from "react-icons/fa6";
import { RiAdvertisementFill } from "react-icons/ri";
import { MdAddBox } from "react-icons/md";
import { TbFileSettingsFilled } from "react-icons/tb";
import { HiHandRaised } from "react-icons/hi2";
import { NavLink, Outlet } from "react-router";
import useCheckUserRole from "../../hooks/useCheckUserRole";
import Loading from "../../components/SharedComponent/Loading";

const DashboardLayout = () => {
  const { role, roleLoading } = useCheckUserRole();
  if (roleLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 font-bold">DashBoard</div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* Dashboard Home Page */}
            <li>
              <NavLink
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard Home"
              >
                {/* Home icon */}
                <FaHome className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Dashboard Home</span>
              </NavLink>
            </li>

            {/* My Profile */}
            <li>
              <NavLink
                to="/dashboard/my-profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Profile"
              >
                {/* user icon */}
                <FaUserCircle className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">My Profile</span>
              </NavLink>
            </li>

            {/* My Bookings */}
            <li>
              <NavLink
                to="/dashboard/my-bookings"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Bookings"
              >
                {/* user icon */}
                <FaMoneyBillWave className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">My Bookings</span>
              </NavLink>
            </li>

            {/* Payment History */}
            <li>
              <NavLink
                to="/dashboard/payments"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payment History"
              >
                {/* user icon */}
                <FaClockRotateLeft className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Payment History</span>
              </NavLink>
            </li>
            {/* ------------------- Vendor -------------------- */}

            {role.role === "vendor" && (
              <>
                {/* Add Ticket */}
                <li>
                  <NavLink
                    to="/dashboard/add-ticket"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Ticket"
                  >
                    {/* add icon */}
                    <MdAddBox className="my-1.5 inline-block size-4" />
                    <span className="is-drawer-close:hidden">Add Ticket</span>
                  </NavLink>
                </li>

                {/* My Ticket */}
                <li>
                  <NavLink
                    to="/dashboard/my-tickets"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Ticket"
                  >
                    <FaFileLines className="my-1.5 inline-block size-4" />
                    <span className="is-drawer-close:hidden">My Ticket</span>
                  </NavLink>
                </li>

                {/* Requested Bookings */}
                <li>
                  <NavLink
                    to="/dashboard/requested-bookings"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="requested-bookings"
                  >
                    <HiHandRaised className="my-1.5 inline-block size-4" />
                    <span className="is-drawer-close:hidden">
                      Requested Bookings
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* ------------------- admin------------------- */}
            {role.role === "admin" && (
              <>
                {/* Manage Ticket */}
                <li>
                  <NavLink
                    to="/dashboard/manage-ticket"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Ticket"
                  >
                    {/* user icon */}
                    <TbFileSettingsFilled className="my-1.5 inline-block size-4" />
                    <span className="is-drawer-close:hidden">
                      Manage Ticket
                    </span>
                  </NavLink>
                </li>

                {/* Advertise Ticket */}
                <li>
                  <NavLink
                    to="/dashboard/advertise-tickets"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Advertise Ticket"
                  >
                    {/* user icon */}
                    <RiAdvertisementFill className="my-1.5 inline-block size-4" />
                    <span className="is-drawer-close:hidden">
                      Advertise Ticket
                    </span>
                  </NavLink>
                </li>

                {/* Users Management */}
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Users Management"
                  >
                    {/* user icon */}
                    <FaUsers className="my-1.5 inline-block size-4" />
                    <span className="is-drawer-close:hidden">
                      Users Management
                    </span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
