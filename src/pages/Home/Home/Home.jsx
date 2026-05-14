import FeaturedTickets from "../FeaturedTickets/FeaturedTickets";
import LatestTickets from "../LatestTickets/LatestTickets";
import Slider from "../Slider/Slider";
import "swiper/css";
const Home = () => {
  return (
    <div className="">
      <Slider></Slider>
      <FeaturedTickets></FeaturedTickets>
      <LatestTickets></LatestTickets>
    </div>
  );
};

export default Home;
