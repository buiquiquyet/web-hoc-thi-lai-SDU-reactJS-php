import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import classNames from "classnames/bind";
import styles from './Main.module.scss';
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { NextIcon, PrevIcon } from "../../icon";
SwiperCore.use([EffectCoverflow, Pagination, Navigation]);
const cx = classNames.bind(styles);

const slide_img = [
  "https://saodo.edu.vn/uploads/slider/36.jpg",
  "https://saodo.edu.vn/uploads/slider/34-full.jpg",
  "https://saodo.edu.vn/uploads/slider/35-full.jpg",
  "https://saodo.edu.vn/uploads/slider/21.jpg",
  // "https://saodo.edu.vn/uploads/banners/du-l-ch-ngo-i-ng.jpg",
  // "https://saodo.edu.vn/uploads/banners/dhi-n_2.jpg",
  // "https://saodo.edu.vn/uploads/banners/345441058_781681173307104_2176849254004848512_cn1_2.jpg",
  // "https://saodo.edu.vn/uploads/banners/341772721_614085196993414_7573513102012583726_cokhi.jpg",
  // "https://saodo.edu.vn/uploads/banners/339988641_593026695872510_1040419088972449431_may1_2.jpg"
];

const Main = () => {
  const swiperRef = useRef(null);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <>
    <div className={cx('wrapper')}>
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: false,
        }}
        spaceBetween={0}
        pagination={true}
        autoplay={{ delay: 2000 }}
        className={cx('swiper')}
        ref={swiperRef}
      >
        {slide_img.map((img, i) => {
          return (
            <SwiperSlide className={cx('swiper-slide')} key={i}>
              <img src={img} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
        <button className={cx('buttonSlidePrev')} onClick={goPrev}><PrevIcon classsName={cx('iconSlide')}/></button>
        <button className={cx('buttonSlideNext')} onClick={goNext}><NextIcon classsName={cx('iconSlide')}/></button>
    </div>
    <div className={cx('content')}>
      <div className={cx('iconAddress')} >
        <a className={cx('face')} href="http://daotao.saodo.edu.vn/">
          <img src="https://saodo.edu.vn/uploads/menu/education.png" alt="img"/>
          <span>Học vụ sinh viên</span>
        </a>
        <a className={cx('face')} href="http://elearning.saodo.edu.vn/">
          <img src="https://saodo.edu.vn/uploads/menu/elearning.png" alt="img"/>
          <span>Học tập trực tuyến</span>
        </a>
        <a className={cx('face')} href="http://lhtv.vista.vn/">
          <img src="https://saodo.edu.vn/uploads/menu/library.png" alt="img"/>
          <span>Thư điện tử</span>
        </a>
        <a className={cx('face')} href="http://kytucxa.saodo.edu.vn/">
          <img src="https://saodo.edu.vn/uploads/menu/apartment.png" alt="img"/>
          <span>Ký túc xá</span>
        </a>
      </div>
    </div>
    </>
  );
};

export default Main;
