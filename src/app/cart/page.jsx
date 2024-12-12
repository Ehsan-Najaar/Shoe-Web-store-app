'use client'

import CartLeftSection from '@/components/Cart/CartLeftSection'
import CartRightSection from '@/components/Cart/CartRightSection'
import EmptyCart from '@/components/Cart/EmptyCart'
import { useEffect, useState } from 'react'

export default function Cart() {
  const [cartItems, setCartItems] = useState([]) // نگهداری لیست آیتم‌های سبد خرید

  // بارگذاری داده‌های سبد خرید از localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'))

    if (savedCart && typeof savedCart === 'object') {
      // فیلتر کردن آیتم‌های معتبر در سبد خرید
      const validItems = Object.values(savedCart).filter(
        (item) => item && item.id && item.price && item.quantity
      )
      setCartItems(validItems)

      // ذخیره‌سازی سبد خرید تمیز شده در localStorage
      const cleanedCart = validItems.reduce((acc, item) => {
        acc[item.id] = item
        return acc
      }, {})
      localStorage.setItem('cart', JSON.stringify(cleanedCart))
    } else {
      setCartItems([]) // در صورت عدم وجود سبد خرید، آن را خالی می‌کند
      localStorage.removeItem('cart') // پاکسازی سبد خرید در localStorage
    }
  }, [])

  // محاسبه مجموع تعداد اقلام در سبد خرید
  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  )

  // حذف یک آیتم از سبد خرید
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  // بروزرسانی تعداد یک آیتم در سبد خرید
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return // جلوگیری از کاهش تعداد به کمتر از 1
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  // محاسبه مبلغ کل سبد خرید (Subtotal)
  const cartSubtotal = cartItems.reduce((total, item) => {
    return total + (item.price || 0) * (item.quantity || 0)
  }, 0)

  // فرمت کردن مبلغ به صورت تومان
  const formattedSubtotal = new Intl.NumberFormat('fa-IR').format(cartSubtotal)

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-12 my-12 px-4 lg:px-24">
      {cartItems.length !== 0 ? (
        <>
          <CartRightSection
            cartItems={cartItems}
            totalQuantity={totalQuantity}
            handleRemove={handleRemove}
            handleUpdateQuantity={handleUpdateQuantity}
          />
          <CartLeftSection
            formattedSubtotal={formattedSubtotal}
            cartItems={cartItems}
          />
        </>
      ) : (
        <EmptyCart /> // نمایش کامپوننت خالی بودن سبد خرید
      )}
    </div>
  )
}
