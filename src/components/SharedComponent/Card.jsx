import { FaArrowRight } from "react-icons/fa";

const Card = () => {
  return (
    <div className="card bg-white shadow-lg element">
      <figure className="relative">
        <img
          className="w-full"
          src="https://i.ibb.co.com/b5Nd7CYN/Kuakata-Sea-Beach-Picture.jpg"
          alt="Shoes"
        />
        <div className="absolute top-2 right-2 badge badge-error text-white font-semibold">
          Featured
        </div>
        {/* price */}
        <div className="font-bold absolute bottom-2 left-2 badge badge-primary text-white">
          <span>৳ 1100 / Sit</span> <br />
        </div>
      </figure>
      <div className="card-body">
        {/* ticket title */}
        <h2 className="card-title text-primary text-[26px] font-bold">
          Sohag Express
        </h2>
        {/* destination */}
        <p className="mb-3 flex items-center gap-3 text-info text-[20px] font-semibold">
          Dhaka <FaArrowRight /> Kuakata
        </p>
        <div className="card-actions space-y-3">
          {/* ticket for and how many sits */}
          <div className="flex gap-3 *:text-white">
            <div className="badge badge-primary font-semibold text-[18px]">
              Bus
            </div>
            <div className="badge badge-success text-[16px]">
              100 seats left
            </div>
          </div>
          {/* features like - ac, breakfast */}
          <div className="flex gap-2">
            <div className="badge badge-outline text-primary">AC</div>
            <div className="badge badge-outline text-primary">Breakfast</div>
            <div className="badge badge-outline text-primary">+2 more</div>
          </div>
          {/* departure time */}
          <p className="font-bold">Departure : 11/ 10/ 2027 at 18:42</p>
          <button className="btn btn-grad btn-large w-full">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
