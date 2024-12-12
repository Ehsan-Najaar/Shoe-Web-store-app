'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { FiDollarSign, FiEdit, FiHeart, FiMail } from 'react-icons/fi'
import { HiOutlineShoppingBag } from 'react-icons/hi'

// لیست منوی داشبورد برای کاربر
const DashboardMenuList = [
  {
    name: 'ویرایش اطلاعات',
    icon: <FiEdit className="h-6 w-6" />,
    path: 'edit-account',
  },
  {
    name: 'سفارشات من',
    icon: <HiOutlineShoppingBag className="h-6 w-6" />,
    path: 'my-orders',
  },
  {
    name: 'لیست من',
    icon: <FiHeart className="h-6 w-6" />,
    path: 'my-list',
  },
  {
    name: 'کیف پول',
    icon: <FiDollarSign className="h-6 w-6" />,
    path: 'wallet',
  },
  { name: 'پیغام‌ها', icon: <FiMail className="h-6 w-6" />, path: 'messages' },
]

export default function DashboardMenu({ activeIndex = 0 }) {
  const [userName, setUserName] = useState('کاربر محترم')
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    // دریافت نام و پروفایل ذخیره‌شده از localStorage
    const savedName = localStorage.getItem('userName')
    const savedProfile = localStorage.getItem('userProfile')

    if (savedName) {
      setUserName(savedName) // بروزرسانی نام کاربر
    }
    if (savedProfile) {
      setUserProfile(savedProfile) // بروزرسانی پروفایل کاربر
    }
  }, [])

  // تابعی برای رندر کردن هر آیتم منو
  const renderMenuItem = (item, index) => (
    <Link
      href={`/dashboard/${item.path}`}
      key={item.name}
      className={`flex items-center gap-2 p-4 cursor-pointer rounded-lg ${
        activeIndex === index
          ? 'md:bg-primary md:text-neutral md:pr-6'
          : 'md:bg-transparent md:text-dark hover:md:pr-6 hover:bg-gray-300 hover:text-dark transition-all duration-300'
      }`}
    >
      <span>{item.icon}</span>
      <span>{item.name}</span>
    </Link>
  )

  return (
    <section className="h-max bg-neutral lg:min-w-[20%] shadow-lg shadow-gray-700 rounded-3xl p-4 space-y-6">
      {/* آواتار کاربر */}
      <div className="text-center space-y-4">
        <figure className="h-24 w-24 bg-gray-300 text-dark mx-auto rounded-full grid place-items-center overflow-hidden">
          {userProfile ? (
            // نمایش تصویر پروفایل اگر موجود باشد
            <Image
              width={90}
              height={90}
              src={userProfile}
              alt="Profile Picture"
              className="w-full h-full rounded-full object-cover transition-opacity duration-200 z-20"
            />
          ) : (
            // نمایش آیکون پیش‌فرض اگر تصویر پروفایل وجود نداشته باشد
            <FaUser className="h-10 w-10" />
          )}
        </figure>
        <p className="text-accent">سلام {userName}</p>
        {/* آیتم ویرایش پروفایل */}
        {renderMenuItem(DashboardMenuList[0], 0)}
      </div>
      <hr />
      {/* سایر آیتم‌های منو */}
      <div className="space-y-2">
        {DashboardMenuList.slice(1).map((item, index) =>
          renderMenuItem(item, index + 1)
        )}
      </div>
    </section>
  )
}
