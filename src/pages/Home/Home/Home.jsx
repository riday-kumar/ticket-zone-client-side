import FeaturedTickets from "../FeaturedTickets/FeaturedTickets";
import Slider from "../Slider/Slider";
import "swiper/css";
const Home = () => {
  return (
    <div className="">
      <Slider></Slider>
      <FeaturedTickets></FeaturedTickets>
    </div>
  );
};

export default Home;
