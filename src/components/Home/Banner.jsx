import ThreeDModel from '@/components/ThreeDModel'
import Image from 'next/image'
import Link from 'next/link'

export default function Banner() {
  return (
    <div className="flex items-start gap-6 md:gap-12 -mt-16">
      {/* عنوان بنر */}
      <section className="w-full md:w-1/2 space-y-8">
        <h1 className="banner-title text-center md:text-right">
          گــــام <span className="text-highlight">راحــــت!</span>
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* توضیحات بنر */}
          <p className="text text-justify text-sm md:text-base">
            کفش‌ها برای راحتی، محافظت از پا و افزایش کارایی طراحی شده‌اند و در
            انواع مختلف از جمله روزمره، ورزشی و رسمی تولید می‌شوند تا نیازهای
            مختلف کاربران را برآورده کنند.
          </p>

          {/* لینک به صفحه فروشگاه */}
          <Link
            href={'/store'}
            className="btn-primary whitespace-nowrap text-center"
          >
            خرید کن
          </Link>
        </div>

        <div className="w-2/3 md:w-[65%] flex items-center border border-dark rounded-full p-2">
          {/* لوگوهای برندهای مختلف */}
          <figure className="w-16 h-16 md:w-22 md:h-22 rounded-full overflow-hidden">
            <Image src={'/images/nike.jpg'} alt="" width={90} height={90} />
          </figure>

          <figure className="w-16 h-16 md:w-22 md:h-22 rounded-full overflow-hidden bg-neutral -mr-4 md:-mr-8">
            <Image src={'/images/puma.jpg'} alt="" width={90} height={90} />
          </figure>

          <p className="text-small mr-2 md:mr-4">+7 برند</p>
        </div>
      </section>

      {/* تصویر بنر */}
      <figure className="hidden lg:block relative w-full md:w-auto">
        {/* پس‌زمینه دایره‌ای */}
        <div className="absolute left-1/2 md:left-12 top-16 h-64 w-64 md:h-[500px] md:w-[500px] shadow-2xl shadow-gray-600 rounded-full bg-secondary -z-10 transform -translate-x-1/2 md:translate-x-0"></div>

        {/* مدل سه‌بعدی */}
        <ThreeDModel />
      </figure>
    </div>
  )
}
