import {
  FaShieldAlt,
  FaTags,
  FaUserTie,
  FaClock,
  FaMobileAlt,
  FaHeadset,
  FaArrowRight,
} from "react-icons/fa";
import SectionHeading from "../../../components/SectionHeading";

const features = [
  {
    id: 1,
    title: "Safety Guarantee",
    description:
      "Your journey is protected with trusted booking and secure payment systems.",
    icon: <FaShieldAlt size={36} />,
    active: false,
  },
  {
    id: 2,
    title: "Discount & Promo",
    description:
      "Get exciting discounts and special promo offers on every booking.",
    icon: <FaTags size={36} />,
    active: true,
  },
  {
    id: 3,
    title: "Professional Staff",
    description:
      "Our experienced support team is always ready to help you anytime.",
    icon: <FaUserTie size={36} />,
    active: false,
  },
  {
    id: 4,
    title: "Schedule On Time",
    description:
      "We ensure timely schedules and smooth travel experiences for passengers.",
    icon: <FaClock size={36} />,
    active: false,
  },
  {
    id: 5,
    title: "Online Booking",
    description:
      "Book your tickets easily from anywhere using your mobile or desktop.",
    icon: <FaMobileAlt size={36} />,
    active: false,
  },
  {
    id: 6,
    title: "24/7 Support",
    description:
      "Need help? Our support team is available 24 hours a day, 7 days a week.",
    icon: <FaHeadset size={36} />,
    active: false,
  },
];

const ChooseUs = () => {
  return (
    <section className=" py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <SectionHeading
          heading="Why Choose Us"
          subheading="We provide a smooth, secure, and comfortable ticket booking
            experience for all travelers."
        ></SectionHeading>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`card shadow-md transition-all duration-300 hover:-translate-y-2 cursor-pointer
              ${feature.active ? "bg-primary text-white" : "bg-base-100"}`}
            >
              <div className="card-body space-y-4">
                <div
                  className={`text-4xl ${
                    feature.active ? "text-white" : "text-primary"
                  }`}
                >
                  {feature.icon}
                </div>

                <h3
                  className={`text-3xl font-bold text-primary ${feature.active && "text-white"}`}
                >
                  {feature.title}
                </h3>

                <p
                  className={`leading-8 text-[18px] ${
                    feature.active ? "text-gray-100" : "text-gray-500"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
