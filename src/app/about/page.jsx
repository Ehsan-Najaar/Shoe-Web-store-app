import Testimonial from '@/components/Testimonial'
import Image from 'next/image'

export default function About() {
  return (
    <div className="my-12 space-y-28">
      {/* بخش اول: داستان ما */}
      <div className="space-y-6">
        <h1 className="title text-center lg:text-right px-4 lg:px-24">
          داستان ما
        </h1>
        <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 lg:bg-neutral px-4 lg:px-24">
          {/* تصویر اول */}
          <figure className="w-52 lg:w-[50%] h-full rounded-xl overflow-hidden">
            <Image
              src={'/images/jpg(1).jpg'}
              alt="تصویری از داستان ما"
              width={600}
              height={600}
              className="object-cover"
              unoptimized
            />
          </figure>

          {/* توضیحات متنی */}
          <div className="space-y-6">
            <h1 className="title">روایت سفر ما در دنیای کفش‌ها</h1>
            <p className="text-justify text-lg text-dark/50">
              سفر ما از علاقه به کفش‌هایی آغاز شد که فراتر از راحتی، نشان‌دهنده
              سبک زندگی هستند. با گردآوری بهترین‌ها، تلاش کرده‌ایم تجربه‌ای
              بی‌نظیر برای شما خلق کنیم و همراه روزمره‌هایتان باشیم.
            </p>
            {/* دکمه CTA */}
            <button className="btn-transparent">برو بریم</button>
          </div>

          {/* تصویر دوم */}
          <figure className="hidden lg:block -ml-24">
            <Image
              src={'/images/jpg(2).jpg'}
              alt="تصویری از محصولات ما"
              width={800}
              height={800}
              className="object-cover"
              unoptimized
            />
          </figure>
        </section>
      </div>

      {/* بخش دوم: تعهد ما */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-80 px-4 lg:px-24">
        {/* تصاویر مربوط به بخش تعهد */}
        <figure className="relative flex">
          <Image
            src={'/images/jpg.jpg'}
            alt="کفش اسپرت اول"
            width={320}
            height={320}
            className="hidden lg:block mb-28 object-cover rounded-xl"
            unoptimized
          />
          <Image
            src={'/images/jpg(3).jpg'}
            alt="کفش اسپرت دوم"
            width={320}
            height={320}
            className="w-52 h-full lg:mt-28 lg:-mr-12 object-cover rounded-xl"
            unoptimized
          />
        </figure>

        {/* توضیحات متنی */}
        <section className="space-y-4 lg:space-y-12">
          <h1 className="title">تعهد ما به دنیای کفش‌های اسپرت</h1>
          <p className="text-justify text-lg text-dark/50">
            ما به فرهنگ کفش‌های اسپرت اعتقاد داریم و هر کفش را نه تنها به عنوان
            وسیله‌ای برای راحتی، بلکه به عنوان بخشی از سبک زندگی می‌بینیم. هدف
            ما ارائه بهترین انتخاب‌ها برای شماست تا تجربه‌ای منحصر به فرد از
            دنیای کفش‌های اسپرت داشته باشید.
          </p>
          {/* دکمه CTA */}
          <button className="btn-transparent">برو بریم</button>
        </section>
      </div>

      {/* بخش سوم: نظرات مشتریان */}
      <div className="px-4 lg:px-24">
        <Testimonial />
      </div>
    </div>
  )
}
