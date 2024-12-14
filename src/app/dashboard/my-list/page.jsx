'use client'

import DashboardMenu from '@/components/DashboardMenu'
import { ProductCard2 } from '@/components/productCard'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import productData from '../../../../data/productData'

export default function MyList() {
  const [likedProducts, setLikedProducts] = useState([])
  const [loading, setLoading] = useState(true) // وضعیت بارگذاری

  // Load liked products from localStorage and match with productData
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProductIds =
        JSON.parse(localStorage.getItem('likedProducts')) || []
      const matchedProducts = productData.filter((product) =>
        savedProductIds.includes(product.id)
      )
      setLikedProducts(matchedProducts)
      setLoading(false) // به محض اتمام بارگذاری داده‌ها، وضعیت بارگذاری به false تغییر می‌کند
    }
  }, [])

  // Remove a product from liked products
  const removeProduct = (id) => {
    const updatedProducts = likedProducts.filter((product) => product.id !== id)
    setLikedProducts(updatedProducts)

    const updatedProductIds = updatedProducts.map((product) => product.id)
    localStorage.setItem('likedProducts', JSON.stringify(updatedProductIds))
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-6 px-4 md:px-12 lg:px-16 xl:px-24 py-4 md:py-6 lg:py-10 xl:py-12">
      {/* هدر موبایل */}
      <div className="lg:hidden flex items-center justify-between bg-neutral rounded-lg shadow-lg shadow-gray-700  p-2">
        <h2 className="text-xl font-bold">لیست من</h2>
        <Link href="/dashboard">
          <FiChevronLeft size={40} className="cursor-pointer" />
        </Link>
      </div>

      {/* Sidebar Menu */}
      <div className="lg:w-1/4 hidden lg:block">
        <DashboardMenu activeIndex={2} />
      </div>

      {/* left Section */}
      <div className="lg:w-3/4 max-h-[536px] bg-neutral shadow-lg shadow-gray-700 rounded-3xl px-4 lg:p-4 overflow-auto">
        {loading ? (
          <p className="min-h-full grid place-items-center text-gray-600">
            در حال بارگذاری...
          </p>
        ) : likedProducts.length > 0 ? (
          <ul className="grid place-items-center grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-12">
            {likedProducts.map((product) => (
              <ProductCard2
                key={product.id}
                product={product}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </ul>
        ) : (
          <p className="min-h-full grid place-items-center text-gray-600">
            هیچ محصولی ذخیره نشده است.
          </p>
        )}
      </div>
    </div>
  )
}
