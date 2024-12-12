import Link from 'next/link'

const CartLeftSection = ({ formattedSubtotal, cartItems }) => {
  return (
    <div className="lg:w-1/4 h-max bg-neutral rounded-lg p-4 space-y-8">
      <div className="w-full flex flex-col justify-between gap-4 text-dark">
        <span className="font-semibold text-sm text-center text-accent">
          مجموع سبد خرید شما
        </span>
        <span className="text-2xl text-center font-bold">{`${formattedSubtotal} تومان`}</span>
      </div>

      {/* Dynamic product list */}
      <div className="space-y-2">
        {cartItems.map((item) => {
          // Ensure product properties are available
          if (!item.id || !item.name || !item.price) return null

          const quantity = item.quantity || 1
          const price = item.price || 0

          return (
            <div key={item.id} className="flex justify-between items-center">
              <span className="text-sm font-medium">{item.name}</span>
              <span className="text-sm">
                {`${quantity} × ${new Intl.NumberFormat('fa-IR').format(
                  price
                )} تومان`}
              </span>
            </div>
          )
        })}
      </div>

      {/* Static delivery cost */}
      <div className="border-t border-dark pt-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">هزینه ارسال</span>
          <span className="text-sm">
            {new Intl.NumberFormat('fa-IR').format(30000)} تومان
          </span>
        </div>
      </div>

      <Link
        href={'/checkout/delivery'}
        className="block text-center btn-primary"
      >
        ثبت سفارش
      </Link>
    </div>
  )
}

export default CartLeftSection
