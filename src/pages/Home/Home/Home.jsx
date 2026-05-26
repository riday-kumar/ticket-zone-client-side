import { useEffect, useState } from "react";
import ChooseUs from "../ChooseUs/ChooseUs";
import FeaturedTickets from "../FeaturedTickets/FeaturedTickets";
import LatestTickets from "../LatestTickets/LatestTickets";
import PopularRoad from "../PopularRoad/PopularRoad";
import Slider from "../Slider/Slider";
import "swiper/css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const Home = () => {
  const [advertiseTickets, setAdvertiseTickets] = useState([]);
  const [latestTickets, setLatestTickets] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get("/featured-tickets").then((res) => {
      setAdvertiseTickets(res.data);
    });
  }, [axiosSecure]);

  useEffect(() => {
    axiosSecure("/approved-tickets?type=all-type").then((res) => {
      setLatestTickets(res.data);
    });
  }, [axiosSecure]);

  const fewTickets = latestTickets.slice(0, 8);
  // console.log(fewTickets);

  return (
    <div className="*:mb-20">
      <Slider></Slider>
      <FeaturedTickets advertiseTickets={advertiseTickets}></FeaturedTickets>
      <LatestTickets latestTickets={fewTickets}></LatestTickets>
      <PopularRoad></PopularRoad>
      <ChooseUs></ChooseUs>
    </div>
  );
};

export default Home;
