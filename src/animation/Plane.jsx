import { useLottie } from "lottie-react";

import worldTour from "../animation/world.json";

const Plane = () => {
  const options = {
    animationData: worldTour,
    loop: true,
  };
  const { View } = useLottie(options);
  return <div className="">{View}</div>;
};

export default Plane;
