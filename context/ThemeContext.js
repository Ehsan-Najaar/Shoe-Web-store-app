import { createContext, useContext, useEffect, useMemo, useState } from 'react'

// ایجاد Context برای مدیریت تم
const ThemeContext = createContext()

// ThemeProvider کامپوننتی است که برای در دسترس قرار دادن تم برای بخش‌های مختلف اپلیکیشن استفاده می‌شود
export const ThemeProvider = ({ children }) => {
  // ایجاد آرایه‌ای از تم‌ها با استفاده از useMemo (این آرایه تنها یکبار ایجاد می‌شود)
  const themes = useMemo(
    () => Array.from({ length: 20 }, (_, i) => `theme${i + 1}`),
    []
  )

  // تعریف وضعیت تم فعلی با استفاده از useState
  const [theme, setTheme] = useState(themes[0]) // مقدار پیش‌فرض تم 'theme1'

  // استفاده از useEffect برای بارگذاری تم ذخیره شده از localStorage
  useEffect(() => {
    // دریافت تم ذخیره شده از localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme && themes.includes(savedTheme)) {
      // اگر تم ذخیره شده موجود باشد و در لیست تم‌ها باشد، آن را بارگذاری می‌کنیم
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme) // تنظیم تم در <html>
    } else {
      // اگر تم ذخیره شده موجود نباشد، مقدار پیش‌فرض را تنظیم می‌کنیم
      setTheme(themes[0])
      document.documentElement.setAttribute('data-theme', themes[0]) // تنظیم تم پیش‌فرض در <html>
    }
  }, [themes]) // تنها زمانی که آرایه تم‌ها تغییر کند، این effect اجرا می‌شود

  // تابعی برای تغییر تم و ذخیره آن در localStorage
  const setNewTheme = (newTheme) => {
    if (themes.includes(newTheme)) {
      // اگر تم جدید در لیست تم‌ها باشد، آن را تنظیم و ذخیره می‌کنیم
      setTheme(newTheme)
      document.documentElement.setAttribute('data-theme', newTheme) // اعمال تم جدید در <html>
      localStorage.setItem('theme', newTheme) // ذخیره تم در localStorage
    }
  }

  return (
    // استفاده از ThemeContext.Provider برای فراهم کردن تم و تابع تغییر آن به سایر کامپوننت‌ها
    <ThemeContext.Provider value={{ theme, themes, setNewTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// هوک سفارشی برای استفاده از ThemeContext در کامپوننت‌ها
export const useTheme = () => useContext(ThemeContext)
