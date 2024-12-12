import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'

// کامپوننت پاپ آپ برای ویرایش آدرس
export default function AddressPopup({ isOpen, onClose, onSave }) {
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [isFormValid, setIsFormValid] = useState(true) // مدیریت اعتبارسنجی فرم

  // Load data from localStorage when the popup opens
  useEffect(() => {
    if (isOpen) {
      const savedAddress = JSON.parse(localStorage.getItem('address')) || {}
      setAddress(savedAddress.address || '')
      setPostalCode(savedAddress.postalCode || '')
      setCity(savedAddress.city || '')
    }
  }, [isOpen])

  const handleSave = () => {
    if (!address || !postalCode || !city) {
      setIsFormValid(false)
      return // اگر هر کدام از فیلدها خالی باشد، ثبت انجام نمی‌شود
    }
    const newAddress = { address, postalCode, city }
    onSave(newAddress)
    localStorage.setItem('address', JSON.stringify(newAddress)) // Save updated address to localStorage
    onClose() // بستن پاپ آپ بعد از ثبت
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center flex-col gap-4 z-50">
      <div className="bg-neutral p-6 rounded-lg w-96 shadow-lg space-y-4 relative">
        <h2 className="text-2xl font-semibold text-dark mb-4">ویرایش آدرس</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">آدرس</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark"
            />
          </div>
          <div>
            <label className="block text-gray-700">کد پستی</label>
            <input
              type="number"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark"
            />
          </div>
          <div>
            <label className="block text-gray-700">شهر</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark"
            />
          </div>
        </div>
        {!isFormValid && (
          <p className="text-red-500 text-sm">لطفاً همه فیلدها را پر کنید.</p>
        )}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleSave}
            className="w-full py-2 px-4 bg-dark text-neutral rounded-lg"
          >
            ثبت آدرس
          </button>
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-neutral rounded-full z-10"
      >
        <FiX size={20} />
      </button>
    </div>
  )
}
