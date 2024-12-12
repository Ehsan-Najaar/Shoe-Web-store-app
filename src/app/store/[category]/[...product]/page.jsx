'use client'

import ProductComment from '@/components/ProductPage/ProductComment'
import ProductDetail from '@/components/ProductPage/ProductDetail'
import RelatedProducts from '@/components/ProductPage/RelatedProducts'
import { usePathname } from 'next/navigation'
import productData from '../../../../../data/productData'

export default function ProductPage() {
  const pathname = usePathname() // مسیر کنونی صفحه
  const productId = parseInt(pathname.split('/').pop()) // استخراج شناسه محصول از آخرین بخش مسیر

  // پیدا کردن محصول بر اساس شناسه
  const selectedProduct = productData.find(
    (product) => product.id === productId // جستجوی محصول بر اساس شناسه
  )

  return (
    <div className="px-4 md:px-12 xl:px-24 pt-12 pb-24 space-y-24">
      {/* نمایش جزئیات محصول */}
      <ProductDetail product={selectedProduct} />

      {/* نمایش نظرات این محصول */}
      <ProductComment />

      {/* نمایش محصولات مرتبط */}
      <RelatedProducts
        products={productData}
        pathname={pathname}
        thisProduct={selectedProduct} // ارسال محصول انتخابی به بخش محصولات مرتبط
      />
    </div>
  )
}
