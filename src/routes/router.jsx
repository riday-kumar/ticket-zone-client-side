import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllTickets from "../pages/AllTickets/AllTickets";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import AddTicket from "../pages/Dashboard/AddTicket/AddTicket";
import AllTicket from "../pages/Dashboard/AllTicket/AllTicket";
import RequestedBookings from "../pages/Dashboard/RequestedBookings/RequestedBookings";
import ManageTickets from "../pages/Dashboard/ManageTickets/ManageTickets";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdvertiseTickets from "../pages/Dashboard/AdvertiseTickets/AdvertiseTickets";
import PrivateRoute from "./PrivateRoute";
import MyTickets from "../pages/Dashboard/MyTickets/MyTickets";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "all-tickets",
        Component: AllTickets,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "my-bookings",
        Component: MyBookings,
      },
      {
        path: "payments",
        Component: PaymentHistory,
      },
      // vendor
      {
        path: "add-ticket",
        Component: AddTicket,
      },
      {
        path: "my-tickets",
        Component: MyTickets,
      },
      {
        path: "requested-bookings",
        Component: RequestedBookings,
      },
      // admin
      {
        path: "manage-ticket",
        Component: ManageTickets,
      },
      {
        path: "manage-users",
        Component: UsersManagement,
      },
      {
        path: "advertise-tickets",
        Component: AdvertiseTickets,
      },
    ],
  },
]);
