'use client'

import DashboardMenu from '@/components/DashboardMenu'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function Dashboard() {
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      // اگر عرض صفحه بیشتر از 1024px باشد و مسیر جاری داشبورد باشد
      if (window.innerWidth > 1024 && pathname === '/dashboard') {
        // ریدایرکت به صفحه ویرایش حساب
        window.location.replace('/dashboard/edit-account')
      }
    }

    // بررسی وضعیت صفحه در هنگام بارگذاری اولیه
    handleResize()

    // افزودن لیسنر برای تغییر اندازه پنجره
    window.addEventListener('resize', handleResize)

    // پاکسازی لیسنر هنگام ترک کامپوننت
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [pathname]) // وابسته به تغییر مسیر

  return (
    <div className="px-4 md:px-12 pb-16 pt-4">
      {/* منوی داشبورد */}
      <DashboardMenu />
    </div>
  )
}
