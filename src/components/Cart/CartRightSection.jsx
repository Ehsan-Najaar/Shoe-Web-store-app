import { ProductCard4 } from '@/components/productCard'
import { HiOutlineShoppingBag } from 'react-icons/hi'

export default function CartRightSection({
  cartItems,
  totalQuantity,
  handleRemove,
  handleUpdateQuantity,
}) {
  return (
    <section className="lg:w-3/4 rounded-lg space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2 text-dark">
          <h1 className="text-2xl font-bold">سبد خرید</h1>
          <p>
            <span className="font-semibold">{totalQuantity} محصول </span>
            <span>در سبد خرید شما</span>
          </p>
        </div>
        <HiOutlineShoppingBag size={72} className="text-dark" />
      </div>

      <div className="space-y-4">
        {/* جدول عناوین محصولات */}
        <ul className="hidden lg:flex items-center justify-between rounded-lg p-2 bg-neutral">
          <li className="pr-4">محصول</li>
          <div className="w-1/2 flex items-center justify-between pl-20 pr-6">
            <li>قیمت</li>
            <li className="pr-4">تعداد</li>
            <li>مجموع قیمت</li>
          </div>
        </ul>

        {/* نمایش لیست محصولات */}
        <div className="max-h-[450px] rounded-lg overflow-auto px-2">
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <ProductCard4
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
