'use client'

import FAQAccordion from '@/components/Home/Accordion'
import Banner from '@/components/Home/Banner'
import BrandTabs from '@/components/Home/BrandTabs'
import CategorySection from '@/components/Home/CategorySection'
import MobileBanner from '@/components/Home/MobileBanner'
import { ProductSlider } from '@/components/Home/ProductSlider'
import Testimonial from '@/components/Testimonial'
import productData from '../../data/productData'

const Home = () => {
  return (
    <div className="px-4 md:px-16 lg:px-20 xl:px-24 lg:space-y-32 space-y-16">
      {/* نمایش بنر موبایل از سایز کوچک تا XL */}
      <div className="xl:hidden mt-4">
        <MobileBanner />
      </div>

      {/* نمایش بنر دسکتاپ از XL به بالا */}
      <div className="hidden xl:block">
        <Banner />
      </div>

      {/* نمایش اسلاید محصولات */}
      <ProductSlider slides={productData} />

      {/* نمایش بخش دسته‌بندی محصولات */}
      <CategorySection products={productData} />

      <br />

      {/* نمایش تب‌های برند */}
      <BrandTabs />

      {/* نمایش نظرات مشتریان */}
      <Testimonial />

      {/* نمایش سوالات متداول */}
      <FAQAccordion />
    </div>
  )
}

export default Home
