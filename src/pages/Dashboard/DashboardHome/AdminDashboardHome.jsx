import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/SharedComponent/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const {
    isLoading: adminDashboardLoading,
    data: allUsersForDashboardHome = [],
  } = useQuery({
    queryKey: ["allUsersForDashboardHome"],
    queryFn: async () => {
      const res = await axiosSecure.get("users");
      return res.data;
    },
  });

  const { data: adminGetTransactionHistory = [] } = useQuery({
    queryKey: ["adminGetTransactionHistory"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-transaction`);
      return res.data;
    },
  });

  const totalRevenue = adminGetTransactionHistory.reduce((acc, crr) => {
    return acc + Number(crr.amount);
  }, 0);

  const admin = allUsersForDashboardHome.filter(
    (user) => user.role === "admin",
  ).length;

  const vendor = allUsersForDashboardHome.filter(
    (user) => user.role === "vendor",
  ).length;

  if (adminDashboardLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-4 gap-5 lg:gap-10">
        <div className="font-bold px-10 py-7 rounded-xl text-white bg-linear-to-r from-emerald-500 to-emerald-900">
          <p className="text-2xl pb-2">Total Users</p>
          <h3 className="text-3xl ">{allUsersForDashboardHome.length}</h3>
        </div>
        <div className="font-bold px-10 py-7 rounded-xl text-white bg-linear-to-r from-red-500 to-orange-500">
          <p className="text-2xl pb-2">Admins</p>
          <h3 className="text-3xl ">{admin}</h3>
        </div>
        <div className="font-bold px-10 py-7 rounded-xl text-white bg-linear-to-l from-cyan-500 to-blue-500">
          <p className="text-2xl pb-2">Vendors</p>
          <h3 className="text-3xl ">{vendor}</h3>
        </div>
        <div className="font-bold px-10 py-7 rounded-xl text-white bg-linear-to-l from-teal-200 to-teal-500">
          <p className="text-2xl pb-2">Ticket Sold</p>
          <h3 className="text-3xl ">{adminGetTransactionHistory.length}</h3>
        </div>
        <div className="font-bold px-10 py-7 rounded-xl text-white bg-linear-to-l  from-violet-600 to-indigo-600">
          <p className="text-2xl pb-2">Total Revenue</p>
          <h3 className="text-3xl ">{totalRevenue}</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
