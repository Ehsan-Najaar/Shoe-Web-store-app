'use client'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

export default function FilterSidebar({ onApplyFilters, setFiltersOpen }) {
  const [priceRange, setPriceRange] = useState([0, 7500000]) // محدوده قیمت
  const [selectedSize, setSelectedSize] = useState([]) // سایزهای انتخابی
  const [selectedBrand, setSelectedBrand] = useState([]) // برندهای انتخابی
  const [selectedYear, setSelectedYear] = useState([]) // سال‌های انتخابی
  const [categoryPathname, setCategoryPathname] = useState('') // مسیر دسته‌بندی
  const pathname = usePathname() // استفاده از مسیر فعلی

  // لیست‌های پیش‌فرض دسته‌بندی‌ها، برندها و سایزها
  const categories = ['همه', 'کفش مردانه', 'کفش زنانه', 'کفش بچگانه']
  const brands = ['نایک', 'آدیداس', 'پوما']
  const sizes = ['38', '39', '40', '41']

  useEffect(() => {
    const category = pathname.split('/').pop() // استخراج دسته‌بندی از مسیر
    setCategoryPathname(category)
  }, [pathname])

  // تغییر محدوده قیمت
  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue)
  }

  // تغییر وضعیت چک‌باکس‌ها برای سایز، برند و سال
  const handleCheckboxChange = useCallback(
    (e, type) => {
      const value = e.target.value
      let updatedSelection = []

      switch (type) {
        case 'size':
          updatedSelection = selectedSize.includes(value)
            ? selectedSize.filter((item) => item !== value)
            : [...selectedSize, value]
          setSelectedSize(updatedSelection)
          break
        case 'brand':
          updatedSelection = selectedBrand.includes(value)
            ? selectedBrand.filter((item) => item !== value)
            : [...selectedBrand, value]
          setSelectedBrand(updatedSelection)
          break
        case 'year':
          updatedSelection = selectedYear.includes(value)
            ? selectedYear.filter((item) => item !== value)
            : [...selectedYear, value]
          setSelectedYear(updatedSelection)
          break
        default:
          break
      }
    },
    [selectedSize, selectedBrand, selectedYear]
  )

  // تابع اعمال فیلترها
  const applyFilters = useCallback(() => {
    onApplyFilters({
      priceRange,
      selectedSize,
      selectedBrand,
      selectedYear,
    })
  }, [onApplyFilters, priceRange, selectedSize, selectedBrand, selectedYear])

  // تابع پاک کردن فیلترها
  const clearFilters = useCallback(() => {
    setPriceRange([0, 7500000])
    setSelectedSize([])
    setSelectedBrand([])
    setSelectedYear([])
    onApplyFilters({
      priceRange: [0, 7500000],
      selectedSize: [],
      selectedBrand: [],
      selectedYear: [],
    })
  }, [onApplyFilters])

  // کامپوننت برای فیلترها (سایز و برند)
  const FilterCheckbox = ({
    label,
    values,
    selectedValues,
    handleChange,
    type,
  }) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">{label}</h3>
      <ul className="space-y-2">
        {values.map((value, index) => (
          <li key={index}>
            <div className="w-max flex items-center gap-2">
              <input
                id={`${type}-checkbox-${value}`}
                type="checkbox"
                value={value}
                checked={selectedValues.includes(value)}
                onChange={(e) => handleChange(e, type)}
                className="checkbox-custom cursor-pointer"
              />
              <label
                htmlFor={`${type}-checkbox-${value}`}
                className="ml-2 text-sm cursor-pointer"
              >
                {value}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="bg-neutral p-6 rounded-lg text-gray-600">
      {/* بخش فیلتر */}
      <div className="space-y-2 mb-8">
        <h2 className="text-xl font-bold pb-2 border-b border-dark">فیلترها</h2>
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => {
              clearFilters(), setFiltersOpen && setFiltersOpen(false)
            }}
            className="py-2 px-4 rounded-lg bg-gray-300 text-gray-500 text-sm w-full sm:w-auto"
          >
            حذف فیلتر
          </button>
          <button
            onClick={() => {
              applyFilters(), setFiltersOpen && setFiltersOpen(false)
            }}
            className="py-2 px-4 rounded-lg bg-primary text-neutral text-sm w-full sm:w-auto"
          >
            اعمال فیلتر
          </button>
        </div>
      </div>

      {/* بخش دسته‌بندی‌ها */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">دسته‌بندی‌ها</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => {
            const categorySlug =
              category === 'کفش مردانه'
                ? 'men'
                : category === 'کفش زنانه'
                ? 'women'
                : category === 'کفش بچگانه'
                ? 'kids'
                : category === 'همه'
                ? ''
                : ''

            const isActive =
              categorySlug === categoryPathname ||
              (category === 'همه' && pathname === '/store')

            return (
              <li key={index}>
                <Link
                  href={`/store/${categorySlug}`}
                  className={`${
                    isActive ? 'bg-gray-300' : ''
                  } w-full flex items-center justify-between text-sm p-2 rounded-lg text-gray-600 hover:bg-gray-300 transition-all duration-300`}
                >
                  {category}
                  <FaArrowLeft
                    size={22}
                    className="border border-gray-400 p-1 rounded-full"
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* فیلتر برندها */}
      <FilterCheckbox
        label="برندها"
        values={brands}
        selectedValues={selectedBrand}
        handleChange={handleCheckboxChange}
        type="brand"
      />

      {/* فیلتر سایزها */}
      <FilterCheckbox
        label="سایزها"
        values={sizes}
        selectedValues={selectedSize}
        handleChange={handleCheckboxChange}
        type="size"
      />

      {/* فیلتر محدوده قیمت */}
      <Box sx={{ width: '95%' }}>
        <h1 className="text-lg font-semibold mb-4">محدوده قیمت</h1>
        <Slider
          className="text-primary"
          track="inverted"
          value={priceRange}
          onChange={(event, newValue) => handleSliderChange(event, newValue)}
          aria-labelledby="track-inverted-range-slider"
          min={0}
          max={7500000}
          step={1000}
        />
        <div className="flex justify-between text-[13px] text-gray-600">
          <span className="font-semibold">
            {priceRange[1].toLocaleString()} تومان
          </span>
          <span className="font-semibold">
            {priceRange[0].toLocaleString()} تومان
          </span>
        </div>
      </Box>
    </div>
  )
}
