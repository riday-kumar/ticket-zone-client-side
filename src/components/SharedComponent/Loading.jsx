import { useLottie } from "lottie-react";

import loadingAnimation from "../../animation/Aeroplane.json";

const Loading = () => {
  const options = {
    animationData: loadingAnimation,
    loop: true,
  };
  const { View } = useLottie(options);
  return (
    <div className="min-h-screen flex justify-center items-center">{View}</div>
  );
};

export default Loading;
