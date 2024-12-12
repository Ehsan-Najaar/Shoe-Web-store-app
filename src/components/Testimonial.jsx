'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import 'swiper/css'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// اطلاعات نظرات مشتریان
const customers = [
  {
    image: '/images/jpg(4).jpg', // تصویر مشتری اول
    name: 'محمد',
    title: 'تحلیلگر بازار',
    review:
      'من از خدمات پشتیبانی این فروشگاه بسیار راضی هستم. تیم پشتیبانی سریع و کارآمد است و همیشه در دسترس هستند. تجربه خرید آنلاین من بی‌نظیر بود!',
    rating: 10,
  },
  {
    image: '/images/jpg(5).jpg', // تصویر مشتری دوم
    name: 'امیر',
    title: 'بلاگر مد',
    review:
      'خدمات تحویل به موقع این فروشگاه واقعاً شگفت‌انگیز است. تمامی سفارشات به سرعت و بدون هیچ مشکلی به دستم رسید. به شدت توصیه می‌کنم!',
    rating: 9,
  },
  {
    image: '/images/jpg(6).jpg', // تصویر مشتری سوم
    name: 'دانیال',
    title: 'کارآفرین تکنولوژی',
    review:
      'تجربه خرید از این فروشگاه آنلاین بی‌نظیر بود. روند خرید بسیار ساده و سریع است و تیم خدمات مشتری همیشه آماده کمک است. قطعاً دوباره خرید خواهم کرد.',
    rating: 8,
  },
]

const Testimonial = () => {
  // مدیریت وضعیت Swiper برای حرکت بین اسلایدها
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [isBeginning, setIsBeginning] = useState(true) // وضعیت اسلاید اول
  const [isEnd, setIsEnd] = useState(false) // وضعیت اسلاید آخر

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
    <div className="w-full rounded-xl">
      {/* عنوان بخش */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="title">نظرات مشتریان ما</h2>

        {/* دکمه‌های پیمایش */}
        <div className="flex gap-2 z-10">
          {/* دکمه حرکت به سمت قبلی */}
          <button
            className={`p-2 md:p-4 shadow-md shadow-dark border rounded-full ${
              isBeginning ? 'opacity-20' : 'text-primary'
            }`}
            onClick={goToPrevSlide}
            disabled={isBeginning} // غیرفعال کردن دکمه در ابتدای اسلاید
          >
            <FiChevronRight size={20} />
          </button>
          {/* دکمه حرکت به سمت بعدی */}
          <button
            className={`p-2 md:p-4 shadow-md shadow-dark border rounded-full ${
              isEnd ? 'opacity-20' : 'text-primary'
            }`}
            onClick={goToNextSlide}
            disabled={isEnd} // غیرفعال کردن دکمه در انتهای اسلاید
          >
            <FiChevronLeft size={20} />
          </button>
        </div>
      </div>

      {/* اسلایدر Swiper */}
      <Swiper
        modules={[Navigation, Autoplay]} // ماژول‌های Swiper برای ناوبری و پخش خودکار
        onSwiper={(swiper) => {
          setSwiperInstance(swiper) // ذخیره نمونه Swiper برای مدیریت
          updateSwiperState(swiper) // به‌روزرسانی وضعیت (ابتدای اسلاید یا انتها)
        }}
        onSlideChange={updateSwiperState} // به‌روزرسانی وضعیت هنگام تغییر اسلاید
        slidesPerView={1} // نمایش یک اسلاید در هر بار
        spaceBetween={50} // فاصله بین اسلایدها
        autoplay={{
          delay: 7000, // زمان بین هر اسلاید (7 ثانیه)
          disableOnInteraction: false, // غیرفعال نکردن خودکار بعد از تعامل کاربر
        }}
      >
        {/* ایجاد اسلایدها بر اساس اطلاعات مشتریان */}
        {customers.map((customer, index) => (
          <SwiperSlide key={index}>
            <div className="w-full flex flex-col lg:flex-row items-center gap-4 lg:gap-12 p-4 lg:p-0 bg-neutral rounded-xl overflow-hidden text-dark">
              {/* تصویر مشتری */}
              <div className="w-40 lg:h-96 lg:w-96">
                <Image
                  width={900}
                  height={900}
                  src={customer.image}
                  alt={customer.name} // توضیحات برای دسترسی به تصویر
                  className="object-cover w-full h-full rounded-full lg:rounded-none"
                />
              </div>
              {/* اطلاعات و نظر مشتری */}
              <div className="flex flex-col p-6 space-y-12">
                <p className="lg:text-lg font-semibold">{customer.review}</p>
                <div className="mt-4 text-gray-500 space-y-12">
                  <span className="text-accent">
                    {customer.rating} / 10 پیشنهاد می‌کنم
                  </span>
                  <div className="text-xl font-semibold">{customer.name}</div>
                  <small>{customer.title}</small>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Testimonial
