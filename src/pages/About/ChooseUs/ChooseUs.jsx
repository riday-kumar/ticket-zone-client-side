import { FaShieldAlt } from "react-icons/fa";
import { IoTimerSharp } from "react-icons/io5";
import { RiCustomerService2Fill } from "react-icons/ri";

const ChooseUs = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      text: "Best Price Guarantee",
    },
    {
      icon: <IoTimerSharp />,
      text: "Easy & Quick Booking",
    },
    {
      icon: <RiCustomerService2Fill />,
      text: "24/7 Customer Support",
    },
  ];
  return (
    <div className="py-16 px-4 bg-white rounded-lg">
      <h2 className="text-5xl font-bold mb-10 text-center">Why Choose US</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, index) => (
          <div
            key={index}
            className="custom-bg p-10 flex flex-col gap-3 items-center rounded-lg shadow-lg"
          >
            <div className="text-6xl text-primary">{feature.icon}</div>
            <p className="text-2xl font-semibold text-center">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUs;
