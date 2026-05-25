import Loading from "../../../components/SharedComponent/Loading";
import useCheckUserRole from "../../../hooks/useCheckUserRole";
import AdminDashboardHome from "./AdminDashboardHome";
import UserDashboardHome from "./UserDashboardHome";
import VendorDashboardHome from "./VendorDashboardHome";

const DashboardHome = () => {
  const { role, roleLoading } = useCheckUserRole();

  if (roleLoading) {
    <Loading></Loading>;
  }

  if (role.role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  }

  if (role.role === "vendor") {
    return <VendorDashboardHome></VendorDashboardHome>;
  }

  return <UserDashboardHome></UserDashboardHome>;
};

export default DashboardHome;
