import { useEffect, useState } from 'react'

// هوک سفارشی برای استخراج رنگ‌های تم از CSS متغیرها
const useThemePreviewColors = (theme) => {
  // تعریف وضعیت پیش‌فرض رنگ‌ها
  const [themeColors, setThemeColors] = useState({
    primary: '#000', // رنگ اولیه
    secondary: '#000', // رنگ ثانویه
    accent: '#000', // رنگ برجسته
  })

  useEffect(() => {
    // بررسی اینکه کد در محیط مرورگر اجرا می‌شود
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      try {
        // ایجاد یک عنصر موقت برای اعمال تم و استخراج رنگ‌ها
        const tempElement = document.createElement('div')
        tempElement.setAttribute('data-theme', theme) // تعیین تم برای عنصر
        tempElement.style.display = 'none' // مخفی کردن عنصر از دید
        document.body.appendChild(tempElement) // اضافه کردن عنصر به body

        // استخراج رنگ‌ها از استایل‌های محاسبه‌شده
        const computedStyles = getComputedStyle(tempElement)
        const primary =
          computedStyles.getPropertyValue('--primary')?.trim() || '#000' // رنگ اولیه
        const secondary =
          computedStyles.getPropertyValue('--secondary')?.trim() || '#000' // رنگ ثانویه
        const accent =
          computedStyles.getPropertyValue('--accent')?.trim() || '#000' // رنگ برجسته

        // حذف عنصر موقت از body بعد از استخراج رنگ‌ها
        document.body.removeChild(tempElement)

        // به‌روزرسانی وضعیت رنگ‌ها با مقادیر استخراج شده
        setThemeColors({ primary, secondary, accent })
      } catch (error) {
        // در صورت بروز خطا، خطا را در کنسول نمایش می‌دهیم
        console.error(`Error reading theme colors: ${error.message}`)
      }
    }
  }, [theme]) // هر بار که تم تغییر کند، این effect اجرا می‌شود و رنگ‌ها به‌روزرسانی می‌شوند

  // بازگشت رنگ‌ها به عنوان خروجی هوک
  return themeColors
}

export default useThemePreviewColors
