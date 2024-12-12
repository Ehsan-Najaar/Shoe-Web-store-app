'use client'

import { ProductCard1 } from '@/components/productCard'
import { useRouter } from 'next/navigation' // برای ریدایرکت
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import productData from '../../../data/productData'

export default function SearchPage() {
  const [query, setQuery] = useState('') // مقدار ورودی جستجو
  const [filteredProducts, setFilteredProducts] = useState([]) // محصولات فیلتر شده
  const [suggestions, setSuggestions] = useState([]) // پیشنهادات جستجو
  const router = useRouter() // استفاده از useRouter برای ریدایرکت

  // فیلتر کردن محصولات بر اساس جستجو
  const handleSearch = (e) => {
    const value = e.target.value // گرفتن مقدار ورودی جستجو
    setQuery(value)

    // اگر جستجو خالی باشد، پیشنهادات پیش‌فرض نمایش داده می‌شود
    if (value === '') {
      setFilteredProducts([])
      setSuggestions(productData.slice(0, 5)) // نمایش ۵ پیشنهاد اول وقتی جستجو خالی است
    } else {
      // فیلتر کردن محصولات بر اساس نام
      const filtered = productData.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredProducts(filtered)
    }
  }

  // تنظیم پیشنهادات اولیه وقتی که کامپوننت بارگذاری می‌شود
  useEffect(() => {
    setSuggestions(productData.slice(0, 5)) // نمایش ۵ پیشنهاد پیش‌فرض
  }, [])

  // ریدایرکت به صفحه خانه اگر صفحه از اندازه لارج بزرگ‌تر شود
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // اندازه لارج (1024px)
        router.push('/') // ریدایرکت به صفحه خانه
      }
    }

    handleResize() // بررسی اولیه اندازه
    window.addEventListener('resize', handleResize) // گوش دادن به تغییر اندازه

    // حذف لیسنر در هنگام پاکسازی کامپوننت
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [router])

  return (
    <div className="min-h-screen p-4 mx-auto lg:hidden">
      {/* بخش جستجو */}
      <div className="flex items-center gap-2 border-b border-neutral pb-2 mb-4">
        <FiSearch className="w-6 h-6 text-dark mr-2" />
        <input
          type="text"
          value={query}
          onChange={handleSearch} // فراخوانی تابع جستجو هنگام تغییر ورودی
          placeholder="کفش مورد نظرتون را جستجو کنید..."
          className="input"
        />
      </div>

      {/* پیشنهادات جستجو */}
      {query === '' && (
        <div className="mb-6">
          <h3 className="text-dark text-sm">جستجوهای پرطرفدار</h3>
          <div className="flex items-center gap-4 overflow-x-scroll p-2 scrollbar-hide">
            {suggestions.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-max p-3 bg-neutral text-dark rounded-md hover:bg-dark hover:text-neutral text-nowrap"
              >
                کفش {product.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* نتایج جستجو */}
      {query !== '' && filteredProducts.length === 0 && (
        <p className="text-center text-dark">محصولی یافت نشد</p>
      )}
      {query !== '' && filteredProducts.length > 0 && (
        <ul className="grid place-items-center grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard1 key={product.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  )
}
