import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SLIDER1 from "./../../assets/homeslider/slider1.png";
import SLIDER2 from "./../../assets/homeslider/slider2.png";
import SLIDER3 from "./../../assets/homeslider/slider3.png";
const HomeSlider = () => {
  var settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full">
      <Slider {...settings} className="w-fll">
        <div className="w-full">
          <img src={SLIDER1} alt="slider1" className="w-full" />
        </div>
        <div>
          <img src={SLIDER2} alt="slider2" className="w-full" />
        </div>
        <div>
          <img src={SLIDER3} alt="slider3" className="w-full" />
        </div>
      </Slider>
    </div>
  );
};
export default HomeSlider;
