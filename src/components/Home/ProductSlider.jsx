'use client'

import { ProductCard2 } from '@/components/productCard'
import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export const ProductSlider = ({ slides }) => {
  // State برای مدیریت وضعیت اسلایدر (آیا در ابتدای اسلایدها هستیم یا انتهای آن‌ها)
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  // حرکت به اسلاید بعدی
  const goToNextSlide = () => swiperInstance?.slideNext()

  // حرکت به اسلاید قبلی
  const goToPrevSlide = () => swiperInstance?.slidePrev()

  // بروزرسانی وضعیت اسلایدر هنگام تغییر اسلاید
  const updateSwiperState = (swiper) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <div className="relative h-max">
      {/* بخش عنوان و دکمه‌های ناوبری */}
      <div className="flex items-center justify-between lg:mb-8 px-4 md:px-0">
        <h1 className="title text-base md:text-xl lg:text-2xl">
          محصولات پرطرفدار
        </h1>
        <div className="flex gap-2 z-10">
          {/* دکمه حرکت به سمت قبلی */}
          <button
            className={`p-2 md:p-4 shadow-md shadow-dark border rounded-full ${
              isBeginning ? 'opacity-20' : 'text-primary'
            }`}
            onClick={goToPrevSlide}
            disabled={isBeginning}
          >
            <FiChevronRight size={20} />
          </button>
          {/* دکمه حرکت به سمت بعدی */}
          <button
            className={`p-2 md:p-4 shadow-md shadow-dark border rounded-full ${
              isEnd ? 'opacity-20' : 'text-primary'
            }`}
            onClick={goToNextSlide}
            disabled={isEnd}
          >
            <FiChevronLeft size={20} />
          </button>
        </div>
      </div>

      {/* اسلایدر محصولات */}
      <Swiper
        modules={[Navigation, Autoplay]}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper)
          updateSwiperState(swiper)
        }}
        onSlideChange={updateSwiperState}
        className="w-full lg:h-[340px]"
        loop={false} // غیرفعال کردن لوپ برای جلوگیری از باگ
        autoplay={{
          delay: 7000,
          disableOnInteraction: false, // هنگامی که کاربر با اسلایدر تعامل کند، autoplay غیرفعال نشود
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2.4,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 24,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
        }}
      >
        {/* ایجاد اسلایدها */}
        {slides.slice(0, 10).map((slide, index) => (
          <SwiperSlide key={index} className="">
            <ProductCard2 product={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
