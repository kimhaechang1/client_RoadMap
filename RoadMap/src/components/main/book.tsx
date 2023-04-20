import '../css/book.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, HashNavigation } from "swiper";
const Book = ({ index }: { index: number }) => {
    return (
        <SwiperSlide data-hash={`slide${index}`}>
          <div className="sliderDiv">
            <img src="http://via.placeholder.com/140x220" />
            <div>책 제목</div>
          </div>
        </SwiperSlide>
    )
}

export default Book;