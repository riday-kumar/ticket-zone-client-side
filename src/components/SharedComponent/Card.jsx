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
  alertMsg,
}) => {
  const localDate = new Date(departureTime);
  const showLocalDate = localDate.toLocaleString();

  return (
    <div className="card bg-white shadow-lg element">
      <figure className="relative">
        <img className="w-full h-60" src={photoURL} alt="Shoes" />
        <div
          className={`absolute top-2 right-2 badge text-white font-semibold ${alertMsg === "Featured" && "badge-warning"} ${alertMsg === "New" && "badge-success animate-pulse"}`}
        >
          {alertMsg}
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
        <div className="card-actions flex-col space-y-3">
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
            {perks.slice(0, 2).map((perk, index) => (
              <div key={index} className="badge badge-outline text-primary">
                {perk}
              </div>
            ))}
            {perks.length > 2 && (
              <div className="badge badge-outline text-primary">
                + {perks.length - 2} more
              </div>
            )}
          </div>
          {/* departure time */}
          <p className="font-bold">Departure : {showLocalDate}</p>
          <button className="btn btn-grad btn-large w-full">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
