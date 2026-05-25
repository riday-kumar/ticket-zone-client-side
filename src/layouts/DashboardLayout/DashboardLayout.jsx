import { FaHome, FaMoneyBillWave, FaUserCircle, FaUsers } from "react-icons/fa";
import { FaClockRotateLeft, FaFileLines } from "react-icons/fa6";
import { RiAdvertisementFill } from "react-icons/ri";
import { MdAddBox } from "react-icons/md";
import { TbFileSettingsFilled } from "react-icons/tb";
import { HiHandRaised } from "react-icons/hi2";
import { NavLink, Outlet } from "react-router";
import useCheckUserRole from "../../hooks/useCheckUserRole";
import Loading from "../../components/SharedComponent/Loading";
import Logo from "../../components/SharedComponent/Logo";

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
        <nav className="h-20 navbar w-full bg-sky-400">
          <div className="px-4 font-bold text-white">
            <Logo></Logo>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="min-h-dvh">
        <div className="flex min-h-full flex-col items-start bg-primary text-white">
          {/* Sidebar content here */}
          <div className="mb-5 text-center bg-linear-to-l from-pink-500 to-rose-500 w-full h-20 flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold uppercase">My Dashboard</h3>
            <p className="font-medium">Latest Overview.</p>
          </div>
          <ul className="menu w-full grow space-y-4">
            {/* Dashboard Home Page */}
            <li>
              <NavLink
                to="/dashboard/home"
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
