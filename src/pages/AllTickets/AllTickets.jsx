import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../components/SectionHeading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Card from "../../components/SharedComponent/Card";
import Loading from "../../components/SharedComponent/Loading";
import { useState } from "react";

const AllTickets = () => {
  const [searchText, setSearchText] = useState({
    from: "",
    to: "",
    type: "all-type",
    sort: "default",
  });
  const axiosSecure = useAxiosSecure();
  const { data: allLatestTickets = [], isLoading: allLatestTicketsLoading } =
    useQuery({
      queryKey: ["allLatestTickets", searchText],

      enabled: !!searchText,

      queryFn: async () => {
        const res = await axiosSecure.get("/approved-tickets", {
          params: searchText,
        });
        return res.data;
      },
    });

  // console.log(allLatestTickets);

  if (allLatestTicketsLoading) {
    return <Loading></Loading>;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const from = e.target.from.value;
    const to = e.target.to.value;
    const type = e.target.type.value;
    const sort = e.target.sort.value;
    setSearchText({ from, to, type, sort });
    // console.log({ from, to, type, sort });
  };

  const handleResetForm = () => {
    const reset = {
      from: "",
      to: "",
      type: "all-type",
      sort: "default",
    };

    setSearchText(reset);
  };

  return (
    <div className="*:mb-20">
      <div className="mt-15">
        <SectionHeading
          heading="All Tickets"
          subheading="Let us be a part of your dream journey"
        ></SectionHeading>
      </div>
      {/* ------------ Search system----------- */}
      <div className="bg-base-100 p-5 rounded-2xl shadow-md">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* From */}

            <div>
              <label className="label font-semibold">From</label>
              <input
                name="from"
                placeholder="ex: Dhaka"
                type="text"
                className="input input-bordered w-full"
              />
            </div>

            {/* To */}
            <div>
              <label className="label font-semibold">To</label>
              <input
                name="to"
                type="text"
                placeholder="ex: Cox's Bazar"
                className="input input-bordered w-full"
              />
            </div>

            {/* Transport Type */}
            <div>
              <label className="label font-semibold">Transport</label>
              <select name="type" className="select select-bordered w-full">
                <option value="all-type">All Type</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
                <option value="Ship">Ship</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="label font-semibold">Sort By</label>
              <select name="sort" className="select select-bordered w-full">
                <option value="low">Price : Low to High</option>
                <option value="high">Price : High to Low</option>
              </select>
            </div>
            {/* Search Button */}
            <div className="flex gap-2 items-end">
              <button type=" submit" className="btn btn-primary ">
                Search
              </button>
              <button
                onClick={handleResetForm}
                className="btn btn-info text-white"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>

      {allLatestTickets.length === 0 && <p>No Ticket Found</p>}

      {/* All the admin approved tickets */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {allLatestTickets.map((ticket, index) => (
          <Card
            key={index}
            departureTime={ticket.departureTime}
            perks={ticket.perks}
            photoURL={ticket.photoURL}
            status={ticket.status}
            ticketFrom={ticket.ticketFrom}
            ticketPrice={ticket.ticketPrice}
            ticketQuantity={ticket.ticketQuantity}
            ticketTitle={ticket.ticketTitle}
            ticketTo={ticket.ticketTo}
            transportType={ticket.transportType}
            alertMsg="New"
            id={ticket._id}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default AllTickets;
