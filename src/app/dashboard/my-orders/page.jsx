'use client'

import DashboardMenu from '@/components/DashboardMenu'
import OrderCard from '@/components/OrderCard'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiChevronLeft } from 'react-icons/fi'

export default function MyOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // بارگذاری سفارشات از localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || []

    console.log('Loaded Orders from LocalStorage:', savedOrders) // چاپ داده‌ها برای بررسی

    // حذف سفارشات تکراری (بر اساس id یا هر ویژگی یکتای دیگر)
    const uniqueOrders = savedOrders.filter(
      (order, index, self) => index === self.findIndex((o) => o.id === order.id)
    )

    console.log('Unique Orders:', uniqueOrders) // چاپ سفارشات یکتا

    // به‌روزرسانی state با سفارشات یکتا
    setOrders(uniqueOrders)
  }, [])

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-6 px-4 md:px-12 lg:px-16 xl:px-24 py-4 md:py-6 lg:py-10 xl:py-12">
      {/* هدر موبایل */}
      <div className="lg:hidden flex items-center justify-between bg-neutral rounded-lg shadow-lg shadow-gray-700  p-2">
        <h2 className="text-xl font-bold">سفارشات من</h2>
        <Link href="/dashboard">
          <FiChevronLeft size={40} className="cursor-pointer" />
        </Link>
      </div>

      {/* Sidebar Menu */}
      <div className="lg:w-1/4 hidden lg:block">
        <DashboardMenu activeIndex={1} />
      </div>

      {/* Left Section */}
      <div className="lg:w-3/4 max-h-[536px] bg-neutral shadow-lg shadow-gray-700 rounded-3xl p-4 overflow-auto">
        {/* نمایش پیام یا کارت سفارشات */}
        {orders.length === 0 ? (
          <p className="min-h-full grid place-items-center text-gray-600">
            هیچ سفارشی موجود نمی باشد.
          </p>
        ) : (
          orders.map((order, index) => (
            <OrderCard key={index} order={order} /> // نمایش کارت برای هر سفارش
          ))
        )}
      </div>
    </div>
  )
}
