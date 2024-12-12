'use client'

import { ProductCard1, ProductCard3 } from '@/components/productCard'
import FilterSidebar from '@/components/Store/FilterSidebar'
import Toolbar from '@/components/Store/Toolbar'
import { useEffect, useState } from 'react'
import { FiFilter, FiX } from 'react-icons/fi'
import productData from '../../../data/productData'

export default function Store() {
  // مدیریت وضعیت محصولات فیلتر شده
  const [filteredProducts, setFilteredProducts] = useState(productData)
  // مدیریت گزینه مرتب‌سازی انتخاب‌شده
  const [sortOption, setSortOption] = useState('most_viewed')
  // وضعیت نمایش گرید یا لیست
  const [viewMode, setViewMode] = useState('grid') // مقدار پیش‌فرض گرید

  // وضعیت باز/بسته شدن فیلتر کشویی
  const [filtersOpen, setFiltersOpen] = useState(false)

  // مدیریت وضعیت نمایش دکمه فیلتر هنگام اسکرول
  const [showFilterButton, setShowFilterButton] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // مپ برای تبدیل برندهای فارسی به انگلیسی
  const brandMap = {
    نایک: 'Nike',
    آدیداس: 'Adidas',
    پوما: 'Puma',
  }

  // مرتب‌سازی اولیه بر اساس بازدید
  useEffect(() => {
    const sortedProducts = [...productData].sort((a, b) => b.views - a.views)
    setFilteredProducts(sortedProducts)
  }, [])

  // مدیریت اسکرول برای مخفی و ظاهر شدن دکمه فیلتر
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // اگر اسکرول به پایین بود دکمه فیلتر را مخفی کن
      if (currentScrollY > lastScrollY) {
        setShowFilterButton(false)
      } else {
        setShowFilterButton(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  // اعمال فیلترها
  const handleApplyFilters = (filters) => {
    const { priceRange, selectedSize, selectedBrand } = filters

    const filtered = productData.filter((product) => {
      const isWithinPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1] // بررسی بازه قیمت
      const matchesBrand =
        selectedBrand.length === 0 ||
        selectedBrand.some((brand) => product.brand === brandMap[brand]) // بررسی برند
      const matchesSize =
        selectedSize.length === 0 ||
        product.sizes.some((size) => selectedSize.includes(size.toString())) // بررسی سایز

      return isWithinPrice && matchesBrand && matchesSize
    })

    setFilteredProducts(filtered)
    setSortOption('most_viewed') // بازنشانی مرتب‌سازی به پیش‌فرض
  }

  // تغییر مرتب‌سازی
  const handleSortChange = (value) => {
    setSortOption(value)
    const sortedProducts = [...filteredProducts]

    switch (value) {
      case 'price_asc':
        sortedProducts.sort((a, b) => a.price - b.price) // مرتب‌سازی بر اساس قیمت صعودی
        break
      case 'price_desc':
        sortedProducts.sort((a, b) => b.price - a.price) // مرتب‌سازی بر اساس قیمت نزولی
        break
      case 'most_viewed':
        sortedProducts.sort((a, b) => b.views - a.views) // مرتب‌سازی بر اساس بازدید
        break
      case 'highest_rated':
        sortedProducts.sort((a, b) => b.rating - a.rating) // مرتب‌سازی بر اساس امتیاز
        break
      default:
        break
    }

    setFilteredProducts(sortedProducts)
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
      {/* سایدبار (فیلترها) */}
      <aside className="hidden lg:block lg:w-1/4">
        <div className="scrollbar-custom sticky top-24 max-h-[calc(100vh-9rem)] rounded-md overflow-auto">
          <FilterSidebar onApplyFilters={handleApplyFilters} />
        </div>
      </aside>

      {/* محتوای اصلی */}
      <div className="w-full lg:w-3/4 md:mx-auto flex flex-col lg:gap-12 gap-4">
        {/* نوار ابزار مرتب‌سازی */}
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

        {/* گرید یا لیست محصولات */}
        <div
          className={`${
            viewMode === 'grid'
              ? 'grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 lg:gap-24'
              : 'space-y-8'
          }`}
          style={{ margin: 0 }}
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

      {/* دکمه فیلتر با حالت مخفی و نمایان شدن با انیمیشن */}
      <button
        onClick={toggleFilters}
        className={`fixed bottom-20 lg:hidden flex items-center gap-2 py-2 px-4 rounded-lg bg-accent text-neutral hover:bg-primary transition-transform duration-500 ease-in-out transform ${
          showFilterButton ? 'translate-y-0' : 'translate-y-16'
        } z-30`}
      >
        فیلتر
        <FiFilter />
      </button>

      {/* فیلتر کشویی */}
      <div
        className={`${
          filtersOpen ? 'translate-y-0' : 'translate-y-full'
        } fixed inset-0 lg:hidden transition-transform duration-300 bg-neutral pt-24 max-h-screen lg:h-full overflow-auto lg:ovefloe pb-16 lg:pb-6 z-40`}
      >
        <FiX
          size={36}
          onClick={() => {
            setFiltersOpen(!filtersOpen)
          }}
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
