import useAuth from "../hooks/useAuth";
import useCheckUserRole from "../hooks/useCheckUserRole";
import Loading from "../components/SharedComponent/Loading";
import Forbidden from "../components/Forbidden";

const VendorRoute = ({ children }) => {
  const { loading } = useAuth();
  const { roleLoading, role } = useCheckUserRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role.role !== "vendor") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default VendorRoute;
