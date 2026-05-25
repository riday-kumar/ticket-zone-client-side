import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/SharedComponent/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCheckUserRole from "../../../hooks/useCheckUserRole";
import DashboardHeading from "../../../components/DashboardHeading";
import SectionHeading from "../../../components/SectionHeading";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { role, roleLoading } = useCheckUserRole();

  const { data: transactionHistory = [] } = useQuery({
    queryKey: ["transactionHistory"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-transaction?email=${role.email}`);
      return res.data;
    },
  });

  if (roleLoading) {
    return <Loading></Loading>;
  }

  console.log(transactionHistory);

  if (transactionHistory.length === 0) {
    return (
      <div>
        <DashboardHeading heading="Booking Payment History"></DashboardHeading>
        <div className="text-center">
          <span>
            No transaction found.Once you purchase tickets, your transaction
            history will appear here.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeading heading="Booking Payment History"></DashboardHeading>
      <div className="overflow-x-auto mx-10">
        <table className="table table-zebra text-center">
          {/* head */}
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Ticket Title</th>
              <th>Amount</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory.map((history, index) => (
              <tr key={index} className="mb-2">
                <td>{history.transactionId}</td>
                <td>{history.ticketTitle}</td>
                <td>{history.amount}</td>
                <td>{history.paymentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
