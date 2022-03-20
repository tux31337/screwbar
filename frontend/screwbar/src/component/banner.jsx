import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 0,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnHover: true,
      autoplay: true,
      autoplaySpeed: 3000
    };
    return (
      <Slider {...settings}>
        <div>
        <img src="img/banner2.jpg"></img>
        </div>
        <div>
        <img src="img/banner4.jpg"></img>
        </div>
        <div>
        <img src="img/banner5.jpg"></img>
        </div>
        <div>
        <img src="img/banner3.jpg"></img>
        </div>
      </Slider>
    );
  }
}

export default  SimpleSlider;