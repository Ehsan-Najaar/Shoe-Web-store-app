'use client'

import BottomNavbar from '@/components/BottomNavbar' // اضافه کردن BottomNavbar
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import MobileHeader from '@/components/MobileHeader'
import ThemeDrawer from '@/components/ThemeDrawer '
import { useEffect, useState } from 'react'
import { ThemeProvider } from '../context/ThemeContext'

export default function Layout({ children }) {
  const [currentTheme, setCurrentTheme] = useState('light') // وضعیت تم فعلی (روشن یا تاریک)
  const [cartItemCount, setCartItemCount] = useState(0) // تعداد آیتم‌های سبد خرید

  // استفاده از useEffect برای به‌روزرسانی تعداد محصولات سبد خرید از localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) // دریافت اطلاعات سبد خرید از localStorage
    if (savedCart) {
      // محاسبه تعداد کل آیتم‌های سبد خرید
      const itemCount = Object.values(savedCart).reduce(
        (total, item) => total + (item.quantity || 0),
        0
      )
      setCartItemCount(itemCount) // ذخیره تعداد آیتم‌ها در state
    }
  }, [])

  return (
    <ThemeProvider>
      <main className="relative lg:pt-[88px] pt-16 pb-36 md:pb-0">
        {/* هدر برای دسکتاپ و موبایل */}
        <Header />
        <MobileHeader />
        {/* انتخاب تم از طریق دراور */}
        <ThemeDrawer setTheme={setCurrentTheme} />
        {/* محتوای صفحه (به صورت children) در اینجا نمایش داده می‌شود */}
        {children}
        <Footer />
        {/* اضافه کردن Bottom Navbar که شامل تعداد آیتم‌های سبد خرید است */}
        <BottomNavbar cartItemCount={cartItemCount} />
      </main>
    </ThemeProvider>
  )
}
