import { Link } from "react-router";
import SectionHeading from "../../../components/SectionHeading";
import Card from "../../../components/SharedComponent/Card";

const LatestTickets = ({ latestTickets }) => {
  return (
    <div>
      <SectionHeading
        heading="Latest Tickets"
        subheading="New travel deals just for you"
      ></SectionHeading>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {latestTickets.map((ticket, index) => (
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
      <div className="flex justify-center mt-15">
        <Link className="btn btn-lg btn-grad">All Tickets</Link>
      </div>
    </div>
  );
};

export default LatestTickets;
