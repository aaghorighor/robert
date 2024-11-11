/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';


const Carousel= (props) => {
  const {
    children,
    slideClassName,
    spaceBetween = 30,
    slidesPerView = 3,
    pagination = true,
    navigation = true,
    ...others
  } = props;

  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      modules={[Pagination, Navigation, Autoplay]}
      navigation={navigation ? { prevEl, nextEl } : false}
      pagination={pagination ? { clickable: true } : false}
      {...others}
    >
      {children?.map((slide, i) => (
        <SwiperSlide className={slideClassName} key={i}>
          {slide}
        </SwiperSlide>
      ))}

      {/* custom navigation */}
      {navigation && (
        <div className="swiper-navigation">
          <div
            role="button"
            ref={(node) => setPrevEl(node)}
            className="swiper-button swiper-button-prev swiper-button-disabled"
          />
          <div role="button" ref={(node) => setNextEl(node)} className="swiper-button swiper-button-next" />
        </div>
      )}
    </Swiper>
  );
};

Carousel.propTypes = {
  pagination: PropTypes.bool,
  navigation: PropTypes.bool,
  spaceBetween: PropTypes.bool,
  slideClassName: PropTypes.bool,
  children: PropTypes.arrayOf(object),
  slidesPerView: PropTypes.bool  
};

Carousel.defaultProps = {
  spaceBetween : 30,
  slidesPerView : 3,
  pagination : true,
  navigation : true,
};

export default Carousel;
