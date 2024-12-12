'use client'

import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { FiChevronRight, FiX } from 'react-icons/fi'

// تعریف یک آرایه از تم‌ها
const themes = Array.from({ length: 20 }, (_, i) => `theme${i + 1}`)

// این تابع برای به‌دست آوردن رنگ‌های پیش‌نمایش هر تم استفاده می‌شود
const getThemePreviewColors = (theme) => {
  if (typeof window !== 'undefined') {
    // ایجاد یک عنصر موقتی برای اعمال تم
    const tempElement = document.createElement('div')
    tempElement.setAttribute('data-theme', theme)
    tempElement.style.display = 'none'
    document.body.appendChild(tempElement)

    // دریافت استایل‌های تم از طریق getComputedStyle
    const computedStyles = getComputedStyle(tempElement)
    const primary =
      computedStyles.getPropertyValue('--primary')?.trim() || '#000'
    const secondary =
      computedStyles.getPropertyValue('--secondary')?.trim() || '#000'
    const accent = computedStyles.getPropertyValue('--accent')?.trim() || '#000'

    // حذف عنصر موقتی
    document.body.removeChild(tempElement)
    return { primary, secondary, accent }
  }
  return { primary: '#000', secondary: '#000', accent: '#000' }
}

const ThemeDrawer = () => {
  // تعریف state‌ها برای تم جاری، وضعیت Drawer و رنگ‌های تم‌ها
  const [currentTheme, setCurrentTheme] = useState('theme1')
  const [isOpen, setIsOpen] = useState(false)
  const [themeColors, setThemeColors] = useState({})

  // ذخیره‌سازی تم انتخاب شده در localStorage
  const saveThemeToLocalStorage = useCallback((theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }, [])

  // بارگذاری تم از localStorage هنگام بارگذاری صفحه
  const loadThemeFromLocalStorage = useCallback(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        setCurrentTheme(savedTheme)
        document.documentElement.setAttribute('data-theme', savedTheme)
      } else {
        setCurrentTheme('theme1')
        document.documentElement.setAttribute('data-theme', 'theme1')
      }
    }
  }, [])

  // استفاده از useEffect برای بارگذاری تم‌ها از localStorage و پیش‌نمایش رنگ‌ها
  useEffect(() => {
    loadThemeFromLocalStorage()

    // پیش‌بارگذاری رنگ‌های تمام تم‌ها
    const allColors = {}
    themes.forEach((theme) => {
      allColors[theme] = getThemePreviewColors(theme)
    })
    setThemeColors(allColors)
  }, [loadThemeFromLocalStorage])

  // تابع تغییر تم با ذخیره آن در localStorage
  const handleThemeChange = (theme) => {
    setCurrentTheme(theme)
    document.documentElement.setAttribute('data-theme', theme)
    saveThemeToLocalStorage(theme)
  }

  return (
    <div>
      {/* Drawer برای انتخاب تم */}
      <motion.div
        id="drawer-example"
        className="fixed lg:bottom-0 bottom-16 left-0 z-40 h-2/4 p-4 bg-dark rounded-lg rounded-bl-none"
        tabIndex="-1"
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? '0%' : '-100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <p className="mb-6 text-sm text-center text-neutral">
          تم مورد علاقتون رو انتخاب کنید
        </p>

        {/* لیست تم‌ها */}
        <div className="grid grid-cols-2 gap-4 p-4 max-h-[300px] overflow-auto">
          {themes.map((theme, index) => {
            // رنگ‌های پیش‌نمایش هر تم
            const themePreviewColors = themeColors[theme] || {
              primary: '#000',
              secondary: '#000',
              accent: '#000',
            }

            return (
              <div
                key={index}
                onClick={() => handleThemeChange(theme)} // تغییر تم
                className={`flex items-center justify-between px-4 py-2 rounded-lg hover:bg-accent cursor-pointer ${
                  theme === currentTheme ? 'font-bold bg-neutral-300' : ''
                }`}
              >
                <span className="capitalize text-neutral">
                  تم {theme.slice(5, 7)} {/* نمایش شماره تم */}
                </span>
                {/* پیش‌نمایش رنگ‌های تم */}
                <div className="flex items-center gap-1">
                  <div
                    className="w-3 h-6 rounded-full border"
                    style={{
                      backgroundColor: themePreviewColors.primary,
                    }}
                  ></div>
                  <div
                    className="w-3 h-6 rounded-full border"
                    style={{
                      backgroundColor: themePreviewColors.secondary,
                    }}
                  ></div>
                  <div
                    className="w-3 h-6 rounded-full border"
                    style={{
                      backgroundColor: themePreviewColors.accent,
                    }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* دکمه باز و بسته کردن Drawer */}
      <button
        className={`fixed lg:top-1/2 top-[42%] ${
          isOpen ? 'left-72 rounded-full p-2' : '-left-1 rounded-lg py-3 px-1'
        } transform -translate-y-1/2 bg-dark opacity-60 lg:opacity-100 text-neutral shadow-lg z-40 transition-all duration-700 ease-in-out`}
        type="button"
        onClick={() => setIsOpen(!isOpen)} // باز و بسته کردن Drawer
      >
        {isOpen ? <FiX size={24} /> : <FiChevronRight size={24} />}
      </button>
    </div>
  )
}

export default ThemeDrawer
