'use client'

import CartSummary from '@/components/Cart/CartSummary'
import StepProgress from '@/components/Cart/StepProgress'
import { useState } from 'react'

function Payment({ cartSubtotal }) {
  // محاسبه تخفیف 10 درصد
  const savings = cartSubtotal * 0.1 // 10% تخفیف
  const pickupCost = 20000 // هزینه ثابت تحویل حضوری (تومان)
  const tax = cartSubtotal * 0.09 // 9% مالیات
  const total = cartSubtotal - savings + pickupCost + tax // محاسبه مجموع مبلغ

  // استیت کد تخفیف و روش پرداخت
  const [discountCode, setDiscountCode] = useState('') // استیت برای ذخیره کد تخفیف
  const [paymentMethod, setPaymentMethod] = useState('') // استیت برای ذخیره روش پرداخت

  // تغییر کد تخفیف
  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value)
  }

  // تغییر روش پرداخت
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value)
  }

  // فرمت کردن مبلغ به تومان
  const formatCurrency = (value) => {
    return `${new Intl.NumberFormat('fa-IR').format(value)} تومان`
  }

  return (
    <section className="min-h-screen py-12 px-4 md:px-12 lg:px-16 xl:px-24">
      {/* نمایش نوار پیشرفت */}
      <StepProgress />

      <div className="flex flex-col lg:flex-row gap-12 my-8">
        {/* بخش راست */}
        <section className="lg:w-2/3 space-y-6">
          {/* انتخاب روش پرداخت */}
          <div className="rounded-lg shadow-lg bg-neutral p-6 space-y-4">
            <h3 className="text-2xl font-semibold text-dark">روش پرداخت</h3>
            <div className="space-y-2">
              {/* انتخاب روش کارت اعتباری */}
              <label className="w-max flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="radio"
                  name="payment-method"
                  value="credit-card"
                  checked={paymentMethod === 'credit-card'}
                  onChange={handlePaymentMethodChange}
                  className="checkbox-custom"
                />
                <span>کارت اعتباری</span>
              </label>
              {/* انتخاب روش پی پال */}
              <label className="w-max flex items-center gap-2 text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="payment-method"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={handlePaymentMethodChange}
                  className="checkbox-custom"
                />
                <span>پی پال</span>
              </label>
              {/* انتخاب روش پرداخت در محل */}
              <label className="w-max flex items-center gap-2 text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="payment-method"
                  value="cash-on-delivery"
                  checked={paymentMethod === 'cash-on-delivery'}
                  onChange={handlePaymentMethodChange}
                  className="checkbox-custom"
                />
                <span>پرداخت در محل</span>
              </label>
            </div>
          </div>

          {/* بخش کد تخفیف */}
          <div className="rounded-lg shadow-lg bg-neutral p-6 space-y-4">
            <h3 className="text-2xl font-semibold text-dark">کد تخفیف</h3>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={discountCode}
                onChange={handleDiscountCodeChange} // تغییر کد تخفیف
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark"
                placeholder="کد تخفیف را وارد کنید"
              />
              <button className="bg-dark text-neutral py-2 px-4 rounded-lg hover:bg-primary transition-all duration-300">
                اعمال
              </button>
            </div>
          </div>
        </section>

        {/* بخش چپ */}
        <section className="lg:w-1/3">
          {/* خلاصه سبد خرید */}
          <CartSummary />
        </section>
      </div>
    </section>
  )
}

export default Payment
