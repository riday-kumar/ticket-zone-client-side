import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCheckUserRole from "../../../hooks/useCheckUserRole";
import Loading from "../../../components/SharedComponent/Loading";

const UserDashboardHome = () => {
  const { role, roleLoading } = useCheckUserRole();
  const axiosSecure = useAxiosSecure();

  const { isLoading: userDashboardLoading, data: userDashboardBookings = [] } =
    useQuery({
      queryKey: ["userDashboardBookings", role.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/bookings?email=${role.email}`);
        return res.data;
      },
    });

  const purchasedTickets = userDashboardBookings.reduce((acc, crr) => {
    return acc + Number(crr.ticketQuantity);
  }, 0);
  const pendingPayment = userDashboardBookings.filter(
    (ticket) => ticket.payment === "pending",
  );
  const totalMoneySpent = userDashboardBookings.reduce((acc, crr) => {
    return acc + Number(crr.totalPrice);
  }, 0);

  if (userDashboardLoading || roleLoading) {
    <Loading></Loading>;
  }

  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-4 gap-5 lg:gap-10">
        <div className="font-bold px-10 py-7 rounded-xl text-white bg-linear-to-r from-emerald-500 to-emerald-900">
          <p className="text-2xl pb-2">Total Bookings</p>
          <h3 className="text-3xl ">{userDashboardBookings.length}</h3>
        </div>
        <div className="font-bold px-10 py-7 rounded-xl text-white bg-linear-to-r from-red-500 to-orange-500">
          <p className="text-2xl pb-2">Total Purchased Tickets</p>
          <h3 className="text-3xl ">{purchasedTickets}</h3>
        </div>
        <div className="font-bold px-10 py-7 rounded-xl text-white bg-linear-to-l from-cyan-500 to-blue-500">
          <p className="text-2xl pb-2">Pending Payments</p>
          <h3 className="text-3xl ">{pendingPayment.length}</h3>
        </div>
        <div className="font-bold px-10 py-7 rounded-xl text-white bg-linear-to-l from-teal-200 to-teal-500">
          <p className="text-2xl pb-2">Total Money Spent</p>
          <h3 className="text-3xl ">{totalMoneySpent}</h3>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
