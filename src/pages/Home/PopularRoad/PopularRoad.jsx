import { FaArrowRight } from "react-icons/fa";
import SectionHeading from "../../../components/SectionHeading";

const PopularRoad = () => {
  const routes = [
    { from: "Narayanganj", to: "Chittagong" },
    { from: "Sylhet", to: "Dhaka" },
    { from: "Khulna", to: "Rajshahi" },
    { from: "Barishal", to: "Dhaka" },
  ];
  return (
    <div>
      <SectionHeading heading="Popular Road"></SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {routes.map((route, index) => (
          <div
            key={index}
            className="card bg-white shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
          >
            <div className="card-body text-center">
              <h3 className="text-black text-lg font-semibold flex items-center justify-center gap-2">
                {route.from}
                <FaArrowRight className="text-primary" />
                {route.to}
              </h3>

              <p className="text-sm font-medium text-gray-500 mt-2">
                Seamless & Secure
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRoad;
