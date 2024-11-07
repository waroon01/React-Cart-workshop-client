import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import axios from 'axios';

const ContentCarousal = () => {

  const [data, setData] = useState([])

  useEffect(()=>{
    hdlGetImage()
  },[])

  const hdlGetImage = async()=>{
    try{
      
      const res = await axios.get("https://picsum.photos/v2/list?page=1&limit=15")
      setData(res.data)
      
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <Swiper 
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true} 
        modules={[Autoplay,Pagination]} 
        className="mySwiper h-80 object-cover rounded-md mb-4"
      >
        {
          data?.map((item,index)=>

            <SwiperSlide key={index}>
              <img src={item.download_url}  />
            </SwiperSlide>
          
          )
        }
      </Swiper>      

      <Swiper 
        slidesPerView={5}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true} 
        navigation={true}
        modules={[Autoplay,Pagination,Navigation]} 
        className="mySwiper object-cover rounded-md gap-4"
      >
        {
          data?.map((item,index)=>

            <SwiperSlide key={index}>
              <img src={item.download_url} className='rounded-md' />
            </SwiperSlide>
          
          )
        }
      </Swiper>      
    </div>
  )
}

export default ContentCarousal