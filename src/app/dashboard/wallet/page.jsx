'use client'

import DashboardMenu from '@/components/DashboardMenu'
import Link from 'next/link'
import { useState } from 'react'
import { FiChevronLeft } from 'react-icons/fi'

// داده‌های تراکنش‌ها
const transactions = [
  { id: 1, description: 'واریز پول به کیف پول', amount: 20000 },
  { id: 2, description: 'شارژ کیف پول', amount: 5000 },
  { id: 3, description: 'شارژ کیف پول', amount: 15000 },
  { id: 4, description: 'شارژ کیف پول', amount: 30000 },
]

export default function Wallet() {
  const currentBalance = 50000 // موجودی فعلی کیف پول
  const [selectedTransaction, setSelectedTransaction] = useState(
    transactions[0]
  ) // مقدار پیش‌فرض: اولین تراکنش

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-6 px-4 md:px-12 lg:px-16 xl:px-24 py-4 md:py-6 lg:py-10 xl:py-12">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between">
        <h2 className="text-xl font-bold">کیف پول</h2>
        <Link href="/dashboard">
          <FiChevronLeft className="w-12 h-12 bg-MyGray rounded-full p-2 cursor-pointer" />
        </Link>
      </div>

      {/* Sidebar برای دسکتاپ */}
      <div className="lg:w-1/4 hidden lg:block">
        <DashboardMenu activeIndex={3} />
      </div>

      {/* بخش اصلی کیف پول */}
      <div className="lg:w-3/4 max-h-[536px] bg-neutral shadow-lg shadow-gray-700 text-dark rounded-3xl p-4">
        <h3 className="text-xl font-bold mb-6">موجودی کیف پول</h3>
        <p className="text-lg mb-4">
          موجودی فعلی: {currentBalance.toLocaleString()} تومان
        </p>

        {/* لیست تراکنش‌ها */}
        <div className="grid grid-cols-1 gap-6">
          {transactions.map((transaction) => (
            <label
              key={transaction.id}
              className={`p-4 rounded-lg cursor-pointer flex justify-between items-center shadow-sm shadow-background md:hover:mr-4 transition-all duration-300 ${
                selectedTransaction?.id === transaction.id
                  ? 'bg-dark shadow-none text-neutral' // استایل برای انتخاب تراکنش
                  : ''
              }`}
            >
              <div className="flex items-center gap-2">
                {/* دکمه رادیویی برای انتخاب تراکنش */}
                <input
                  type="radio"
                  name="transaction"
                  value={transaction.id}
                  checked={selectedTransaction?.id === transaction.id}
                  onChange={() => setSelectedTransaction(transaction)} // تغییر انتخاب تراکنش
                  className="accent-secondary"
                />
                <span className="text-lg">{transaction.description}</span>
              </div>
              <span className="text-lg font-semibold">
                {transaction.amount.toLocaleString()} تومان
              </span>
            </label>
          ))}
        </div>

        {/* دکمه شارژ کیف پول */}
        <button className="bg-accent py-2 px-4 rounded-lg text-neutral mt-6 w-full md:w-max">
          شارژ کیف پول
        </button>
      </div>
    </div>
  )
}
