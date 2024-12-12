// components/ProductComment.js
import { useState } from 'react'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'

export default function ProductComment() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // باز کردن پاپ‌آپ ثبت نظر
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  // بستن پاپ‌آپ ثبت نظر
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header بخش نظرات */}
      <div className="flex justify-between items-center pb-6 border-b border-gray-200">
        <h2 className="font-semibold text-3xl text-dark">نظرات (2)</h2>

        {/* دکمه برای باز کردن پاپ‌آپ ثبت نظر */}
        <button
          className="bg-primary text-white py-2 px-4 rounded-full"
          onClick={handleOpenModal}
        >
          ثبت نظر
        </button>
      </div>

      <section className="space-y-6">
        {/* لیست نظرات */}
        <div className="space-y-4">
          <ReviewCard
            name="محمد رضاخانی"
            review="این کفش‌ها بسیار راحت و شیک هستند. برای استفاده در موقعیت‌های رسمی و غیررسمی عالی هستند. پیشنهاد می‌کنم!"
            date="22 آبان 1403"
          />
          <ReviewCard
            name="ارش قربانی"
            review="کفش‌ها با کیفیت خوبی هستند، اما تحویل آن بیشتر از حد انتظار طول کشید. در کل از خرید راضی هستم."
            date="18 فروردین 1403"
          />
        </div>

        {/* پاپ‌آپ ثبت نظر */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/70  grid place-items-center z-50"
            style={{ margin: 0 }}
          >
            <ReviewForm onClose={handleCloseModal} />
          </div>
        )}
      </section>
    </div>
  )
}
