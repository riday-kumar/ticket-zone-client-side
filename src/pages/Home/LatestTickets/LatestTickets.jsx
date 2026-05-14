import SectionHeading from "../../../components/SectionHeading";
import Card from "../../../components/SharedComponent/Card";

const LatestTickets = () => {
  return (
    <div>
      <SectionHeading
        heading="Latest Tickets"
        subheading="New travel deals just for you"
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

export default LatestTickets;
