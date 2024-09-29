// Carousel.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from '../../assets/c1.webp';
import slider2 from '../../assets/c2.webp';
import slider3 from '../../assets/c3.webp';
import slider4 from '../../assets/c4.webp';


const Carousel = () => {
  const settings = {
    dots: true,           // Pagination dots visible
    infinite: true,       // Infinite loop
    speed: 500,           // Transition speed in ms
    slidesToShow: 1,      // Number of slides to show at a time
    slidesToScroll: 1,    // Number of slides to scroll at a time
    autoplay: true,       // Auto-play enabled
    autoplaySpeed: 2000,  // Auto-play speed in ms
  };

  return (
    <div style={{ width: "90%", margin: "auto", paddingTop: "20px" , marginBottom : '2.5rem' ,  }}>
      <Slider {...settings}>
        <div>
          <img
            src={slider1}
            alt="Image 1"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div>
          <img
            src={slider2}
            alt="Image 2"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div>
          <img
            src={slider3}
            alt="Image 3"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div>
          <img
            src={slider4}
            alt="Image 4"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
