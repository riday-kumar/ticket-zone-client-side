import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
const MyTickets = () => {
  const { user } = useAuth();
  const email = user?.email;
  const axiosSecure = useAxiosSecure();

  const { data: myAddedTickets = [] } = useQuery({
    queryKey: ["myAddedTickets", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/${email}`);
      return res.data;
    },
  });

  console.log(myAddedTickets);
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
    </div>
  );
};

export default MyTickets;
