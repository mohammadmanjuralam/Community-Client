import React from "react";
import loadingAnimation from "../../../assets/Loading.json";
import Lottie from "lottie-react";
const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default Loading;
