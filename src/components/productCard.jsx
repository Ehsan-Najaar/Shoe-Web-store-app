import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart, FaStar, FaTrashAlt } from 'react-icons/fa'
import { FiCheck, FiMinus, FiPlus } from 'react-icons/fi'
import { HiOutlineShoppingBag } from 'react-icons/hi'

// کارت محصول شماره 1
export function ProductCard1({ product }) {
  // حالت برای نگهداری تصویر اصلی
  const [mainImage, setMainImage] = useState(product.images[0])

  // به‌روزرسانی تصویر اصلی در صورت تغییر محصول
  useEffect(() => {
    setMainImage(product.images[0])
  }, [product])

  return (
    <Link
      href={`/store/${product.category}/product/${product.id}`} // لینک به صفحه محصول
      className="relative group w-64 h-max shadow-lg bg-neutral rounded-xl overflow-hidden cursor-pointer scale-[70%] lg:scale-100"
    >
      {/* تصویر اصلی محصول */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={mainImage} // نمایش تصویر اصلی
          alt={product.name}
          fill
          priority
          className="transition-all duration-300 object-cover"
        />
      </div>

      {/* اطلاعات محصول */}
      <div className="bg-neutral p-4 rounded-b-lg space-y-2 lg:group-hover:opacity-0 group-hover:pointer-events-none transition-all duration-300">
        <div className="flex items-center justify-between">
          {/* نام محصول */}
          <h2 className="text-sm font-semibold text-gray-500">
            {product.name}
          </h2>
          <div className="flex items-center gap-1">
            {/* نمایش امتیاز محصول */}
            <FaStar size={16} className="text-[#FFD700] mb-1" />
            <small className="text-gray-400 font-thin">
              ({product.rating}) {/* تعداد ستاره‌ها */}
            </small>
          </div>
        </div>

        {/* دسته‌بندی محصول */}
        <div className="text-gray-400">
          <small>
            {product.category === 'men'
              ? 'مردانه'
              : product.category === 'women'
              ? 'زنانه'
              : 'بچه گانه'}
          </small>
        </div>

        {/* قیمت محصول */}
        <p className="text-lg font-semibold text-dark">{`${product.price.toLocaleString(
          'fa-IR'
        )} تومان`}</p>
      </div>

      {/* تصاویر بندانگشتی برای تغییر تصویر اصلی */}
      <div
        className="hidden lg:flex absolute bottom-5 left-3 gap-2 justify-center px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
        onMouseLeave={() => setMainImage(product.images[0])} // بازگشت به تصویر اصلی هنگام خروج موس
      >
        {product.images.map((image, index) => (
          <div
            key={index}
            onMouseEnter={() => setMainImage(image)} // تغییر تصویر اصلی با هاور موس
            className="cursor-pointer"
          >
            <Image
              src={image} // نمایش تصویر بندانگشتی
              alt={`Product image ${index + 1}`}
              width={60}
              height={60}
              className="rounded-lg hover:scale-110 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </Link>
  )
}

// کارت محصول شماره 2
export function ProductCard2({ product, onRemove }) {
  const [isLiked, setIsLiked] = useState(false) // وضعیت لایک
  const [randomViews, setRandomViews] = useState(0) // بازدید تصادفی
  const [productNumber, setProductNumber] = useState(1) // تعداد محصول
  const [isInCart, setIsInCart] = useState(false) // بررسی وجود در سبد خرید

  // بارگذاری وضعیت لایک و بازدید تصادفی
  useEffect(() => {
    // دریافت محصولات لایک‌شده از localStorage
    const savedLikes = JSON.parse(localStorage.getItem('likedProducts')) || []
    if (savedLikes.includes(product.id)) {
      setIsLiked(true)
    }

    // تولید بازدید تصادفی بین 100 تا 1000
    setRandomViews(Math.floor(Math.random() * 901) + 100)
  }, [product.id])

  // بارگذاری وضعیت محصول در سبد خرید
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || {}
    if (savedCart[product.id]) {
      setIsInCart(true)
      setProductNumber(savedCart[product.id].quantity || 1)
    }
  }, [product.id])

  // به‌روزرسانی سبد خرید
  const updateCart = (quantity = 1, e) => {
    e.preventDefault()

    // اطمینان از صحت داده‌های محصول
    if (
      !product ||
      !product.id ||
      !product.name ||
      !product.category ||
      !product.sizes[0] ||
      !product.colors[0] ||
      !product.price ||
      !product.images ||
      !product.images[0]
    ) {
      console.error(
        'خطا: داده‌های محصول نامعتبر است یا برخی مقادیر خالی هستند.',
        {
          product,
        }
      )
      return
    }

    // جلوگیری از تنظیم تعداد کمتر از 1
    if (quantity < 1) {
      quantity = 1
    }

    // به‌روزرسانی سبد خرید در localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || {}
    savedCart[product.id] = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      size: product.sizes[0],
      color: product.colors[0],
      quantity,
      image: product.images[0], // اطمینان از وجود تصویر
    }

    // ذخیره‌سازی در localStorage
    localStorage.setItem('cart', JSON.stringify(savedCart))

    // به‌روزرسانی تعداد محصول و وضعیت سبد خرید
    setProductNumber(quantity)
    setIsInCart(true)
  }

  // مدیریت لایک محصول
  const handleLike = (e) => {
    e.preventDefault()
    const likedProducts =
      JSON.parse(localStorage.getItem('likedProducts')) || []

    // اگر محصول قبلاً لایک شده باشد، آن را از لیست حذف می‌کند
    if (isLiked) {
      const updatedLiked = likedProducts.filter((id) => id !== product.id)
      localStorage.setItem('likedProducts', JSON.stringify(updatedLiked))
      if (onRemove) onRemove() // صدا زدن تابع onRemove اگر موجود باشد
    } else {
      likedProducts.push(product.id)
      localStorage.setItem('likedProducts', JSON.stringify(likedProducts))
    }

    // تغییر وضعیت لایک
    setIsLiked(!isLiked)
  }

  return (
    <>
      <Link
        href={`/store/${product.category}/product/${product.id}`}
        className="block relative w-64 h-max shadow-lg bg-neutral rounded-xl overflow-hidden cursor-pointer scale-[70%] lg:scale-100"
      >
        {/* تصویر محصول */}
        <figure className="relative w-full h-48">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority
            className="rounded-t-lg object-cover"
          />
        </figure>

        <div className="p-4 bg-neutral space-y-2 border-t rounded-t-lg border-secondary">
          <div className="flex items-center gap-2">
            {/* ستاره امتیاز محصول */}
            <FaStar size={20} className="text-[#FFD700] mb-1" />
            <small className="text-gray-400 font-thin">{`(${randomViews} بازدید)`}</small>
          </div>

          {/* نام محصول */}
          <h2 className="text-md font-semibold text-dark truncate">
            {product.name}
          </h2>

          <div className="flex items-center justify-between">
            {/* قیمت محصول */}
            <p className="text-md font-semibold text-dark">
              {`${product.price.toLocaleString('fa-IR')} تومان`}
            </p>
            <button
              className="p-2 shadow-md shadow-primary rounded-full text-primary"
              onClick={(e) => updateCart(productNumber, e)}
              disabled={isInCart} // دکمه غیرفعال در صورت اضافه شدن به سبد خرید
            >
              {isInCart ? (
                <FiCheck size={18} className="text-accent" /> // آیکون چک
              ) : (
                <HiOutlineShoppingBag size={18} /> // آیکون سبد خرید
              )}
            </button>
          </div>

          {/* دکمه لایک */}
          <button
            className="absolute top-2 left-2 shadow-md shadow-primary p-1 rounded-full"
            onClick={handleLike}
          >
            {isLiked ? (
              <FaHeart className="text-primary hover:text-primary transition duration-200" />
            ) : (
              <FaRegHeart className="text-primary hover:text-primary transition duration-200" />
            )}
          </button>
        </div>
      </Link>
    </>
  )
}

// کارت محصول شماره 3
export function ProductCard3({ product }) {
  const [isInCart, setIsInCart] = useState(false) // وضعیت محصول در سبد خرید

  // بارگذاری وضعیت محصول در سبد خرید از localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || {}
    if (savedCart[product.id]) {
      setIsInCart(true) // اگر محصول در سبد خرید باشد، وضعیت به "در سبد خرید" تغییر می‌کند
    }
  }, [product.id])

  // مدیریت افزودن محصول به سبد خرید
  const handleAddToCart = (e) => {
    e.preventDefault()

    // اگر محصول قبلاً در سبد خرید باشد، هیچ اقدامی نمی‌شود
    if (isInCart) return

    // افزودن محصول به سبد خرید
    const savedCart = JSON.parse(localStorage.getItem('cart')) || {}

    savedCart[product.id] = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: 1, // تعداد محصول به صورت پیش‌فرض 1 در نظر گرفته شده است
      image: product.images[0], // تصویر محصول
    }

    // ذخیره‌سازی سبد خرید در localStorage
    localStorage.setItem('cart', JSON.stringify(savedCart))

    // تغییر وضعیت به "محصول در سبد خرید"
    setIsInCart(true)
  }

  return (
    <div className="flex items-center gap-2 shadow-lg bg-neutral rounded-lg lg:max-h-[195px] overflow-hidden">
      {/* لینک به صفحه جزئیات محصول */}
      <Link
        href={`/store/${product.category}/product/${product.id}`}
        className="lg:w-64 h-full cursor-pointer"
      >
        {/* تصویر محصول */}
        <Image
          src={product.images[0]}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg object-cover mr-2 lg:mr-0"
        />
      </Link>

      {/* جزئیات محصول */}
      <div className="w-full flex flex-col p-4 space-y-2">
        <div className="flex items-center justify-between">
          {/* لینک به صفحه جزئیات محصول */}
          <Link
            href={`/store/${product.category}/product/${product.id}`}
            className="text-sm font-semibold text-gray-500 cursor-pointer"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-1 text-gray-400">
            {/* امتیاز محصول */}
            <small>امتیاز</small>
            (
            <FaStar size={14} className="text-[#FFD700] mb-1" />
            <small>{product.rating}</small>)
          </div>
        </div>

        {/* دسته‌بندی محصول */}
        <div className="text-gray-400">
          <small>
            {product.category === 'men'
              ? 'مردانه'
              : product.category === 'women'
              ? 'زنانه'
              : 'بچه گانه'}
          </small>
        </div>

        {/* نمایش سایز محصول */}
        <small className="text-gray-400">
          سایز : ({product.sizes.join(' , ')})
        </small>

        {/* نمایش رنگ‌های محصول */}
        <small className="flex items-center gap-2 text-gray-400">
          رنگ : (
          {product.colors.map((color, index) => (
            <small
              key={index}
              className="w-3 h-3 rounded-full border border-dark"
              style={{ backgroundColor: color }}
            ></small>
          ))}
          )
        </small>

        {/* قیمت محصول و دکمه افزودن به سبد خرید */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-dark">{`${product.price.toLocaleString(
            'fa-IR'
          )} تومان`}</p>
          <button
            className={`flex items-center justify-center gap-2 p-2 lg:py-2 lg:px-4 text-sm lg:text-lg text-nowrap shadow-md rounded-md lg:rounded-lg ${
              isInCart ? 'bg-background text-dark' : 'bg-primary text-neutral'
            }`}
            onClick={handleAddToCart}
          >
            {/* آیکون سبد خرید */}
            {isInCart ? (
              <FiCheck size={18} className="text-accent" />
            ) : (
              <HiOutlineShoppingBag size={18} />
            )}
            {/* متن دکمه */}
            <span className="hidden lg:inline">
              {isInCart ? 'به سبد خرید اضافه شد' : 'افزودن به سبد خرید'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

// کارت محصول شماره 4
export function ProductCard4({ item, onRemove, onUpdateQuantity }) {
  // ترجمه دسته‌بندی محصول
  const translateCategory = (category) => {
    switch (category) {
      case 'men':
        return 'مردانه'
      case 'women':
        return 'زنانه'
      case 'kids':
        return 'بچه‌گانه'
      default:
        return category
    }
  }

  return (
    <div className="flex rounded-lg overflow-hidden bg-gray-400">
      <div className="w-[90%] lg:w-[95%] flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-neutral rounded-lg shadow-md p-4">
        {/* بخش تصویر و جزئیات محصول */}
        <div className="flex items-center gap-6">
          <Link
            href={`/store/${item.category}/product/${item.id}`}
            className="relative w-32 h-32"
          >
            {/* تصویر محصول */}
            <Image
              src={item.image}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md shadow-md"
            />
          </Link>
          <div className="space-y-6">
            {/* بخش بالا: نمایش دسته‌بندی و نام محصول */}
            <section>
              <p className="text-gray-400">
                {translateCategory(item.category)}
              </p>
              <Link
                href={`/store/${item.category}/product/${item.id}`}
                className="text-lg font-semibold text-dark"
              >
                {item.name}
              </Link>
            </section>

            {/* بخش پایین: نمایش سایز و رنگ محصول */}
            <section className="space-y-1">
              <p className="flex items-center gap-4 text-sm text-gray-600">
                <span className="text-gray-400">سایز</span>
                <span>● {item.size}</span>
              </p>
              <p className="flex items-center gap-4 text-sm text-gray-600">
                <span className="text-gray-400">رنگ</span>
                <div className="flex items-center gap-1">
                  <span className="mr-px mt-1">●</span>
                  <p
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></p>
                </div>
              </p>
            </section>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* بخش قیمت */}
          <span className="hidden lg:block text-lg text-dark">
            {new Intl.NumberFormat('fa-IR').format(item.price)} تومان
          </span>

          {/* بخش دکمه‌های افزایش و کاهش تعداد */}
          <div className="flex items-center">
            {/* دکمه کاهش تعداد */}
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-2 text-gray-600 border-2 border-gray-300 rounded-lg"
            >
              <FiMinus />
            </button>

            {/* نمایش تعداد محصول */}
            <span className="w-[50px] text-center text-gray-700">
              {item.quantity}
            </span>

            {/* دکمه افزایش تعداد */}
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-2 text-gray-600 border-2 border-gray-300 rounded-lg"
            >
              <FiPlus />
            </button>
          </div>

          {/* نمایش قیمت کل محصول */}
          <span className="w-[120px] text-nowrap text-lg text-accent">
            {new Intl.NumberFormat('fa-IR').format(item.price * item.quantity)}{' '}
            تومان
          </span>
        </div>
      </div>

      {/* دکمه حذف محصول */}
      <button
        onClick={() => onRemove(item.id)}
        className="w-[10%] lg:w-[5%] grid place-items-center text-neutral bg-gray-400  hover:bg-[#FF0000] transition-all duration-300"
      >
        <FaTrashAlt size={20} /> {/* آیکون سطل زباله برای حذف محصول */}
      </button>
    </div>
  )
}

// کارت محصول شماره 5
export function ProductCard5({ product }) {
  // فرمت‌بندی قیمت به تومان ایران
  const formattedPrice = new Intl.NumberFormat('fa-IR', {
    currency: 'IRR', // استفاده از IRR برای تومان ایران
  }).format(product.price)

  return (
    <div className="flex items-center justify-between p-1 bg-white shadow-lg rounded-xl border border-gray-200">
      {/* بخش سمت چپ: تصویر محصول */}
      <div className="flex items-center">
        <Image
          width={90}
          height={120}
          src={product.image}
          alt={product.name}
          className="w-24 h-32 object-cover rounded-lg" // استایل برای تصویر
        />
      </div>

      {/* بخش وسط: جزئیات محصول */}
      <div className="flex flex-col gap-4 text-right flex-grow mx-4">
        {/* top section: نمایش نام و قیمت محصول */}
        <section className="space-y-1">
          {/* نام محصول */}
          <p className="text-base font-semibold text-dark">{product.name}</p>
          {/* قیمت محصول */}
          <p className="text-lg font-bold text-dark">{formattedPrice} تومان</p>
        </section>

        {/* اطلاعات اضافی محصول */}
        {/* bottom section: نمایش سایز، تعداد و رنگ محصول */}
        <section className="space-y-1">
          {/* سایز محصول */}
          <p className="w-full flex items-center gap-6 text-sm text-gray-600">
            <span className="text-gray-400">سایز</span>
            <span>● {product.size}</span>
          </p>
          {/* تعداد محصول */}
          <p className="w-full flex items-center gap-[19px] text-sm text-gray-600">
            <span className="text-gray-400">تعداد</span>
            <span>● {product.quantity}</span>
          </p>
          {/* رنگ محصول */}
          <p className="w-full flex items-center gap-[26px] text-sm text-gray-600">
            <span className="text-gray-400">رنگ</span>
            <div className="flex items-center gap-1">
              <span className="mr-px mt-1">●</span>
              <p
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: product.color }} // نمایش رنگ به‌صورت دایره‌ای
              ></p>
            </div>
          </p>
        </section>
      </div>
    </div>
  )
}
