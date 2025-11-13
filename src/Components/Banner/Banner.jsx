import React from 'react';

const Banner = () => {
    return (
        <div>
            {/* Banner Section */}
      <div className="carousel w-full rounded-2xl mt-4">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co.com/0RD05vWw/download-6.jpg"
            className="w-full h-[400px] object-cover"
            alt="Garbage Issue"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co.com/20GTKKKr/download-5.jpg"
            className="w-full h-[400px] object-cover"
            alt="Community Cleaning"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co.com/R44y6RgT/65-buildings-between-Jinsi-Lakshmibai-Pratima-to-be-trimmed-for-road-widening.jpg"
            className="w-full h-[400px] object-cover"
            alt="Sustainability"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Banner;