import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import air from "../../../assets/air.jpg";
import ship from "../../../assets/ships.jpg";
import rail from "../../../assets/rails.jpg";
import SliderText from "./SliderText";
const Slider = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      slidesPerView={1}
      pagination={true}
      loop={true}
      // autoplay={{ delay: 2000 }}
      effect="fade"
    >
      <SwiperSlide>
        <SliderText
          heading="Sail Across Destinations with Comfort"
          para="Book reliable ship tickets and enjoy smooth journeys across rivers and coastal routes with ease."
          img={ship}
        ></SliderText>
      </SwiperSlide>

      <SwiperSlide>
        <SliderText
          heading="Fly Faster, Travel Smarter"
          para="Get the best flight deals and reach your destination quickly, safely, and comfortably."
          img={air}
        ></SliderText>
      </SwiperSlide>

      <SwiperSlide>
        <SliderText
          heading="Experience the Joy of Rail Travel"
          para="Travel through beautiful landscapes with affordable and convenient train ticket booking services."
          img={rail}
        ></SliderText>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
