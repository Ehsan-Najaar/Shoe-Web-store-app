import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FaStore } from 'react-icons/fa'
import { FiSearch, FiUser } from 'react-icons/fi'
import { HiOutlineHome, HiOutlineShoppingBag } from 'react-icons/hi'

export default function BottomNavbar({ cartItemCount }) {
  const pathName = usePathname() // دریافت مسیر فعلی
  const [activeBounce, setActiveBounce] = useState(null) // مدیریت انیمیشن فنری

  // تعریف آیتم‌های منو
  const navItems = [
    { title: 'خانه', path: '/', icon: <HiOutlineHome className="w-6 h-6" /> },
    { title: 'سرچ', path: '/search', icon: <FiSearch className="w-6 h-6" /> },
    {
      title: 'فروشگاه',
      path: '/store',
      icon: <FaStore className="w-6 h-6" />,
    },
    {
      title: 'سبد خرید',
      path: '/cart',
      icon: <HiOutlineShoppingBag className="w-6 h-6" />,
    },
    {
      title: 'پروفایل',
      path: '/dashboard',
      icon: <FiUser className="w-6 h-6" />,
    },
  ]

  // مدیریت انیمیشن فنری
  const handleClick = (path) => {
    setActiveBounce(path) // فعال‌سازی انیمیشن برای مسیر انتخاب شده
    setTimeout(() => {
      setActiveBounce(null) // غیرفعال کردن انیمیشن بعد از 2 ثانیه
    }, 2000)
  }

  // بررسی اینکه آیا مسیر انتخاب شده فعال است یا نه
  const isActive = (path) => {
    if (path === '/') {
      return pathName === '/' // روت خانه فقط زمانی اکتیو باشد که مسیر دقیقاً `/` باشد
    }
    return pathName.startsWith(path) // سایر مسیرها: بررسی زیرمجموعه بودن
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-secondary shadow-md border-t border-dark">
      <div className="flex justify-around items-center h-16 px-4 relative">
        {navItems.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            className="relative flex flex-col items-center justify-center group"
            onClick={() => handleClick(item.path)} // اعمال انیمیشن به دکمه انتخابی
          >
            {/* حباب اکتیو */}
            {isActive(item.path) && (
              <span
                className={`bg-primary text-neutral w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                  activeBounce === item.path ? 'animate-smooth-bounce' : '' // اعمال انیمیشن فنری
                }`}
              >
                {item.icon}
              </span>
            )}

            {/* آیکون عادی */}
            {!isActive(item.path) && (
              <span className="text-dark">{item.icon}</span>
            )}

            {/* نشان تعداد آیتم برای سبد خرید */}
            {item.path === '/cart' && cartItemCount > 0 && (
              <small className="absolute -top-2 -right-3 bg-accent text-neutral text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </small>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
