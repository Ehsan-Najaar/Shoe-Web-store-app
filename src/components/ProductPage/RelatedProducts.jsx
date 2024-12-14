'use client'

import { ProductCard2 } from '@/components/productCard'
import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function RelatedProducts({ products, pathname, thisProduct }) {
  // مدیریت وضعیت اسلایدر
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [isBeginning, setIsBeginning] = useState(true) // وضعیت ابتدای اسلایدر
  const [isEnd, setIsEnd] = useState(false) // وضعیت انتهای اسلایدر

  // استخراج دسته‌بندی از `pathname` (بخش دوم مسیر بعد از `/store`)
  const category = pathname.split('/')[2] // 'men', 'women', 'kids'

  // بررسی اینکه `thisProduct` موجود باشد
  if (!thisProduct) {
    return (
      <div className="text-center text-gray-500 py-8">
        محصول فعلی موجود نیست.
      </div>
    )
  }

  // فیلتر محصولات مرتبط
  const relatedProducts = products.filter((product) => {
    const isSameCategory = product.category === category // دسته‌بندی مشابه
    const isSameProduct = product.id !== thisProduct.id // محصول فعلی نباشد
    return isSameCategory && isSameProduct
  })

  // نمایش زمانی که محصولات مرتبط وجود ندارند
  if (relatedProducts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        محصول مرتبطی یافت نشد.
      </div>
    )
  }

  // انتقال به اسلاید بعدی
  const goToNextSlide = () => swiperInstance?.slideNext()

  // انتقال به اسلاید قبلی
  const goToPrevSlide = () => swiperInstance?.slidePrev()

  // بروزرسانی وضعیت اسلایدر
  const updateSwiperState = (swiper) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <div className="relative h-max">
      {/* بخش عنوان و دکمه‌های ناوبری */}
      <div className="flex items-center justify-between lg:mb-8 px-4 md:px-0">
        <h1 className="title text-base md:text-xl lg:text-2xl">
          محصولات مرتبط
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
        modules={[Autoplay, Navigation]}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper)
          updateSwiperState(swiper)
        }}
        onSlideChange={updateSwiperState}
        className="w-full lg:h-[340px]"
        loop={false}
        autoplay={{
          delay: 70000,
          disableOnInteraction: false, // غیرفعال نشدن اتوماتیک در تعامل با اسلایدر
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
        {relatedProducts.map((product) => (
          <SwiperSlide key={product.id} className="px-2 md:px-4">
            <ProductCard2 product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
