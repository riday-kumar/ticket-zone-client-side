import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const MyTickets = () => {
  const { user } = useAuth();
  const email = user?.email;

  const axiosSecure = useAxiosSecure();

  const [selectedTicket, setSelectedTicket] = useState(null);

  const modalRef = useRef("modalRef");

  const { register, handleSubmit, reset } = useForm();

  const { data: myAddedTickets = [], refetch } = useQuery({
    queryKey: ["myAddedTickets", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets?email=${email}`);
      return res.data;
    },
  });

  const showDataInUpdateForm = (ticket) => {
    modalRef.current.showModal();
    setSelectedTicket(ticket);

    reset({
      ticketTitle: ticket.ticketTitle,
      ticketFrom: ticket.ticketFrom,
      ticketTo: ticket.ticketTo,
      transportType: ticket.transportType,
      ticketPrice: ticket.ticketPrice,
      ticketQuantity: ticket.ticketQuantity,
      departureTime: ticket.departureTime,
      perks: ticket.perks,
    });
  };

  const handleUpdateForm = (data) => {
    console.log(data);
    const ticketTitle = data.ticketTitle;
    const ticketFrom = data.ticketFrom;
    const ticketTo = data.ticketTo;
    const transportType = data.transportType;
    const ticketPrice = data.ticketPrice;
    const ticketQuantity = data.ticketQuantity;
    const departureTime = data.departureTime;
    const perks = data.perks;

    const updatedTicket = {
      ticketTitle,
      ticketFrom,
      ticketTo,
      transportType,
      ticketPrice,
      ticketQuantity,
      departureTime,
      perks,
    };

    console.log(updatedTicket);

    const selectedId = selectedTicket._id;

    axiosSecure.patch(`/tickets/${selectedId}`, updatedTicket).then((res) => {
      if (res.data.acknowledged) {
        modalRef.current.close();
        refetch();
        toast.success("ticket update successfully", {
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

  const handleHideModal = (e) => {
    e.preventDefault();
    modalRef.current.close();
  };
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">My Added Tickets</h2>

          <p className="text-gray-500 mt-2">
            Manage all your added transport tickets easily.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myAddedTickets.map((ticket) => {
            const isRejected = ticket.status === "rejected";

            return (
              <div
                key={ticket._id}
                className="card bg-white shadow-lg border border-gray-100"
              >
                {/* Image */}
                <figure className="relative">
                  <img
                    src={ticket.photoURL}
                    alt={ticket.ticketTitle}
                    className="h-56 w-full object-cover"
                  />

                  {/* Status Badge */}
                  <div
                    className={`absolute top-3 right-3 badge text-white font-semibold
                    ${
                      ticket.status === "pending"
                        ? "badge-warning"
                        : ticket.status === "approved"
                          ? "badge-success"
                          : "badge-error"
                    }
                  `}
                  >
                    {ticket.status}
                  </div>
                </figure>

                {/* Card Body */}
                <div className="card-body">
                  <h2 className="card-title text-2xl text-primary">
                    {ticket.ticketTitle}
                  </h2>

                  <div className="space-y-1 text-gray-600 text-[18px] font-medium">
                    <p>
                      <span className="font-semibold">Route:</span>{" "}
                      {ticket.ticketFrom} → {ticket.ticketTo}
                    </p>

                    <p>
                      <span className="font-semibold">Transport:</span>{" "}
                      {ticket.transportType}
                    </p>

                    <p>
                      <span className="font-semibold">Price:</span> ৳
                      {ticket.ticketPrice}
                    </p>

                    <p>
                      <span className="font-semibold">Quantity:</span>{" "}
                      {ticket.ticketQuantity}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="card-actions justify-end mt-5">
                    <button
                      onClick={() => showDataInUpdateForm(ticket)}
                      disabled={isRejected}
                      className="btn btn-primary btn-sm"
                    >
                      Update
                    </button>

                    <button
                      disabled={isRejected}
                      className="btn btn-error btn-sm text-white"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Rejected Message */}
                  {isRejected && (
                    <p className="text-red-500 text-sm mt-2">
                      This ticket was rejected by admin.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --------------------- modal ------------------- */}
      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Update Ticket</h3>
          <div className="modal-action">
            <form
              onSubmit={handleSubmit(handleUpdateForm)}
              className="dialogue space-y-5"
            >
              {/* Ticket Title */}
              <div>
                <label className="font-semibold">Ticket Title</label>
                <input
                  type="text"
                  {...register("ticketTitle")}
                  placeholder="Enter ticket title"
                  className="input input-bordered w-full mt-1"
                />
              </div>

              {/* From & To */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold">From</label>
                  <input
                    type="text"
                    {...register("ticketFrom")}
                    placeholder="From location"
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold">To</label>
                  <input
                    type="text"
                    {...register("ticketTo")}
                    placeholder="To location"
                    className="input input-bordered w-full mt-1"
                  />
                </div>
              </div>

              {/* Transport Type */}
              <div>
                <label className="font-semibold">Transport Type</label>

                <select
                  value={selectedTicket?.transportType}
                  {...register("transportType")}
                  className="select select-bordered w-full mt-1"
                >
                  <option value="">Select Transport</option>
                  <option value="Bus">Bus</option>
                  <option value="Train">Train</option>
                  <option value="Flight">Flight</option>
                  <option value="Ship">Ship</option>
                </select>
              </div>

              {/* Price & Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold">Price (Per Unit)</label>

                  <input
                    type="number"
                    {...register("ticketPrice")}
                    placeholder="Enter price"
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold">Ticket Quantity</label>

                  <input
                    type="number"
                    {...register("ticketQuantity")}
                    placeholder="Available tickets"
                    className="input input-bordered w-full mt-1"
                  />
                </div>
              </div>

              {/* Departure Date & Time */}
              <div>
                <label className="font-semibold">Departure Date & Time</label>

                <input
                  type="datetime-local"
                  {...register("departureTime")}
                  className="input input-bordered w-full mt-1"
                />
              </div>

              {/* Perks */}
              <div>
                <label className="font-semibold block mb-2">Perks</label>

                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="AC"
                      {...register("perks")}
                      className="checkbox"
                    />
                    AC
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Breakfast"
                      {...register("perks")}
                      className="checkbox"
                    />
                    Breakfast
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Wifi"
                      {...register("perks")}
                      className="checkbox"
                    />
                    Wifi
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Charging Port"
                      {...register("perks")}
                      className="checkbox"
                    />
                    Charging Port
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button className="btn btn-primary w-full">Update Ticket</button>
              <button onClick={handleHideModal} className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyTickets;
