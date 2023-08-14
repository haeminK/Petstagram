// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './PostImages.css';

const PostImages = ({ images }) => {

    return (
        < Swiper
            className='min-w-[350px] w-full max-h-[600px] m-0'
            // install Swiper modules
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }
            }

        >
            {
                images.map((image, index) => {
                    return <SwiperSlide
                        key={index}>
                        <img
                            className='w-full h-full'
                            src={image.url}
                            alt="" />
                    </SwiperSlide>
                })
            }
        </Swiper >
    );
};

export default React.memo(PostImages);