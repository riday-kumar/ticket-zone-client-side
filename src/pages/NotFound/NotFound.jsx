import { useLottie } from "lottie-react";

import loadingAnimation from "../../animation/404cat.json";

const NotFound = () => {
  const options = {
    animationData: loadingAnimation,
    loop: true,
  };
  const { View } = useLottie(options);
  return (
    <div className="min-h-screen flex justify-center items-center">{View}</div>
  );
};

export default NotFound;
