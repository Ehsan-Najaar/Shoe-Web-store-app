'use client'

import AddressPopup from '@/components/Cart/AddressPopup'
import CartSummary from '@/components/Cart/CartSummary'
import StepProgress from '@/components/Cart/StepProgress'
import { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdDeliveryDining } from 'react-icons/md'

export default function Delivery() {
  const [isPopupOpen, setIsPopupOpen] = useState(false) // وضعیت باز بودن پاپ‌آپ ویرایش آدرس
  const [address, setAddress] = useState({
    address: '',
    postalCode: '',
    city: '',
  }) // اطلاعات آدرس
  const [cartItems, setCartItems] = useState([]) // لیست محصولات سبد خرید
  const [cartSubtotal, setCartSubtotal] = useState(0) // مجموع مبلغ سبد خرید
  const [deliveryDate, setDeliveryDate] = useState(null) // تاریخ تحویل انتخابی
  const [deliveryDates, setDeliveryDates] = useState([]) // لیست تاریخ‌های قابل انتخاب برای تحویل

  // بارگذاری داده‌ها از localStorage
  useEffect(() => {
    // بارگذاری سبد خرید
    const savedCart = JSON.parse(localStorage.getItem('cart'))
    // بارگذاری آدرس
    const savedAddress = JSON.parse(localStorage.getItem('address'))
    // بارگذاری تاریخ تحویل
    const savedDeliveryDate = localStorage.getItem('deliveryDate')

    // بررسی و تنظیم سبد خرید
    if (savedCart && Array.isArray(savedCart)) {
      setCartItems(savedCart)
      const subtotal = savedCart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
      setCartSubtotal(subtotal) // محاسبه مجموع مبلغ سبد خرید
    }

    // بررسی و تنظیم آدرس
    if (savedAddress && typeof savedAddress === 'object') {
      setAddress(savedAddress)
    }

    // بررسی و تنظیم تاریخ تحویل
    if (savedDeliveryDate) {
      setDeliveryDate(savedDeliveryDate)
    }

    // تولید تاریخ‌های قابل انتخاب برای تحویل
    const today = new Date()
    today.setDate(today.getDate() + 3) // شروع از 3 روز بعد
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      return {
        value: date.toISOString().split('T')[0], // تاریخ به فرمت YYYY-MM-DD
        label: date.toLocaleDateString('fa-IR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        }),
      }
    })
    setDeliveryDates(dates) // تنظیم تاریخ‌ها
  }, [])

  // ذخیره تاریخ تحویل انتخابی در localStorage
  const handleDeliveryDateChange = (date) => {
    setDeliveryDate(date)
    localStorage.setItem('deliveryDate', date)
  }

  // ذخیره آدرس جدید در localStorage
  const handleSaveAddress = (newAddress) => {
    setAddress(newAddress)
    localStorage.setItem('address', JSON.stringify(newAddress))
    setIsPopupOpen(false) // بستن پاپ‌آپ پس از ذخیره آدرس
  }

  return (
    <div className="min-h-screen py-12 px-6 md:px-24">
      {/* نمایش نوار پیشرفت */}
      <StepProgress />

      <div className="flex flex-col lg:flex-row gap-12 my-8">
        {/* بخش راست */}
        <section className="lg:w-2/3 space-y-6">
          {/* آدرس تحویل */}
          <div className="bg-neutral p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-dark">
              <MdDeliveryDining />
              آدرس تحویل
            </h2>
            <div className="space-y-1">
              <p className="text-gray-600">
                {address.address || 'آدرسی ذخیره نشده است'}
              </p>
              <p className="text-gray-600">
                کد پستی: {address.postalCode || '-'}
              </p>
              <p className="text-gray-600">شهر: {address.city || '-'}</p>
            </div>
            <button
              onClick={() => setIsPopupOpen(true)} // باز کردن پاپ‌آپ برای ویرایش آدرس
              className="flex items-center gap-2 bg-dark text-neutral py-2 px-4 rounded-lg"
            >
              <FiEdit />
              <span>ویرایش آدرس</span>
            </button>
          </div>

          {/* روش‌های تحویل */}
          <div className="bg-neutral p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold text-dark">روش‌های تحویل</h2>
            <div className="space-y-4">
              <label className="w-max flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  className="checkbox-custom"
                />
                <span>تحویل استاندارد (رایگان)</span>
              </label>
              <label className="w-max flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  className="checkbox-custom"
                />
                <span>تحویل سریع (۲۰,۰۰۰ تومان)</span>
              </label>
            </div>
          </div>

          {/* انتخاب روز تحویل */}
          <div className="bg-neutral p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold text-dark">
              انتخاب روز تحویل
            </h2>
            <div className="grid place-items-center grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
              {deliveryDates.map((date) => (
                <button
                  key={date.value}
                  onClick={() => handleDeliveryDateChange(date.value)} // تغییر تاریخ تحویل
                  className={`flex flex-col items-center justify-center w-24 h-24 border rounded-lg p-2 ${
                    deliveryDate === date.value
                      ? 'bg-dark text-neutral'
                      : 'border-gray-300 bg-white text-dark'
                  }`}
                >
                  <span className="text-lg font-semibold">{date.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* بخش چپ */}
        <section className="lg:w-1/3">
          <CartSummary />
        </section>
      </div>

      {/* پاپ آپ ویرایش آدرس */}
      <AddressPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)} // بستن پاپ‌آپ
        onSave={handleSaveAddress} // ذخیره آدرس جدید
        addressData={address} // ارسال اطلاعات آدرس به پاپ‌آپ
      />
    </div>
  )
}
