import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  // اطلاعات سوالات متداول
  const faqs = [
    {
      question: 'چه سایزهایی موجود است؟',
      answer:
        'ما سایزهای متنوعی برای آقایان، بانوان و کودکان ارائه می‌دهیم. از راهنمای سایز ما برای انتخاب سایز مناسب خود استفاده کنید.',
    },
    {
      question: 'آیا ارسال رایگان دارید؟',
      answer:
        'بله، ما برای سفارش‌های بالای ۵۰ دلار ارسال رایگان ارائه می‌دهیم. زمان تحویل بسته به مکان شما متفاوت است.',
    },
    {
      question: 'آیا می‌توانم کفش‌ها را مرجوع یا تعویض کنم؟',
      answer:
        'بله، شما می‌توانید تا ۳۰ روز پس از خرید، در صورت عدم استفاده و با حفظ بسته‌بندی اصلی، محصولات را مرجوع یا تعویض کنید.',
    },
  ]

  // تغییر وضعیت نمایش هر سوال
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index) // اگر همین سوال باز باشد، آن را بسته وگرنه باز می‌کنیم
  }

  return (
    <div className="space-y-6 pb-24">
      {/* عنوان بخش */}
      <h1 className="title">سوالات متداول</h1>

      <div id="faq-accordion" className="space-y-4 rtl">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-neutral rounded-lg overflow-hidden">
            <h2>
              {/* دکمه نمایش سوال */}
              <button
                type="button"
                onClick={() => toggleAccordion(index)} // تغییر وضعیت نمایش جواب
                className="flex items-center justify-between w-full p-5 text-gray-800"
              >
                <span>{faq.question}</span>
                {/* آیکون فلش که جهت آن با توجه به وضعیت تغییر می‌کند */}
                <FiChevronDown
                  className={`w-5 h-5 transform transition-transform ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h2>
            {/* نمایش یا مخفی کردن جواب بر اساس وضعیت activeIndex */}
            <div
              className={`p-5 ${
                activeIndex === index ? 'block' : 'hidden'
              } text-gray-500`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQAccordion
