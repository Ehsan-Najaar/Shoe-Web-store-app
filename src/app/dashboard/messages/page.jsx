'use client'

import DashboardMenu from '@/components/DashboardMenu'
import Link from 'next/link'
import { FiChevronLeft } from 'react-icons/fi'

// لیست پیغام‌ها همراه با تاریخ
const messages = [
  { id: 1, text: 'بلک فرایدی فرا رسید!', date: '1403/07/01' },
  {
    id: 2,
    text: 'تخفیف 20% برای خرید ها بیش از 500 هزار تومان!',
    date: '1403/07/02',
  },
]

export default function Messages() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-6 px-4 md:px-12 lg:px-16 xl:px-24 py-4 md:py-6 lg:py-10 xl:py-12">
      {/* هدر موبایل */}
      <div className="lg:hidden flex items-center justify-between bg-neutral rounded-lg shadow-lg shadow-gray-700  p-2">
        <h2 className="text-xl font-bold">پیغام ها</h2>
        <Link href="/dashboard">
          <FiChevronLeft size={40} className="cursor-pointer" />
        </Link>
      </div>

      {/* منوی داشبورد برای نسخه‌های بزرگتر */}
      <div className="lg:w-1/4 hidden lg:block">
        <DashboardMenu activeIndex={4} />
      </div>

      {/* بخش نمایش پیغام‌ها */}
      <div className="lg:w-3/4 max-h-[536px] bg-neutral shadow-lg shadow-gray-700 text-dark rounded-3xl p-4">
        <h3 className="text-xl font-bold mb-4">پیغام‌های جدید</h3>
        <ul className="space-y-4">
          {/* حلقه برای نمایش پیغام‌ها */}
          {messages.map((message) => (
            <li
              key={message.id}
              className="p-4 shadow-sm shadow-background rounded-md"
            >
              <span>{message.text}</span>
              {/* نمایش تاریخ پیغام */}
              <div className="mt-2 text-sm text-gray-400">{message.date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
