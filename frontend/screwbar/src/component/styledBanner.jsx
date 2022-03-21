import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Container = styled.div`
  overflow: hidden;
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    width: 1100px;
    overflow: hidden;
  }
  .slick-slide div {
    margin: 0 auto;
    width: 1100px;
    outline: none;
  }
`;

const ImageContainer = styled.div`
  margin: 0 16px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const banner1 = require('../css/img/Main.jpg');
const banner2 = require('../css/img/banner2.jpg');
const banner3 = require('../css/img/banner3.jpg');
const banner4 = require('../css/img/banner4.jpg');
const banner5 = require('../css/img/banner5.jpg');

const items = [
  { id: 1, url: banner2 },
  { id: 2, url: banner3 },
  { id: 3, url: banner4 },
  { id: 4, url: banner5 },
  // { id: 5, url: banner5 },
];

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 0,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnHover: true,
      autoplay: true,
      autoplaySpeed: 3000,
      centerMode: true, // 중앙정렬
    };
    return (
      <Container>
        <StyledSlider {...settings}>
          {items.map((item) => {
            return (
              <div key={item.id}>
                <ImageContainer>
                  <Image src={item.url} />
                </ImageContainer>
              </div>
            );
          })}
        </StyledSlider>
      </Container>
    );
  }
}
