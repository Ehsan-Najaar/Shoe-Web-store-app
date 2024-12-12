'use client'

import { ProductCard5 } from '@/components/productCard'
import { useEffect, useState } from 'react'

export default function OrderCard() {
  const [orders, setOrders] = useState([]) // ذخیره لیست سفارشات
  const [isPopupOpen, setIsPopupOpen] = useState(false) // برای مدیریت وضعیت پاپ‌آپ
  const [currentOrder, setCurrentOrder] = useState(null) // ذخیره سفارش جاری برای نمایش محصولات
  const [savedAddress, setSavedAddress] = useState({}) // ذخیره آدرس از localStorage

  // بارگذاری سفارشات و آدرس از localStorage هنگام بارگذاری کامپوننت
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [] // بارگذاری سفارشات از localStorage
    const storedAddress = JSON.parse(localStorage.getItem('address')) || {} // بارگذاری آدرس از localStorage
    setOrders(storedOrders) // به‌روزرسانی state با سفارشات
    setSavedAddress(storedAddress) // به‌روزرسانی state با آدرس
  }, [])

  // باز کردن پاپ‌آپ برای نمایش تمامی محصولات
  const handleOpenPopup = (order) => {
    setCurrentOrder(order) // ذخیره سفارش جاری
    setIsPopupOpen(true) // باز کردن پاپ‌آپ
  }

  // بستن پاپ‌آپ
  const handleClosePopup = () => {
    setIsPopupOpen(false) // بستن پاپ‌آپ
    setCurrentOrder(null) // پاک کردن سفارش جاری
  }

  // نمایش کارت‌های سفارشات
  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <p>هیچ سفارشی یافت نشد.</p> // اگر سفارشی وجود نداشته باشد
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row justify-between p-4 rounded-lg border border-gray-300 shadow-sm shadow-gray-300"
          >
            {/* بخش سمت راست: اطلاعات سفارش */}
            <section className="lg:w-[55%] space-y-3">
              <h3 className="font-bold text-xl text-accent">
                سفارش شماره {index + 1}
              </h3>
              {/* تاریخ سفارش */}
              <div>
                <span className="font-semibold">تاریخ سفارش:</span>{' '}
                {new Date(order.orderDate).toLocaleDateString('fa-IR')}
              </div>

              {/* تاریخ تحویل */}
              <div>
                <span className="font-semibold">تاریخ تحویل:</span>{' '}
                {new Date(order.deliveryDate).toLocaleDateString('fa-IR')}
              </div>

              {/* کد پیگیری */}
              <div>
                <span className="font-semibold">کد پیگیری:</span>{' '}
                {order.trackingCode}
              </div>

              {/* آدرس */}
              <div className="flex items-start sm:items-center gap-1">
                <span className="font-semibold">آدرس:</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <small>{savedAddress?.city || 'شهر موجود نیست'} ,</small>
                  <small>{savedAddress?.address || 'آدرس موجود نیست'} ,</small>
                  <small>
                    کد پستی :{savedAddress?.postalCode || 'کد پستی موجود نیست'}
                  </small>
                </div>
              </div>

              {/* نمایش مجموع قیمت سفارش به تومان */}
              <div>
                <span className="font-semibold">مجموع پرداختی:</span>{' '}
                {new Intl.NumberFormat('fa-IR').format(order.totalAmount)} تومان
              </div>
            </section>

            {/* نمایش محصولات */}
            <section className="lg:w-[45%]">
              <h4 className="font-semibold"></h4>
              <ul className="grid grid-cols-1 gap-6">
                {order.products.slice(0, 1).map((product) => (
                  <ProductCard5 key={product.id} product={product} />
                ))}
              </ul>
              {order.products.length > 1 && (
                <button
                  onClick={() => handleOpenPopup(order)} // باز کردن پاپ‌آپ برای نمایش محصولات بیشتر
                  className="w-full mt-6 bg-dark text-neutral py-2 px-4 rounded-lg hover:bg-primary transition-all duration-150 flex items-center justify-center gap-2"
                >
                  <span>+{order.products.length - 1} محصول دیگر</span>
                </button>
              )}
            </section>
          </div>
        ))
      )}

      {/* پاپ‌آپ نمایش محصولات */}
      {isPopupOpen && currentOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          style={{ margin: 0 }}
        >
          <div className="bg-white p-6 rounded-lg w-96">
            <h4 className="font-semibold text-xl mb-4">
              محصولات سفارش شماره {orders.indexOf(currentOrder) + 1}
            </h4>
            <ul className="space-y-4 max-h-64 p-2 overflow-auto">
              {currentOrder.products.map((product) => (
                <ProductCard5 key={product.id} product={product} />
              ))}
            </ul>
            <button
              onClick={handleClosePopup} // بستن پاپ‌آپ
              className="mt-4 w-full py-2 bg-dark text-neutral rounded-lg"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
