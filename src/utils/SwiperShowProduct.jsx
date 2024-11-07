import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


const SwiperShowProduct = ({children}) => {

  return (
    <Swiper 
    slidesPerView={5}
    spaceBetween={10}
    breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
      }}    
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    pagination={true} 
    navigation={true}
    modules={[Autoplay,Pagination,Navigation]} 
    className="mySwiper object-cover rounded-md gap-4"
  >
    {children}
  </Swiper>  
  )
}

export default SwiperShowProduct