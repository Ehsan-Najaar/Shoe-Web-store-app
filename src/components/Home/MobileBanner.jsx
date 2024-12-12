import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import productData from '../../../data/productData'

export default function MobileBanner() {
  // فیلتر محصولات برند "Nike"
  const nikeProducts = productData.filter((product) => product.brand === 'Nike')

  return (
    <div className="w-full bg-transparent rounded-xl overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay]} // استفاده از ماژول‌های Pagination و Autoplay
        pagination={{ clickable: true }} // فعال کردن پجینیشن کلیک‌پذیر
        autoplay={{
          delay: 3000, // تنظیم زمان اتوماتیک بین اسلایدها به ۳ ثانیه
          disableOnInteraction: false, // غیرفعال نکردن autoplay در صورت تعامل با اسلاید
        }}
        spaceBetween={16} // فاصله بین هر اسلاید
        slidesPerView={1} // نمایش یک اسلاید در هر بار
        className="rounded-lg"
      >
        {/* پیمایش و نمایش محصولات برند Nike */}
        {nikeProducts.slice(1, 4).map((product) => (
          <SwiperSlide key={product.id}>
            <div className="relative w-full h-72 sm:h-96 md:h-[470px] lg:h-[620px]">
              {/* نمایش تصویر محصول با تنظیمات مناسب */}
              <Image
                src={product.images[1]} // استفاده از تصویر دوم محصول
                alt={product.name} // توضیحات تصویر به نام محصول
                fill // پر کردن فضای div
                priority // اولویت بارگذاری تصویر
                className="object-cover rounded-lg" // تنظیم نمایش تصویر با استفاده از object-cover و گرد کردن گوشه‌ها
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
