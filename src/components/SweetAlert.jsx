import { useEffect, useState } from 'react'

const SweetAlert = ({ isOpen, title, message, onClose }) => {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    let timer // متغیر تایمر برای کنترل زمان

    if (isOpen) {
      setShowAnimation(true) // شروع انیمیشن ورود

      // تایمر برای کنترل مدت زمان نمایش پیغام
      timer = setTimeout(() => {
        setShowAnimation(false) // شروع انیمیشن خروج بعد از ۳ ثانیه
        // بستن کامپوننت پس از اتمام انیمیشن
        setTimeout(onClose, 300)
      }, 3000) // پیغام برای ۳ ثانیه نمایش داده می‌شود
    } else {
      setShowAnimation(false) // بستن فوری در صورت بسته شدن از بیرون
    }

    // پاک‌سازی تایمر در صورت تغییر وضعیت isOpen
    return () => clearTimeout(timer)
  }, [isOpen, onClose])

  // اگر نمایش نباشد یا انیمیشن تمام شده باشد، هیچ چیزی نمایش داده نمی‌شود
  if (!isOpen && !showAnimation) return null

  return (
    <div
      className={`fixed top-0 left-0 w-full flex items-start justify-center z-50 p-4 transition-all duration-300 ${
        showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="bg-white rounded-lg shadow-md border-t-4 border-primary w-96 p-6">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="mt-3 text-gray-700 text-sm">{message}</p>
      </div>
    </div>
  )
}

export default SweetAlert
