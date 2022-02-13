import { SwiperConfigInterface } from "ngx-swiper-wrapper";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
  };

 export const PRODUCT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 4,
  spaceBetween: 10,
  pagination:{ type: 'fraction' },

  // virtual: true
  // slideToClickedSlide: true,
  // mousewheel: true,
  // scrollbar: false,
  // watchSlidesProgress: true,
  // navigation: true,
  // keyboard: true,
  // pagination: false,
  // centeredSlides: false,
  loop: false,
  // roundLengths: false,
  // slidesOffsetBefore: 1,
  // slidesOffsetAfter: 1,
  // spaceBetween: 5,
  width: 240
  };