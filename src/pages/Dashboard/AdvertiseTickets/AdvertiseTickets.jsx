import { useQuery } from "@tanstack/react-query";
import DashboardHeading from "../../../components/DashboardHeading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: advertiseTickets = [], refetch } = useQuery({
    queryKey: ["advertiseTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/approved-tickets?type=all-type");
      return res.data;
    },
  });

  const handleShowAdvertise = (id) => {
    axiosSecure.patch(`/advertise-tickets/${id}?advertise=yes`).then((res) => {
      if (res.data.modifiedCount === 1) {
        refetch();
        Swal.fire({
          title: "This Ticket will be shown in the Advertise Section",
          icon: "success",
          draggable: true,
        });
      }
    });
  };

  const handleHideAdvertise = (id) => {
    axiosSecure.patch(`/advertise-tickets/${id}?advertise=no`).then((res) => {
      if (res.data.modifiedCount === 1) {
        refetch();
        Swal.fire({
          title: "This Ticket will be shown in the Advertise Section",
          icon: "success",
          draggable: true,
        });
      }
    });
  };

  return (
    <div>
      <DashboardHeading heading="Advertise Ticket"></DashboardHeading>
      <div className="overflow-x-auto mx-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Type</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Vendor Name</th>
              <th>Status</th>
              <th>Shown</th>
              <th>Control Advertise</th>
            </tr>
          </thead>
          <tbody>
            {advertiseTickets.map((ticket, index) => (
              <tr key={index} className="mb-2">
                <th className="flex gap-2">
                  <img
                    className="w-15 rounded-lg"
                    src={ticket.photoURL}
                    alt=""
                  />

                  <div>
                    <p>{ticket.ticketTitle}</p>
                    <p>
                      {ticket.ticketFrom} - {ticket.ticketTo}
                    </p>
                  </div>
                </th>
                <td>{ticket.transportType}</td>
                <td>{ticket.ticketPrice}</td>
                <td>{ticket.ticketQuantity}</td>
                <td>{ticket.vendorName}</td>
                <td
                  className={`font-bold ${ticket.status === "approved" ? "text-green-400" : ticket.status === "pending" ? "text-primary" : "text-red-600"}`}
                >
                  {ticket.status}
                </td>
                <td
                  className={`font-bold ${ticket.advertise === "yes" ? "text-green-500" : "text-red-500"}`}
                >
                  {ticket?.advertise}
                </td>
                <td className="flex gap-2 ">
                  <button
                    onClick={() => handleShowAdvertise(ticket._id)}
                    className="btn btn-sm btn-success text-white"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleHideAdvertise(ticket._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    No
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseTickets;
