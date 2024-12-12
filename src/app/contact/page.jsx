'use client'

import {
  FiClock,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTwitter,
} from 'react-icons/fi'

// اطلاعات تماس
const contactInfo = [
  {
    id: 1,
    icon: <FiPhone />,
    title: 'تلفن',
    value: '72*****0913',
  },
  {
    id: 2,
    icon: <FiMail />,
    title: 'ایمیل',
    value: 'support@example.com',
  },
  {
    id: 3,
    icon: <FiClock />,
    title: 'ساعات کاری',
    value: 'دوشنبه-جمعه: 9:00 صبح - 6:00 عصر',
  },
  {
    id: 4,
    icon: <FiMapPin />,
    title: 'آدرس',
    value: 'تهران، خیابان ولیعصر، برج ایران',
  },
]

// شبکه‌های اجتماعی
const socialMedia = [
  {
    id: 1,
    icon: <FiFacebook />,
    name: 'فیسبوک',
    link: '#',
  },
  {
    id: 2,
    icon: <FiTwitter />,
    name: 'توییتر',
    link: '#',
  },
  {
    id: 3,
    icon: <FiInstagram />,
    name: 'اینستاگرام',
    link: '#',
  },
  {
    id: 4,
    icon: <FiLinkedin />,
    name: 'لینکدین',
    link: '#',
  },
]

export default function Contact() {
  return (
    <section className="px-4 lg:px-24 py-12">
      <div className="flex flex-col lg:flex-row justify-between gap-32">
        {/* اطلاعات تماس */}
        <div className="flex flex-col gap-12">
          {/* عنوان و توضیحات */}
          <div className="space-y-4">
            <h3 className="font-semibold text-3xl text-dark">اطلاعات تماس</h3>
            <p className="text-dark leading-relaxed">
              اگر مشکل فنی دارید، می‌خواهید بازخورد ارسال کنید یا نیاز به جزئیات
              بیشتری در مورد خدمات ما دارید، به ما اطلاع دهید.
            </p>
          </div>

          {/* لیست اطلاعات تماس */}
          <ul className="space-y-6">
            {contactInfo.map((item) => (
              <li key={item.id} className="flex items-center gap-4">
                {/* آیکون و متن مربوط به هر آیتم */}
                <span className="text-primary text-2xl">{item.icon}</span>
                <div>
                  <p className="text-lg font-medium text-primary">
                    {item.title}
                  </p>
                  <p className="text-dark">{item.value}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* شبکه‌های اجتماعی */}
          <div className="pt-6 border-t border-dark">
            <h4 className="text-xl font-bold text-dark">ما را دنبال کنید</h4>
            <div className="flex gap-4 mt-4">
              {socialMedia.map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-dark p-4 text-neutral rounded-full hover:bg-primary hover:text-neutral transition-all"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* فرم تماس */}
        <div className="bg-neutral text-dark p-8 rounded-lg shadow-lg w-full lg:w-2/3">
          <h2 className="mb-6 text-4xl font-extrabold text-center">
            پیامتو ارسال کن
          </h2>
          <form action="#" className="space-y-8">
            {/* فیلد ایمیل */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                ایمیل شما
              </label>
              <input
                type="email"
                id="email"
                className="input"
                placeholder="name@domain.com"
                required
              />
            </div>
            {/* فیلد موضوع */}
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium"
              >
                موضوع
              </label>
              <input
                type="text"
                id="subject"
                className="input"
                placeholder="چطور می‌توانیم کمکتان کنیم؟"
                required
              />
            </div>
            {/* فیلد پیام */}
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium"
              >
                پیام شما
              </label>
              <textarea
                id="message"
                rows="6"
                className="input resize-none"
                placeholder="پیام خود را بنویسید..."
                required
              ></textarea>
            </div>
            {/* دکمه ارسال */}
            <button
              type="submit"
              className="w-full py-3 px-6 bg-primary text-white rounded-lg hover:bg-dark/30 transition-all"
            >
              ارسال پیام
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
