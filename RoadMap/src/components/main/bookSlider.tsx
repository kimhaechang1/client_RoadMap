import '../css/bookSlider.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, HashNavigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Book from './book';

const BookSlider = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        hashNavigation={{
          watchState: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, HashNavigation]}
        className="mySwiper"
      >
        {Array.from({length: 10}).map((_,i)=>{
          return (
            <SwiperSlide data-hash={`slide${i}`}>
              <div className="sliderDiv">
                <img src="http://via.placeholder.com/140x220" />
                <div>책 제목</div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>

  )
}

export default BookSlider;