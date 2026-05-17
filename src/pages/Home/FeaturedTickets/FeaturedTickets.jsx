import SectionHeading from "../../../components/SectionHeading";
import Card from "../../../components/SharedComponent/Card";

const FeaturedTickets = ({ advertiseTickets }) => {
  console.log(advertiseTickets);
  return (
    <div className="">
      <SectionHeading
        heading="Featured Tickets"
        subheading="Best deals for your next journey"
      ></SectionHeading>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
        {advertiseTickets.map((ticket, index) => (
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
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTickets;
