import FeaturedTickets from "../FeaturedTickets/FeaturedTickets";
import LatestTickets from "../LatestTickets/LatestTickets";
import PopularRoad from "../PopularRoad/PopularRoad";
import Slider from "../Slider/Slider";
import "swiper/css";
const Home = () => {
  return (
    <div className="*:mb-20">
      <Slider></Slider>
      <FeaturedTickets></FeaturedTickets>
      <LatestTickets></LatestTickets>
      <PopularRoad></PopularRoad>
    </div>
  );
};

export default Home;
