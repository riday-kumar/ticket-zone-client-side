import ChooseUs from "./ChooseUs/ChooseUs";
import Mission from "./Mission/Mission";
import PageHeading from "./PageHeading/PageHeading";
import WeOffer from "./WeOffer/WeOffer";

const About = () => {
  return (
    <div className="*:mb-20">
      <PageHeading></PageHeading>
      <Mission></Mission>
      <WeOffer></WeOffer>
      <ChooseUs></ChooseUs>
    </div>
  );
};

export default About;
