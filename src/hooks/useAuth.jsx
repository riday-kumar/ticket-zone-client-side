import { useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";

const useAuth = () => {
  const authInfo = useContext(AuthContext);
  return authInfo;
};

export default useAuth;
