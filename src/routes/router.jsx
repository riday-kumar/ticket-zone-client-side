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
import RequestedBookings from "../pages/Dashboard/RequestedBookings/RequestedBookings";
import ManageTickets from "../pages/Dashboard/ManageTickets/ManageTickets";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdvertiseTickets from "../pages/Dashboard/AdvertiseTickets/AdvertiseTickets";
import PrivateRoute from "./PrivateRoute";
import MyTickets from "../pages/Dashboard/MyTickets/MyTickets";
import VendorRoute from "./VendorRoute";
import AdminRoute from "./AdminRoute";
import Forbidden from "../components/Forbidden";
import TicketDetails from "../pages/TicketDetails/TicketDetails";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payment/PaymentCancel";
import NotFound from "../pages/NotFound/NotFound";

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
        path: "tickets/:id",
        Component: TicketDetails,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "forbidden",
        Component: Forbidden,
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
        path: "home",
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
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancel",
        Component: PaymentCancel,
      },
      // vendor
      {
        path: "add-ticket",
        element: (
          <VendorRoute>
            <AddTicket></AddTicket>
          </VendorRoute>
        ),
      },
      {
        path: "my-tickets",
        element: (
          <VendorRoute>
            <MyTickets></MyTickets>
          </VendorRoute>
        ),
      },
      {
        path: "requested-bookings",
        element: (
          <VendorRoute>
            <RequestedBookings></RequestedBookings>
          </VendorRoute>
        ),
      },
      // admin
      {
        path: "manage-ticket",
        element: (
          <AdminRoute>
            <ManageTickets></ManageTickets>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
      {
        path: "advertise-tickets",
        element: (
          <AdminRoute>
            <AdvertiseTickets></AdvertiseTickets>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
