import { Link } from "react-router";

const SliderText = ({ img, heading, para }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat  bg-blend-darken bg-[#00000073] flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="flex flex-col justify-center items-center gap-7 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-linear-to-r from-[#ff512f] via-yellow-400  to-[#ff512f] bg-clip-text text-transparent">
          {heading}
        </h1>
        <p className="text-[18px] lg:text-2xl font-medium text-[#F5F5F5]">
          {para}
        </p>
        <Link to="/all-tickets" className="btn btn-slide-btn">
          Explore Now
        </Link>
      </div>
    </div>
  );
};

export default SliderText;
