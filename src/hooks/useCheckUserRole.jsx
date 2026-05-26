import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useCheckUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: roleLoading, data: role } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role?email=${user?.email}`);
      //   console.log(res);
      return res.data;
    },
  });

  // console.log(role);

  return { roleLoading, role };
};

export default useCheckUserRole;
