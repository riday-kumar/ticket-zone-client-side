import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DashboardHeading from "../../../components/DashboardHeading";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { toast } from "react-toastify";
import useCheckUserRole from "../../../hooks/useCheckUserRole";
import Loading from "../../../components/SharedComponent/Loading";

const RequestedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { role, roleLoading } = useCheckUserRole();

  const {
    isLoading: reqBkLoading,
    data: requestedBookingTickets = [],
    refetch,
  } = useQuery({
    queryKey: ["requestedBookingTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/req-bookings");
      return res.data;
    },
  });

  if (reqBkLoading || roleLoading) {
    return <Loading></Loading>;
  }

  const handleAcceptTicket = (id) => {
    axiosSecure
      .patch(`/req-bookings/${id}?msg=accept&vendoremail=${role.email}`)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          refetch();

          toast.success("Ticket has been accepted", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };

  const handleRejectTicket = (id) => {
    axiosSecure
      .patch(`/req-bookings/${id}?msg=reject&vendoremail=${role.email}`)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          refetch();

          toast.success("Ticket Rejected", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };

  return (
    <div>
      <DashboardHeading heading="Request Booking Tickets"></DashboardHeading>
      <div className="overflow-x-auto mx-10">
        <table className="table table-zebra text-center">
          {/* head */}
          <thead>
            <tr>
              <th>User Email</th>
              <th>Ticket Title</th>
              <th>Quantity</th>
              <th className="flex justify-center items-center">
                Total Price (<FaBangladeshiTakaSign />)
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requestedBookingTickets.map((ticket, index) => (
              <tr key={index} className="mb-2">
                <td>{ticket.userEmail}</td>
                <td>ticket title</td>
                <td>{ticket.ticketQuantity}</td>
                <td>{ticket.totalPrice}</td>
                {ticket.status == "pending" ? (
                  <td className="flex justify-center gap-2 ">
                    <button
                      onClick={() => handleAcceptTicket(ticket._id)}
                      className="btn btn-sm btn-success text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectTicket(ticket._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Reject
                    </button>
                  </td>
                ) : (
                  <td
                    className={`font-bold ${ticket.status === "accept" ? "text-green-500" : "text-red-500"}`}
                  >
                    {ticket.status}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedBookings;
