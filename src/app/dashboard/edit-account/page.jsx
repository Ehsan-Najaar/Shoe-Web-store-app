'use client'

import DashboardMenu from '@/components/DashboardMenu'
import SweetAlert from '@/components/SweetAlert'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaImage, FaUser } from 'react-icons/fa'
import { FiChevronLeft } from 'react-icons/fi'
// import Swal from 'sweetalert2'

export default function EditAccount() {
  const [currentName, setCurrentName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [nationalId, setNationladId] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [toggleRender, setToggleRender] = useState(false) // اضافه کردن state جدید برای رندر مجدد
  const [alert, setAlert] = useState({
    isOpen: false,
    title: '',
    message: '',
  })

  // بارگذاری اطلاعات ذخیره‌شده از Local Storage
  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    const savedProfile = localStorage.getItem('userProfile')

    if (savedName) {
      setCurrentName(savedName) // ذخیره نام کاربری در state
    }
    if (savedProfile) {
      setProfileImage(savedProfile) // ذخیره تصویر پروفایل در state
    }
  }, [toggleRender]) // ریرندر شدن در صورت تغییر اطلاعات

  // تابع برای تغییر تصویر پروفایل
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result) // ذخیره تصویر در state
        localStorage.setItem('userProfile', reader.result) // ذخیره تصویر در Local Storage
      }
      reader.readAsDataURL(file) // تبدیل تصویر به Base64
    } else {
      console.warn('لطفاً یک تصویر معتبر انتخاب کنید.')
    }
  }

  // تابع برای ثبت تغییرات فرم
  const handleSubmit = (e) => {
    e.preventDefault()

    // ذخیره نام و تصویر پروفایل در Local Storage
    localStorage.setItem('userName', currentName)
    localStorage.setItem('userProfile', profileImage)

    // بررسی مطابقت رمز عبور
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'خطا!',
        text: 'رمز عبور و تأیید رمز عبور باید برابر باشند!',
      })
      return
    }

    setAlert({
      isOpen: true,
      title: 'موفقیت',
      message: 'اطلاعات شما بروزرسانی شد.',
    })

    // تغییر دادن state برای ریرندر شدن کامپوننت
    setToggleRender(!toggleRender)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-6 px-4 md:px-12 lg:px-16 xl:px-24 py-4 md:py-6 lg:py-10 xl:py-12">
      {/* هدر موبایل */}
      <div className="lg:hidden flex items-center justify-between bg-neutral rounded-lg shadow-lg shadow-gray-700  p-2">
        <h2 className="text-xl font-bold">ویرایش اطلاعات</h2>
        <Link href="/dashboard">
          <FiChevronLeft size={40} className="cursor-pointer" />
        </Link>
      </div>

      {/* منوی داشبورد برای نمایش در نسخه‌های بزرگتر */}
      <div className="lg:w-1/4 hidden lg:block">
        <DashboardMenu activeIndex={0} />
      </div>

      {/* فرم ویرایش اطلاعات */}
      <div className="lg:w-3/4 lg:max-h-[536px] bg-neutral shadow-lg shadow-gray-700 rounded-3xl p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* فیلد انتخاب عکس پروفایل */}
          <figure className="w-24 h-24 relative mx-auto group">
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-30"
              onClick={(e) => {
                e.target.value = null // برای انتخاب مجدد تصویر
              }}
            />
            {profileImage ? (
              <Image
                width={90}
                height={90}
                src={profileImage}
                alt="Profile Preview"
                className="w-full h-full rounded-full object-cover transition-opacity duration-200 z-20"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full rounded-full bg-gray-300">
                <FaUser className="text-dark w-12 h-12" />
              </div>
            )}

            {/* آیکون تغییر تصویر */}
            <div className="absolute inset-0 flex items-center justify-center bg-black cursor-pointer bg-opacity-0 group-hover:bg-opacity-50 rounded-full transition-opacity duration-200 z-10">
              <FaImage className="text-neutral w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </figure>

          {/* فیلدهای فرم */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              id="userName"
              type="text"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              className="input"
              placeholder="نام"
              maxLength={25}
            />
            <input
              id="userEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="ایمیل"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              id="phoneNumber"
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="input"
              placeholder="شماره موبایل"
              maxLength={11}
            />
            <input
              id="NationalId"
              type="text"
              value={nationalId}
              onChange={(e) => setNationladId(e.target.value)}
              className="input"
              placeholder="کد ملی"
            />
          </div>

          {/* فیلدهای رمز عبور */}
          <div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <input
                id="userPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="رمز عبور جدید"
              />
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                placeholder="تکرار رمز عبور"
              />
            </div>
            <small className="text-accent text-[11px] pr-4">
              اگر می‌خواهید رمز عبور خود را عوض کنید، این فیلد و فیلد بعدی را پر
              کنید.
            </small>
          </div>

          {/* دکمه ارسال فرم */}
          <button
            type="submit"
            className="bg-accent py-2 px-4 text-neutral rounded-lg w-full md:w-max"
          >
            ذخیره تغییرات
          </button>
        </form>
      </div>

      {/* نمایش پیام موفقیت یا خطا */}
      <SweetAlert
        isOpen={alert.isOpen}
        title={alert.title}
        message={alert.message}
        onClose={() => setAlert({ ...alert, isOpen: false })}
      />
    </div>
  )
}
