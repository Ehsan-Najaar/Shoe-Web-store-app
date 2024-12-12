import { ProductCard1 } from '@/components/productCard'
import Image from 'next/image'
import { useState } from 'react'
import productData from '../../../data/productData'

// لیست برندها
const brands = [
  {
    name: 'Nike',
    logo: '/images/nike.jpg',
  },
  {
    name: 'Puma',
    logo: '/images/puma.jpg',
  },
  {
    name: 'Adidas',
    logo: '/images/adidas.jpg',
  },
]

const BrandTabs = () => {
  // مدیریت برند انتخاب‌شده با useState
  const [selectedBrand, setSelectedBrand] = useState(brands[0].name)

  // فیلتر کردن محصولات بر اساس برند انتخاب‌شده و محدود کردن به 8 محصول
  const filteredProducts = productData
    .filter((product) => product.brand === selectedBrand)
    .slice(0, 8) // فقط 8 محصول

  return (
    <div className="space-y-6">
      <h1 className="title">برندهای پرطرفدار</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* لیست تب‌ها */}
        <ul className="flex lg:flex-col items-center gap-2 text-neutral">
          {brands.map((brand, index) => (
            // eslint-disable-next-line jsx-a11y/role-supports-aria-props
            <button
              key={index} // استفاده از name برای key برای منحصر به فرد بودن
              onClick={() => setSelectedBrand(brand.name)}
              className={`flex flex-col items-center gap-2 px-4 py-2 rounded-lg w-full ${
                selectedBrand === brand.name
                  ? 'bg-primary text-neutral' // تغییر رنگ برند انتخاب‌شده
                  : 'text-dark'
              }`}
              aria-label={brand.name}
              aria-selected={selectedBrand === brand.name} // اضافه کردن aria-selected برای دسترسی بهتر
            >
              <div className="w-12 h-12 lg:w-40 lg:h-40 bg-white items-center justify-center rounded-lg overflow-hidden">
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`} // توضیحات alt برای بهبود دسترسی
                    width={150}
                    height={150}
                    className="object-contain rounded-lg p-2"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Logo</span>
                )}
              </div>
              <p>
                {brand.name === 'Nike'
                  ? 'نایک'
                  : brand.name === 'Adidas'
                  ? 'آدیداس'
                  : brand.name === 'Puma'
                  ? 'پوما'
                  : ''}
              </p>
            </button>
          ))}
        </ul>

        {/* نمایش محصولات فیلتر شده */}
        <div className="w-full bg-primary/30 rounded-lg ">
          {filteredProducts.length > 0 && (
            <div className="grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard1 key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BrandTabs
