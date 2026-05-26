import { useQuery } from "@tanstack/react-query";
import DashboardHeading from "../../../components/DashboardHeading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../../components/SharedComponent/Loading";

const ManageTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState("");
  const axiosSecure = useAxiosSecure();
  const ticketModal = useRef(null);

  const {
    isLoading: vendorTicketsLoading,
    data: vendorTickets = [],
    refetch,
  } = useQuery({
    queryKey: ["vendorTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/vendors-added-tickets");
      return res.data;
    },
  });
  // console.log(vendorTickets);

  if (vendorTicketsLoading) {
    return <Loading></Loading>;
  }

  const handleShowModal = (ticket) => {
    ticketModal.current.showModal();
    setSelectedTicket(ticket);
  };

  const handleAccept = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/approve-ticket/${id}`).then((res) => {
          // console.log(res);
          if (res.data.modifiedCount === 1) {
            refetch();
            Swal.fire({
              title: "Accepted!",
              text: "Ticket Accepted By Admin",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/reject-ticket/${id}`).then((res) => {
          // console.log(res);
          if (res.data.modifiedCount === 1) {
            refetch();
            Swal.fire({
              title: "Rejected!",
              text: "Ticket Rejected By Admin",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <DashboardHeading heading="All Ticket Added By Vendor"></DashboardHeading>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vendorTickets.map((ticket, index) => (
              <tr key={index} className="mb-2">
                <th className="*:mb-3 lg:flex max-xl:flex-col gap-2">
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
                <td className="*:mb-3 lg:flex max-xl:flex-col gap-2">
                  {ticket.status === "approved" && (
                    <button
                      onClick={() => handleReject(ticket._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Reject
                    </button>
                  )}

                  {ticket.status === "rejected" && (
                    <button
                      onClick={() => handleAccept(ticket._id)}
                      className="btn btn-sm btn-success text-white"
                    >
                      Accept
                    </button>
                  )}

                  {ticket.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAccept(ticket._id)}
                        className="btn btn-sm btn-success text-white"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => handleReject(ticket._id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleShowModal(ticket)}
                    className="btn btn-sm btn-info text-white"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ------------ Modal ----------------- */}

      <dialog ref={ticketModal} id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle bg-red-400 btn-ghost absolute right-2 top-2 z-10">
              ✕
            </button>

            {/* Top Banner Image */}
            <div className="relative">
              <img
                src={selectedTicket?.photoURL}
                alt={selectedTicket?.ticketTitle}
                className="w-full h-72 object-cover"
              />

              {/* Status Badge */}
              <div
                className={`absolute top-4 right-4 badge px-4 py-3 text-white font-semibold
          ${
            selectedTicket?.status === "approved"
              ? "badge-success"
              : selectedTicket?.status === "rejected"
                ? "badge-error"
                : "badge-warning"
          }
        `}
              >
                {selectedTicket?.status}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <h2 className="text-3xl font-bold text-primary">
                  {selectedTicket?.ticketTitle}
                </h2>

                <p className="text-gray-500 mt-1">
                  Ticket details submitted by vendor
                </p>
              </div>

              {/* Route & Transport */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-base-200 rounded-xl p-4">
                  <p className="text-sm text-gray-500">From</p>

                  <h3 className="font-bold text-lg">
                    {selectedTicket?.ticketFrom}
                  </h3>
                </div>

                <div className="bg-base-200 rounded-xl p-4">
                  <p className="text-sm text-gray-500">To</p>

                  <h3 className="font-bold text-lg">
                    {selectedTicket?.ticketTo}
                  </h3>
                </div>

                <div className="bg-base-200 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Transport</p>

                  <h3 className="font-bold text-lg">
                    {selectedTicket?.transportType}
                  </h3>
                </div>
              </div>

              {/* Price & Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-xl p-4">
                  <p className="text-gray-500 text-sm">Ticket Price</p>

                  <h3 className="text-2xl font-bold text-primary">
                    ৳{selectedTicket?.ticketPrice}
                  </h3>
                </div>

                <div className="border rounded-xl p-4">
                  <p className="text-gray-500 text-sm">Available Quantity</p>

                  <h3 className="text-2xl font-bold">
                    {selectedTicket?.ticketQuantity}
                  </h3>
                </div>
              </div>

              {/* Departure */}
              <div className="border rounded-xl p-4">
                <p className="text-sm text-gray-500">Departure Date & Time</p>

                <h3 className="font-semibold text-lg mt-1">
                  {selectedTicket?.departureTime}
                </h3>
              </div>

              {/* Perks */}
              <div>
                <h3 className="font-bold text-lg mb-3">Included Perks</h3>

                {selectedTicket?.perks?.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {selectedTicket?.perks.map((perk, index) => (
                      <div
                        key={index}
                        className="badge badge-outline badge-lg p-4"
                      >
                        {perk}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Vendor Info */}
              <div className="bg-base-200 rounded-xl p-5">
                <h3 className="font-bold text-lg mb-4">Vendor Information</h3>

                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Vendor Name:</span>{" "}
                    {selectedTicket?.vendorName}
                  </p>

                  <p>
                    <span className="font-semibold">Vendor Email:</span>{" "}
                    {selectedTicket?.vendorEmail}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageTickets;
