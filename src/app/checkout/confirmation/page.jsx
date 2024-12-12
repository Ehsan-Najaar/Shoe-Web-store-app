'use client'

import StepProgress from '@/components/Cart/StepProgress'
import { ProductCard5 } from '@/components/productCard'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Confirmation() {
  const [cartItems, setCartItems] = useState([]) // لیست محصولات سبد خرید
  const [totalAmount, setTotalAmount] = useState(0) // مبلغ کل سبد خرید
  const [address, setAddress] = useState({}) // آدرس تحویل
  const [deliveryDate, setDeliveryDate] = useState('') // تاریخ تحویل
  const [trackingNumber, setTrackingNumber] = useState('') // کد پیگیری
  const [lastOrder, setLastOrder] = useState(null)

  // بارگذاری اطلاعات از localStorage
  useEffect(() => {
    // بارگذاری محصولات سبد خرید از localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart'))
    if (savedCart && Array.isArray(savedCart)) {
      const validItems = savedCart.filter(
        (item) => item && item.id && item.price && item.quantity
      )
      setCartItems(validItems)

      // محاسبه مبلغ کل سبد خرید
      const total = validItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      setTotalAmount(total)
    }

    // بارگذاری آدرس تحویل از localStorage
    const savedAddress = JSON.parse(localStorage.getItem('address')) || {
      address: 'آدرسی وارد نشده است',
      postalCode: '-',
      city: '-',
    }
    setAddress(savedAddress)

    // بارگذاری تاریخ تحویل از localStorage
    const savedDeliveryDate =
      localStorage.getItem('deliveryDate') || 'تاریخ تحویلی انتخاب نشده است'
    setDeliveryDate(savedDeliveryDate)

    // بارگذاری کد پیگیری از localStorage
    const savedTrackingNumber =
      localStorage.getItem('trackingNumber') || 'ABC123XYZ'
    setTrackingNumber(savedTrackingNumber)
  }, [])

  // بارگذاری آخرین سفارش از localStorage
  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders')) || []

    if (orders.length > 0) {
      // گرفتن آخرین سفارش
      const latestOrder = orders[orders.length - 1]
      setLastOrder(latestOrder)
    }
  }, [])

  // فرمت کردن تاریخ به فرمت شمسی
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fa-IR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-12 lg:px-16 xl:px-24 space-y-8">
      <StepProgress />

      {/* بخش تایید سفارش */}
      <div className="mx-auto bg-neutral p-6 rounded-lg shadow-lg space-y-8">
        {/* پیام تشکر */}
        <div>
          <h1 className="text-3xl font-bold text-dark">
            از خرید شما سپاسگزاریم!
          </h1>
          <p className="mt-4 text-gray-600">سفارش شما با موفقیت ثبت شد.</p>
        </div>

        {/* جزئیات سفارش */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* آدرس تحویل */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-dark">آدرس تحویل</h2>
            <p className="text-gray-700">{address.address}</p>
            <p className="text-gray-700">کد پستی: {address.postalCode}</p>
            <p className="text-gray-700">شهر: {address.city}</p>
          </div>

          {/* تاریخ تحویل */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-dark">روز تحویل</h2>
            <p className="text-gray-700">{formatDate(deliveryDate)}</p>
          </div>
        </div>

        {/* خلاصه سفارش */}
        {lastOrder && (
          <div className="p-6 bg-white shadow-lg rounded-lg mt-8">
            <h2 className="text-xl font-bold mb-4">خلاصه سفارش</h2>

            <div className="space-y-4">
              {lastOrder.products.map((item) => (
                <ProductCard5 key={item.id} product={item} />
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between mb-2">
                <span>تاریخ سفارش:</span>
                <span>
                  {new Date(lastOrder.orderDate).toLocaleDateString('fa-IR')}
                </span>
              </div>
              {/* کد پیگیری سفارش */}
              <div className="flex justify-between">
                <span>کد پیگیری سفارش</span>
                <span>{lastOrder.trackingCode}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>مجموع پرداختی:</span>
                <span>
                  {new Intl.NumberFormat('fa-IR').format(lastOrder.totalAmount)}{' '}
                  تومان
                </span>
              </div>
            </div>
          </div>
        )}

        {/* دکمه بازگشت */}
        <div className="mt-8 text-center">
          <Link
            href={'/'}
            className="px-6 py-3 bg-primary text-neutral rounded-lg transition hover:bg-primary-dark"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  )
}
