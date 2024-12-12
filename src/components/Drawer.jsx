import Link from 'next/link'
import { useState } from 'react'
import { HiOutlineMenu } from 'react-icons/hi'

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  const drawerLinks = [
    { title: 'درباره ما', path: '/about' },
    { title: 'بلاگ', path: '/blog' },
    { title: 'ارتباط با ما', path: '/contact' },
  ]

  return (
    <>
      {/* آیکون باز کردن دراور */}
      <button onClick={toggleDrawer} className="text-dark">
        <HiOutlineMenu size={22} />
      </button>

      {/* پس‌زمینه تاریک هنگام باز بودن دراور */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer} // بستن دراور با کلیک روی پس‌زمینه
        ></div>
      )}

      {/* محتوای دراور */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-secondary shadow-md z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* دکمه بستن دراور */}
        <button
          onClick={toggleDrawer}
          className="absolute top-4 right-4 text-dark text-2xl"
        >
          &times;
        </button>

        {/* لینک‌ها */}
        <ul className="mt-16 px-6 space-y-4">
          {drawerLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.path}
                className="block text-dark hover:text-primary text-lg font-medium transition-colors"
                onClick={toggleDrawer} // بستن دراور هنگام کلیک
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
