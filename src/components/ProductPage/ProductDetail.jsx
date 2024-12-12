'use client'

import SweetAlert from '@/components/SweetAlert'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import {
  FiCheck,
  FiChevronLeft,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingCart,
} from 'react-icons/fi'

export default function ProductDetail({ product }) {
  // اگر تصاویر محصول موجود نبود، یک تصویر پیش‌فرض قرار می‌گیرد
  const images =
    product?.images?.length > 0 ? product.images : ['/default-image.png']

  // وضعیت برای مدیریت تصویر انتخاب‌شده
  const [selectedImage, setSelectedImage] = useState(images[0])

  // تعداد محصول انتخاب‌شده
  const [productNumber, setProductNumber] = useState(1)

  // وضعیت برای بررسی اینکه آیا محصول در سبد خرید است یا خیر
  const [isInCart, setIsInCart] = useState(false)

  // سایز انتخاب‌شده (اولین سایز به عنوان پیش‌فرض)
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null)

  // رنگ انتخاب‌شده (اولین رنگ به عنوان پیش‌فرض)
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || null
  )

  // وضعیت برای نمایش SweetAlert
  const [alert, setAlert] = useState({
    isOpen: false,
    title: '',
    message: '',
  })

  // مدیریت حالت "پسندیدن" محصول
  const [isLiked, setIsLiked] = useState(false)

  // بارگذاری وضعیت علاقه‌مندی‌ها از localStorage
  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedProducts')) || []
    if (savedLikes.includes(product?.id)) {
      setIsLiked(true)
    }
  }, [product?.id])

  // تابع برای تغییر وضعیت پسندیدن محصول
  const toggleLike = useCallback(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedProducts')) || []
    let updatedLikes
    let message // پیام هشدار

    // اگر محصول قبلاً پسندیده شده، آن را از لیست حذف می‌کنیم
    if (isLiked) {
      updatedLikes = savedLikes.filter((id) => id !== product?.id)
      message = 'محصول از لیست علاقه‌مندی‌ها حذف شد.' // پیام برای حذف
    } else {
      updatedLikes = [...savedLikes, product?.id]
      message = 'محصول به لیست علاقه‌مندی‌ها اضافه شد.' // پیام برای افزودن
    }

    localStorage.setItem('likedProducts', JSON.stringify(updatedLikes))
    setIsLiked(!isLiked)

    // نمایش SweetAlert
    setAlert({
      isOpen: true,
      title: 'موفقیت',
      message,
    })
  }, [isLiked, product?.id])

  // بارگذاری وضعیت سبد خرید از localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || {}
    if (savedCart[product?.id]) {
      setIsInCart(true) // اگر محصول موجود باشد
    }
  }, [product?.id])

  // بررسی صحت اطلاعات محصول
  const isValidProduct = (product, selectedSize, selectedColor) => {
    return (
      product?.id &&
      product?.name &&
      product?.price &&
      product?.category &&
      selectedSize &&
      selectedColor &&
      product?.images?.[0]
    )
  }

  // به‌روزرسانی سبد خرید با مقدار جدید
  const updateCart = (quantity) => {
    if (!isValidProduct(product, selectedSize, selectedColor)) {
      console.error(
        'خطا: داده‌های محصول نامعتبر است یا برخی مقادیر خالی هستند.',
        {
          product,
          selectedSize,
          selectedColor,
        }
      )
      return
    }

    // جلوگیری از تنظیم تعداد کمتر از 1
    if (quantity < 1) {
      quantity = 1
    }

    const savedCart = JSON.parse(localStorage.getItem('cart')) || {}

    // حذف مقادیر null از آبجکت
    const removeNullFields = (obj) => {
      return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== null)
      )
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: product?.images?.[0], // تصویر محصول
    }

    // اعمال تابع حذف مقادیر null
    savedCart[product.id] = removeNullFields(cartItem)

    localStorage.setItem('cart', JSON.stringify(savedCart))
    setProductNumber(quantity) // به‌روزرسانی مقدار تعداد
    setIsInCart(true) // تغییر وضعیت دکمه به "در سبد موجود است"

    // نمایش SweetAlert
    setAlert({
      isOpen: true,
      title: 'محصول اضافه شد',
      message: `${product.name} به سبد خرید اضافه شد.`,
    })
  }

  // مدیریت تغییرات تعداد محصول در سبد خرید
  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, Number(e.target.value)) // اطمینان از مقدار بیشتر از صفر
    setProductNumber(newQuantity)
    updateCart(newQuantity)
  }

  // تغییر تصویر انتخاب‌شده با کلیک روی تصویر کوچک
  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  // ترجمه دسته‌بندی محصول
  const translateCategory = (category) => {
    switch (category) {
      case 'men':
        return 'کفش مردانه'
      case 'women':
        return 'کفش زنانه'
      case 'kids':
        return 'کفش بچه‌گانه'
      default:
        return category
    }
  }

  // محاسبه قیمت کل بر اساس تعداد انتخاب‌شده
  const calculateTotalPrice = () => product?.price * productNumber

  return (
    <div className="flex flex-col lg:flex-row lg:max-h-[600px] gap-4 lg:gap-0 overflow-hidden">
      {/* بخش گالری تصاویر محصول */}
      <div className="flex flex-col lg:flex-row-reverse gap-4">
        {/* نمایش تصویر بزرگ */}
        <div className="relative">
          <Image
            src={selectedImage}
            alt="تصویر محصول"
            width={1500}
            height={1500}
            className="h-auto rounded-r-lg object-cover"
          />
        </div>

        {/* تصاویر کوچک محصول */}
        <div className="flex lg:flex-col items-center justify-center lg:justify-start gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-20 h-20 cursor-pointer overflow-hidden rounded-lg border-2 border-transparent hover:border-gray-300"
              onClick={() => handleImageClick(image)}
            >
              <Image
                src={image}
                alt={`تصویر کوچک ${index}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* بخش اطلاعات محصول */}
      <div className="relative bg-neutral lg:py-12 lg:px-6 p-4 w-full flex flex-col justify-between rounded-l-lg">
        {/* مسیر صفحه (breadcrumb) */}
        <div className="flex items-center gap-2 text-gray-600">
          <small className="flex items-center gap-2">
            <Link
              href={'/'}
              className="cursor-pointer hover:text-accent transition-all duration-150"
            >
              خانه
            </Link>
            <FiChevronLeft />
          </small>
          <small className="flex items-center gap-2">
            <Link
              href={'/store'}
              className="cursor-pointer hover:text-accent transition-all duration-150"
            >
              فروشگاه
            </Link>
            <FiChevronLeft />
          </small>
          <small className="flex items-center gap-2">
            <Link
              href={`/store/${product?.category || 'default-category'}`}
              className="cursor-pointer hover:text-accent transition-all duration-150"
            >
              {translateCategory(product?.category || 'default-category')}
            </Link>
            <FiChevronLeft />
          </small>
        </div>

        {/* نمایش نام و امتیاز محصول */}
        <section>
          <h1 className="flex items-center gap-2 lg:text-3xl text-xl font-semibold text-gray-800 my-2">
            {translateCategory(product?.category || 'دسته‌بندی نامشخص')}
            <span>{product?.name || 'نام محصول'}</span>
          </h1>
          <div className="flex items-center gap-1 text-gray-600 font-thin">
            <small>امتیاز</small>
            (
            <FaStar size={14} className="text-[#FFD700] mb-1" />
            <small>{product?.rating || 'نامشخص'}</small>)
          </div>
        </section>

        {/* انتخاب سایز و رنگ */}
        <section className="space-y-6 mt-4">
          {/* انتخاب سایز */}
          <div className="mb-4">
            <label className="block text-lg text-gray-800 font-semibold mb-2">
              انتخاب سایز
            </label>
            <div className="flex items-center gap-3">
              {product?.sizes?.map((size) => (
                <span
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 grid place-items-center cursor-pointer p-3 rounded-full border border-dark hover:border-primary transition-all duration-300 ${
                    selectedSize === size
                      ? 'bg-dark text-neutral border-none hover:text-neutral' // استایل حالت فعال
                      : 'text-dark'
                  }`}
                >
                  {size}
                </span>
              )) || <p>سایزی برای این محصول موجود نیست.</p>}
            </div>
          </div>

          {/* انتخاب رنگ */}
          <div className="mb-6">
            <label className="block text-lg text-gray-800 font-semibold mb-2">
              انتخاب رنگ
            </label>
            <div className="flex items-center gap-3">
              {product?.colors?.map((color) => (
                <span
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-full p-1 cursor-pointer ${
                    selectedColor === color ? 'border-4 border-dark' : ''
                  }`}
                >
                  <p
                    style={{ backgroundColor: color }}
                    className={`w-6 h-6 rounded-full border border-dark`}
                  ></p>
                </span>
              )) || <p>رنگی برای این محصول وجود ندارد</p>}
            </div>
          </div>
        </section>

        {/* محاسبه قیمت، انتخاب تعداد و افزودن به سبد خرید */}
        <section className="flex items-end justify-between mt-4">
          <div className="text-gray-800">
            <span className="text-lg">قیمت</span>
            <p className="text-3xl font-semibold">
              {`${calculateTotalPrice().toLocaleString('fa-IR')} تومان`}
            </p>
          </div>

          {/* انتخاب تعداد */}
          <div className="hidden lg:flex flex-col items-center gap-4">
            {!isInCart ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    productNumber > 1 && setProductNumber(productNumber - 1)
                  }
                  className="w-10 h-10 grid place-items-center rounded-full border text-3xl font-bold border-dark text-dark hover:border-primary transition-all duration-75"
                >
                  <FiMinus />
                </button>
                <input
                  min="1"
                  value={productNumber}
                  onChange={handleQuantityChange}
                  className="w-24 text-center rounded-full bg-transparent focus:outline-none py-2 px-4 border border-dark text-dark"
                />
                <button
                  onClick={() => setProductNumber(productNumber + 1)}
                  className="w-10 h-10 grid place-items-center rounded-full border text-3xl font-bold border-dark text-dark hover:border-primary transition-all duration-75"
                >
                  <FiPlus />
                </button>
              </div>
            ) : (
              ''
            )}

            <button
              className={`flex items-center gap-2 py-4 px-8 rounded-lg ${
                isInCart
                  ? 'bg-gray-500 text-gray-100' // استایل حالت "در سبد موجود است"
                  : 'btn-primary'
              }`}
              onClick={() => !isInCart && updateCart(productNumber)} // فقط اگر محصول موجود نباشد
              disabled={isInCart} // غیرفعال کردن دکمه اگر در سبد باشد
            >
              {isInCart ? 'اضافه شد به سبد خرید' : 'افزودن به سبد خرید'}
              {isInCart ? <FiCheck size={18} /> : <FiShoppingCart size={18} />}
            </button>
          </div>
        </section>

        {/* دکمه افزودن به لیست علاقه‌مندی‌ها */}
        <button
          onClick={toggleLike}
          className="hidden lg:block absolute left-5 top-9 text-primary p-2 rounded-full"
        >
          {isLiked ? <FaHeart size={24} /> : <FiHeart size={24} />}
        </button>

        {/* حالت موبایل */}
        <section className="lg:hidden fixed bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-neutral p-2 rounded-full shadow-sm shadow-dark z-30">
          <button
            onClick={toggleLike}
            className="text-primary p-2 rounded-full"
          >
            {isLiked ? <FaHeart size={24} /> : <FiHeart size={24} />}
          </button>
          {!isInCart ? (
            <div className="flex items-center gap-3 pr-6 border-r border-dark">
              <button
                onClick={() =>
                  productNumber > 1 && setProductNumber(productNumber - 1)
                }
                className="w-10 h-10 grid place-items-center rounded-full border text-3xl font-bold border-dark text-dark hover:border-primary transition-all duration-75"
              >
                <FiMinus />
              </button>
              <input
                min="1"
                value={productNumber}
                onChange={handleQuantityChange}
                className="w-24 text-center rounded-full bg-transparent focus:outline-none py-2 px-4 border border-dark text-dark"
              />
              <button
                onClick={() => setProductNumber(productNumber + 1)}
                className="w-10 h-10 grid place-items-center rounded-full border text-3xl font-bold border-dark text-dark hover:border-primary transition-all duration-75"
              >
                <FiPlus />
              </button>
            </div>
          ) : (
            ''
          )}

          {/* اگر داخل سبد خرید بود نمایش داده نشود قیمت*/}
          {!isInCart && (
            <small className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-neutral px-4 pt-1 pb-0 rounded-full border-t border-dark text-dark text-nowrap">
              <small className="text-lg">قیمت</small>
              <small className="text-lg font-semibold">
                {`${calculateTotalPrice().toLocaleString('fa-IR')} تومان`}
              </small>
            </small>
          )}

          <button
            className={`flex items-center gap-2 py-3 px-5 rounded-full ${
              isInCart ? 'bg-gray-500 text-gray-100' : 'bg-accent text-neutral'
            }`}
            onClick={() => !isInCart && updateCart(productNumber)} // فقط اگر محصول موجود نباشد
            disabled={isInCart} // غیرفعال کردن دکمه اگر در سبد باشد
          >
            <span className="hidden lg:flex">
              {isInCart ? 'اضافه شد به سبد خرید' : 'افزودن به سبد خرید'}
            </span>
            {isInCart ? <FiCheck size={18} /> : <FiShoppingCart size={18} />}
          </button>
        </section>
      </div>

      {/* نمایش پیام هشدار در صورت نیاز */}
      {alert.isOpen && (
        <SweetAlert
          isOpen={alert.isOpen}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert({ ...alert, isOpen: false })}
        />
      )}
    </div>
  )
}
