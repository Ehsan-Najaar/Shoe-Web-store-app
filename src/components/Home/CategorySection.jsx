import Image from 'next/image'
import Link from 'next/link'

export default function CategorySection({ products }) {
  // فیلتر کردن محصولات بر اساس id مشخص
  const filteredProducts = products.filter((product) =>
    [2, 12, 24].includes(product.id)
  )

  return (
    <div className="space-y-16">
      <h1 className="title text-center">خرید بر اساس دسته بندی</h1>
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-around">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id} // استفاده از product.id به جای index برای key
            className={`flex flex-col items-center`}
          >
            <figure className="w-32 md:w-full rounded-full overflow-hidden shadow-lg">
              {product.images && product.images[2] && (
                <Image
                  src={product.images[2]}
                  alt={`تصویر محصول ${product.id} - دسته‌بندی ${product.category}`}
                  width={300}
                  height={300}
                  className="object-cover"
                />
              )}
            </figure>
            <Link
              href={`/store/${product.category}`}
              className="bg-primary text-neutral md:text-lg py-2 px-4 rounded-lg shadow-lg -mt-6"
            >
              {/* نمایش نام دسته‌بندی با توجه به نوع جنسیت */}
              {product.category === 'men'
                ? 'مردانه'
                : product.category === 'women'
                ? 'زنانه'
                : product.category === 'kids'
                ? 'بچگانه'
                : ''}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
