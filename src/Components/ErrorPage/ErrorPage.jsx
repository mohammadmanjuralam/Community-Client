import React from "react";
import ErrorImg from "../../assets/ErrorImg.png";

const ErrorPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <img
        src={ErrorImg}
        alt="Error Page"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};

export default ErrorPage;
