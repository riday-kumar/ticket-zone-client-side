import { FaArrowRight } from "react-icons/fa";

const Card = ({
  ticketTitle,
  ticketFrom,
  ticketTo,
  transportType,
  ticketPrice,
  ticketQuantity,
  departureTime,
  perks,
  photoURL,
  status,
}) => {
  return (
    <div className="card bg-white shadow-lg element">
      <figure className="relative">
        <img className="w-full h-60" src={photoURL} alt="Shoes" />
        <div className="absolute top-2 right-2 badge badge-error text-white font-semibold">
          Featured
        </div>
        {/* price */}
        <div className="font-bold absolute bottom-2 left-2 badge badge-primary text-white">
          <span>৳ {ticketPrice} / Sit</span> <br />
        </div>
      </figure>
      <div className="card-body">
        {/* ticket title */}
        <h2 className="card-title text-primary text-[26px] font-bold">
          {ticketTitle}
        </h2>
        {/* destination */}
        <p className="mb-3 flex items-center gap-3 text-info text-[20px] font-semibold">
          {ticketFrom} <FaArrowRight /> {ticketTo}
        </p>
        <div className="card-actions space-y-3">
          {/* ticket for and how many sits */}
          <div className="flex gap-3 *:text-white">
            <div className="badge badge-primary font-semibold text-[18px]">
              {transportType}
            </div>
            <div className="badge badge-success text-[16px]">
              {ticketQuantity} seats left
            </div>
          </div>
          {/* features like - ac, breakfast */}
          <div className="flex gap-2">
            <div className="badge badge-outline text-primary">AC</div>
            <div className="badge badge-outline text-primary">Breakfast</div>
            <div className="badge badge-outline text-primary">+2 more</div>
          </div>
          {/* departure time */}
          <p className="font-bold">Departure : {departureTime}</p>
          <button className="btn btn-grad btn-large w-full">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
