import Plane from "../../../animation/Plane";

const Mission = () => {
  return (
    <div className="md:grid grid-cols-5 gap-10 items-center">
      {/* lottie file */}
      <div className="col-span-2 max-md:hidden">
        <Plane></Plane>
      </div>
      {/* our mission */}
      <div className="col-span-3">
        <div className="mb-10">
          <h5 className="text-4xl font-bold text-primary mb-3">Our Mission</h5>
          <p className="text-2xl text-justify">
            To make travel across Bangladesh simple, fast, and accessible by
            providing a secure all-in-one ticket booking platform for buses,
            trains, launches, and flights. We aim to deliver a smooth booking
            experience with real-time seat selection, transparent pricing, and
            reliable customer support for every traveler.
          </p>
        </div>
        <div>
          <h5 className="text-4xl font-bold text-primary mb-3">Our Vision</h5>
          <p className="text-2xl text-justify">
            To become the most trusted digital travel platform in Bangladesh by
            connecting people with smarter, safer, and more convenient
            transportation services. We envision a future where booking any
            journey takes only a few clicks — anytime, anywhere.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
