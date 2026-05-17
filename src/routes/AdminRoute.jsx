import useAuth from "../hooks/useAuth";
import useCheckUserRole from "../hooks/useCheckUserRole";
import Loading from "../components/SharedComponent/Loading";
import { toast } from "react-toastify";
import Forbidden from "../components/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading, logOut } = useAuth();
  const { roleLoading, role } = useCheckUserRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    logOut()
      .then(() => {
        toast.error("You are Forbidden to Access this Page", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        // console.log(err);
      });
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default AdminRoute;
