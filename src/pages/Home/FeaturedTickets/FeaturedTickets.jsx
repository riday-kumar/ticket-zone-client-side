import SectionHeading from "../../../components/SectionHeading";
import Card from "../../../components/SharedComponent/Card";

const FeaturedTickets = () => {
  return (
    <div className="">
      <SectionHeading
        heading="Featured Tickets"
        subheading="Best deals for your next journey"
      ></SectionHeading>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  );
};

export default FeaturedTickets;
