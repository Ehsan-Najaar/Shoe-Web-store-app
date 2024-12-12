import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaStore } from 'react-icons/fa'
import { FiSearch, FiUser } from 'react-icons/fi'
import {
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineMail,
  HiOutlineShoppingBag,
} from 'react-icons/hi'
import Search from './Search' // اضافه کردن کامپوننت جستجو

// لینک‌های منوی ناوبری
const navLinks = [
  { title: 'خانه', path: '/', icon: <HiOutlineHome className="w-5 h-5" /> },
  { title: 'فروشگاه', path: '/store', icon: <FaStore className="w-5 h-5" /> },
  {
    title: 'درباره ما',
    path: '/about',
    icon: <HiOutlineInformationCircle className="w-5 h-5" />,
  },
  {
    title: 'بلاگ',
    path: '/blog',
    icon: <HiOutlineDocumentText className="w-5 h-5" />,
  },
  {
    title: 'ارتباط با ما',
    path: '/contact',
    icon: <HiOutlineMail className="w-5 h-5" />,
  },
]

export default function Header() {
  const pathName = usePathname()
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false) // حالت برای باز و بسته کردن مودال جستجو

  // استفاده از useEffect برای نظارت بر اسکرول صفحه و به‌روزرسانی تعداد آیتم‌های سبد خرید
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        setShowHeader(false) // اسکرول به پایین، مخفی کردن هدر
      } else {
        setShowHeader(true) // اسکرول به بالا، نمایش هدر
      }

      setLastScrollY(currentScrollY) // ذخیره آخرین اسکرول
    }

    window.addEventListener('scroll', handleScroll)

    // به‌روزرسانی تعداد محصولات سبد خرید از localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart'))
    if (savedCart) {
      const itemCount = Object.values(savedCart).reduce(
        (total, item) => total + (item.quantity || 0),
        0
      )
      setCartItemCount(itemCount) // تعداد آیتم‌های سبد خرید را به‌روزرسانی می‌کند
    }

    return () => {
      window.removeEventListener('scroll', handleScroll) // حذف listener هنگام ترک کامپوننت
    }
  }, [lastScrollY])

  // باز کردن مودال جستجو
  const handleSearchClick = () => {
    setIsSearchModalOpen(true)
  }

  // بستن مودال جستجو
  const closeSearchModal = () => {
    setIsSearchModalOpen(false)
  }

  return (
    <header
      className={`hidden lg:flex fixed top-0 left-0 right-0 items-center justify-between py-4 px-4 md:px-8 xl:px-24 shadow-md bg-secondary z-50 transition-all duration-300 text-dark ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* لوگو سمت راست */}
      <div className="flex items-center">
        <Link href={'/'} className="h-14 grid place-items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={150}
            height={150}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>
      </div>

      {/* لینک‌های وسط */}
      <nav>
        <ul className="flex items-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              href={link.path}
              className={`${
                (link.path === '/' && pathName === '/') ||
                (link.path !== '/' && pathName.startsWith(link.path))
                  ? 'bg-primary text-neutral'
                  : 'hover:bg-primary/30'
              } hover:bg-primary hover:text-neutral px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2`}
              key={index}
            >
              {link.icon}
              {link.title}
            </Link>
          ))}
        </ul>
      </nav>

      {/* آیکون‌های سمت چپ */}
      <div className="flex items-center gap-4">
        {/* آیکون سرچ */}
        <button onClick={handleSearchClick}>
          <FiSearch className="w-6 h-6" />
        </button>
        {/* آیکون سبد خرید */}
        <Link href="/cart" className="relative">
          <HiOutlineShoppingBag className="w-6 h-6" />
          {cartItemCount > 0 && (
            <small className="absolute -bottom-2 -right-2 w-4 h-4 flex items-center justify-center rounded-sm bg-accent text-neutral text-[9px]">
              {cartItemCount}
            </small>
          )}
        </Link>
        {/* آیکون پروفایل */}
        <Link href="/dashboard/my-orders">
          <FiUser className="w-6 h-6" />
        </Link>
      </div>

      {/* نمایش مودال جستجو */}
      <Search isOpen={isSearchModalOpen} closeModal={closeSearchModal} />
    </header>
  )
}
