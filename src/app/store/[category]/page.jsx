'use client'

import { ProductCard1, ProductCard3 } from '@/components/productCard'
import FilterSidebar from '@/components/Store/FilterSidebar'
import Toolbar from '@/components/Store/Toolbar'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiFilter, FiX } from 'react-icons/fi'
import productData from '../../../../data/productData'

export default function Category() {
  const pathname = usePathname() // مسیر کنونی صفحه
  const [sortOption, setSortOption] = useState('most_viewed') // گزینه مرتب‌سازی
  const [filteredProducts, setFilteredProducts] = useState([]) // محصولات فیلترشده
  const [viewMode, setViewMode] = useState('grid') // مقدار پیش‌فرض گرید
  const [filtersOpen, setFiltersOpen] = useState(false) // وضعیت باز/بسته بودن فیلتر کشویی
  const [showFilterButton, setShowFilterButton] = useState(true) // وضعیت نمایش دکمه فیلتر
  const [lastScrollY, setLastScrollY] = useState(0)

  // استخراج دسته‌بندی از آخرین بخش مسیر
  const category = pathname.split('/').pop()

  // مپ برای تبدیل نام برندها از فارسی به انگلیسی
  const brandMap = {
    نایک: 'Nike',
    آدیداس: 'Adidas',
    پوما: 'Puma',
  }

  // تنظیم محصولات پیش‌فرض بر اساس بیشترین بازدید در ابتدا
  useEffect(() => {
    const defaultSortedProducts = productData
      .filter((product) => product.category === category) // فقط محصولات مرتبط با دسته‌بندی
      .sort((a, b) => b.views - a.views) // مرتب‌سازی بر اساس بازدید
    setFilteredProducts(defaultSortedProducts)
  }, [category])

  // مدیریت اسکرول برای مخفی و نمایان شدن دکمه فیلتر
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setShowFilterButton(false) // اسکرول به پایین => مخفی کردن دکمه فیلتر
      } else {
        setShowFilterButton(true) // اسکرول به بالا => نمایش دکمه فیلتر
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  // هندلر اعمال فیلترها
  const handleApplyFilters = (filters) => {
    const { priceRange, selectedSize, selectedBrand } = filters

    const filtered = productData.filter((product) => {
      const isWithinPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1] // بررسی بازه قیمتی
      const matchesBrand =
        selectedBrand.length === 0 ||
        selectedBrand.some((brand) => product.brand === brandMap[brand]) // بررسی برند انتخاب‌شده
      const matchesSize =
        selectedSize.length === 0 ||
        product.sizes.some((size) => selectedSize.includes(size.toString())) // بررسی سایز انتخاب‌شده
      const matchesCategory = product.category === category // بررسی دسته‌بندی محصول

      return isWithinPrice && matchesBrand && matchesSize && matchesCategory
    })

    setFilteredProducts(filtered) // بروزرسانی لیست محصولات با فیلترهای جدید
  }

  // هندلر تغییر گزینه مرتب‌سازی
  const handleSortChange = (value) => {
    setSortOption(value)
    const sortedProducts = [...filteredProducts]

    switch (value) {
      case 'price_asc':
        sortedProducts.sort((a, b) => a.price - b.price) // مرتب‌سازی بر اساس ارزان‌ترین
        break
      case 'price_desc':
        sortedProducts.sort((a, b) => b.price - a.price) // مرتب‌سازی بر اساس گران‌ترین
        break
      case 'most_viewed':
        sortedProducts.sort((a, b) => b.views - a.views) // مرتب‌سازی بر اساس پربازدیدترین
        break
      case 'highest_rated':
        sortedProducts.sort((a, b) => b.rating - a.rating) // مرتب‌سازی بر اساس رتبه‌بندی
        break
      default:
        break
    }

    setFilteredProducts(sortedProducts) // بروزرسانی لیست محصولات پس از مرتب‌سازی
  }

  // تغییر حالت نمایش گرید/لیست
  const handleViewModeChange = (mode) => {
    setViewMode(mode)
  }

  // دکمه باز/بسته کردن فیلتر کشویی
  const toggleFilters = () => {
    setFiltersOpen((prev) => !prev)
  }

  return (
    <div className="flex gap-24 p-4 md:px-12 xl:px-24 lg:my-12">
      {/* سایدبار فیلتر */}
      <aside className="hidden lg:block w-1/4">
        <div className="sticky top-24 max-h-[calc(100vh-9rem)] rounded-md overflow-auto">
          <FilterSidebar onApplyFilters={handleApplyFilters} />
        </div>
      </aside>

      {/* محتوای اصلی */}
      <div className="w-full lg:w-3/4 flex flex-col lg:gap-12 gap-4">
        {/* نوار ابزار برای مرتب‌سازی */}
        <Toolbar
          sortOptions={[
            { label: 'ارزان‌ترین', value: 'price_asc' },
            { label: 'گران‌ترین', value: 'price_desc' },
            { label: 'بالاترین امتیاز', value: 'highest_rated' },
          ]}
          selectedSort={sortOption} // گزینه مرتب‌سازی انتخاب‌شده
          onSortChange={handleSortChange} // هندلر تغییر مرتب‌سازی
          viewMode={viewMode} // وضعیت نمایش گرید یا لیست
          onViewModeChange={handleViewModeChange} // هندلر تغییر حالت نمایش
        />

        {/* گرید نمایش محصولات */}
        <div
          className={`${
            viewMode === 'grid'
              ? 'grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 lg:gap-24'
              : 'space-y-8'
          }`}
        >
          {filteredProducts.map((product) => {
            if (viewMode === 'grid') {
              return <ProductCard1 key={product.id} product={product} />
            } else if (viewMode === 'list') {
              return <ProductCard3 key={product.id} product={product} />
            }
          })}
        </div>
      </div>

      {/* دکمه فیلتر برای موبایل */}
      <button
        onClick={toggleFilters}
        className={`fixed bottom-20 lg:hidden flex items-center gap-2 py-2 px-4 rounded-lg bg-accent text-neutral hover:bg-primary transition-transform duration-500 ease-in-out transform ${
          showFilterButton ? 'translate-y-0' : 'translate-y-16'
        } z-30`}
      >
        فیلتر
        <FiFilter />
      </button>

      {/* فیلتر کشویی برای موبایل */}
      <div
        className={`${
          filtersOpen ? 'translate-y-0' : 'translate-y-full'
        } fixed inset-0 lg:hidden transition-transform duration-300 bg-neutral pt-24 max-h-screen pb-16 z-40`}
      >
        <FiX
          size={36}
          onClick={toggleFilters}
          className="bg-dark text-neutral p-1 rounded-md cursor-pointer mb-4 mx-auto"
        />
        <FilterSidebar
          onApplyFilters={handleApplyFilters}
          setFiltersOpen={setFiltersOpen}
        />
      </div>
    </div>
  )
}
