import SectionHeading from "../../../components/SectionHeading";
import { FaBus, FaTrain, FaShip, FaPlane } from "react-icons/fa";

const WeOffer = () => {
  const services = [
    {
      id: 1,
      title: "Bus Booking",
      description:
        "Hundreds of AC/Non-AC buses across Bangladesh with real-time seat selection",
      icon: <FaBus />,
      bg: "bg-sky-500",
    },
    {
      id: 2,
      title: "Train Tickets",
      description: "Book intercity & interdistrict trains with confirmed seats",
      icon: <FaTrain />,
      bg: "bg-violet-500",
    },
    {
      id: 3,
      title: "Launch & Ferry",
      description: "River routes with premium & economy classes",
      icon: <FaShip />,
      bg: "bg-emerald-500",
    },
    {
      id: 4,
      title: "Domestic Flights",
      description: "Fastest way to travel between major cities",
      icon: <FaPlane />,
      bg: "bg-orange-500",
    },
  ];
  return (
    <div>
      <SectionHeading heading="What We Offer"></SectionHeading>
      <section className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="card bg-white shadow-xl rounded-3xl hover:-translate-y-2 duration-300"
            >
              <div className="card-body items-center text-center py-12 px-8">
                {/* Icon */}
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl shadow-lg ${service.bg}`}
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold mt-8 text-slate-900">
                  {service.title}
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-[16px]  mt-4">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WeOffer;
