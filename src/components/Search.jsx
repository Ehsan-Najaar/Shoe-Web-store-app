import { ProductCard1 } from '@/components/productCard'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import productData from '../../data/productData'

export default function Search({ isOpen, closeModal }) {
  const [query, setQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const pathname = usePathname()

  // تابع برای فیلتر کردن محصولات بر اساس جستجو
  const handleSearch = (e) => {
    const value = e.target.value
    setQuery(value)

    if (!value.trim()) {
      setFilteredProducts([])
    } else {
      const filtered = productData.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredProducts(filtered)
    }
  }

  // پاک کردن مقدار جستجو هنگام بسته شدن مودال
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setFilteredProducts([]) // پاک کردن نتایج فیلتر شده
    }
  }, [isOpen])

  // جلوگیری از بستن مودال به‌صورت ناخواسته هنگام تغییر مسیر
  useEffect(() => {
    if (pathname !== '/store' && pathname.includes('/product/')) {
      closeModal()
    }
  }, [pathname, closeModal])

  return (
    isOpen && (
      <div
        className="fixed w-screen min-h-[calc(100vh+100px)] inset-0 bg-black/50 flex justify-center items-start z-50"
        onClick={closeModal}
      >
        <div
          className="bg-neutral p-6 rounded-lg w-11/12 max-w-4xl mt-24 space-y-4"
          onClick={(e) => e.stopPropagation()} // جلوگیری از بستن مودال هنگام کلیک داخل آن
        >
          {/* بستن مودال */}
          <button
            onClick={closeModal}
            className="text-xl text-gray-500 hover:text-primary transition duration-300"
          >
            <FiX size={20} />
          </button>

          {/* عنوان جستجو */}
          <div className="flex items-center gap-2">
            <FiSearch className="w-6 h-6 text-primary" />
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="کفش مورد نظرتون را جستجو کنید..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* نمایش محصولات جستجو شده */}
          {query && filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">محصولی یافت نشد</p>
          ) : (
            <ul className="grid grid-cols-3 gap-6 max-h-[450px] overflow-auto p-2">
              {filteredProducts.map((product) => (
                <ProductCard1 key={product.id} product={product} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  )
}
