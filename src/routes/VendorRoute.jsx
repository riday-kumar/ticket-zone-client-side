import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useCheckUserRole from "../hooks/useCheckUserRole";
import Loading from "../components/SharedComponent/Loading";

const VendorRoute = ({ children }) => {
  const { loading } = useAuth();
  const { roleLoading, role } = useCheckUserRole();

  if (loading || roleLoading) {
    <Loading></Loading>;
  }

  if (role !== "vendor") {
    return <Navigate to="/"></Navigate>;
  }

  return children;
};

export default VendorRoute;
