import Card from "../../../components/SharedComponent/Card";

const FeaturedTickets = () => {
  return (
    <div className="my-20">
      <div className="text-center mb-15">
        <h2 className="custom-head mb-5">Featured Tickets</h2>
        <p className="text-[18px] font-semibold text-sky-500 capitalize">
          Best deals for your next journey
        </p>
      </div>
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
