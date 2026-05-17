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
    axiosSecure("/approved-tickets").then((res) => {
      setLatestTickets(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="*:mb-20">
      <Slider></Slider>
      <FeaturedTickets advertiseTickets={advertiseTickets}></FeaturedTickets>
      <LatestTickets latestTickets={latestTickets}></LatestTickets>
      <PopularRoad></PopularRoad>
      <ChooseUs></ChooseUs>
    </div>
  );
};

export default Home;
