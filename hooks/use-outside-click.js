import { useEffect } from 'react'

// هوک سفارشی برای شناسایی کلیک‌های خارج از یک عنصر
export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    // تابع برای بررسی کلیک‌های خارج از عنصر
    const listener = (event) => {
      // اگر ref وجود نداشته باشد یا هدف رویداد داخل ref باشد، هیچ‌کاری انجام نمی‌شود
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      // در غیر این صورت، فراخوانی callback
      callback(event)
    }

    // اضافه کردن event listener برای mousedown و touchstart
    // این دو رویداد برای پشتیبانی از دستگاه‌های لمسی و دسکتاپ‌ها هستند
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    // بازگشت یک تابع cleanup برای حذف event listener ها هنگام unmount شدن کامپوننت
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, callback]) // این effect فقط زمانی اجرا می‌شود که ref یا callback تغییر کنند
}
