import { ProductCard5 } from '@/components/productCard' // کارت محصول
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CartSummary() {
  const pathname = usePathname() // دریافت مسیر فعلی
  const currentRoat = pathname.split('/').pop() // استخراج بخش آخر مسیر

  const [cartItems, setCartItems] = useState([]) // مدیریت محصولات موجود در سبد خرید
  const [isPopupOpen, setIsPopupOpen] = useState(false) // مدیریت نمایش پاپ‌آپ

  // بارگذاری سبد خرید از localStorage هنگام بارگذاری صفحه
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'))

    if (savedCart && typeof savedCart === 'object') {
      // بررسی اعتبار محصولات ذخیره‌شده
      const validItems = Object.values(savedCart).filter(
        (item) => item && item.id && item.price && item.quantity
      )
      setCartItems(validItems)
    } else {
      setCartItems([]) // اگر سبد خالی یا نامعتبر باشد
    }
  }, [])

  // محاسبه جمع کل محصولات
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const discount = 450000 // مقدار تخفیف به تومان
  const cartTotal = cartSubtotal - discount // محاسبه مجموع پرداختی پس از تخفیف

  // نمایش دو محصول اول
  const visibleItems = cartItems.slice(0, 2)
  const hiddenItemsCount = cartItems.length - 2 // تعداد محصولات مخفی

  // محاسبه تعداد واقعی تمام محصولات
  const totalItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  // اجرای عملیات هنگام پرداخت
  const handlePayment = () => {
    if (currentRoat === 'payment') {
      // ذخیره سفارشات در localStorage
      const orders = JSON.parse(localStorage.getItem('orders')) || []

      const newOrder = {
        products: cartItems,
        orderDate: new Date().toISOString(),
        deliveryDate: localStorage.getItem('deliveryDate'),
        trackingCode: Math.random().toString(36).substr(2, 9), // کد پیگیری رندوم
        address: localStorage.getItem('address'),
        totalAmount: cartTotal, // اضافه کردن مجموع پرداختی
      }

      // اضافه کردن سفارش جدید به لیست سفارشات
      orders.push(newOrder)
      localStorage.setItem('orders', JSON.stringify(orders))

      // خالی کردن سبد خرید
      localStorage.removeItem('cart')
    }
  }

  return (
    <div className="p-6 bg-neutral shadow-lg rounded-lg">
      {/* عنوان خلاصه خرید */}
      <h2 className="text-xl font-bold mb-4">خلاصه خرید</h2>

      {/* تعداد محصولات واقعی موجود در سبد */}
      <p className="text-sm mb-6">{totalItemCount} محصول در سبد خرید شما.</p>

      {/* نمایش دو محصول اول */}
      <div className="space-y-4">
        {visibleItems.map((item) => (
          <ProductCard5 key={item.id} product={item} />
        ))}
      </div>

      {/* دکمه نمایش محصولات بیشتر */}
      {hiddenItemsCount > 0 && (
        <button
          className="w-full mt-4 py-2 px-4 bg-dark text-neutral rounded-lg"
          onClick={() => setIsPopupOpen(true)}
        >
          +{hiddenItemsCount} محصول بیشتر
        </button>
      )}

      {/* خلاصه قیمت‌ها */}
      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span>جمع کل سبد خرید</span>
          <span>
            {new Intl.NumberFormat('fa-IR').format(cartSubtotal)} تومان
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span>هزینه ارسال</span>
          <span>۳۰,۰۰۰ تومان</span>
        </div>
        <div className="flex justify-between mb-4 text-green-600">
          <span>تخفیف</span>
          <span>-{new Intl.NumberFormat('fa-IR').format(discount)} تومان</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>مجموع پرداختی</span>
          <span>{new Intl.NumberFormat('fa-IR').format(cartTotal)} تومان</span>
        </div>
      </div>

      {/* دکمه پرداخت */}
      <div className="mt-6">
        <Link
          href={`/checkout/${
            currentRoat === 'delivery' ? 'payment' : 'confirmation'
          }`}
          className="block text-center btn-primary"
          onClick={handlePayment} // اضافه کردن عملکرد پرداخته شدن
        >
          {currentRoat === 'delivery' ? 'ادامه پرداخت' : 'پرداخت'}
        </Link>
      </div>

      {/* پاپ‌آپ نمایش تمام محصولات */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            {/* عنوان پاپ‌آپ */}
            <h3 className="text-lg font-bold mb-4">تمام محصولات</h3>

            {/* لیست تمام محصولات */}
            <div className="space-y-4 max-h-64 p-2 overflow-y-auto">
              {cartItems.map((item) => (
                <ProductCard5 key={item.id} product={item} />
              ))}
            </div>

            {/* دکمه بستن پاپ‌آپ */}
            <button
              className="mt-4 w-full py-2 bg-dark text-neutral rounded-lg"
              onClick={() => setIsPopupOpen(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
