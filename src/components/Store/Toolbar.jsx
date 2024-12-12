import { useState } from 'react'
import { FaChevronDown, FaList, FaSortAmountDown, FaTh } from 'react-icons/fa'

const Toolbar = ({
  sortOptions, // گزینه‌های مرتب‌سازی
  selectedSort, // گزینه مرتب‌سازی انتخاب شده
  onSortChange, // تابعی برای تغییر مرتب‌سازی
  viewMode, // حالت نمایشی (گرید یا لیست)
  onViewModeChange, // تابعی برای تغییر حالت نمایش
}) => {
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false) // وضعیت باز بودن منوی مرتب‌سازی

  // تابعی برای باز و بسته کردن منوی مرتب‌سازی
  const toggleSortMenu = () => {
    setIsSortMenuOpen((prev) => !prev)
  }

  // تنظیم حالت پیش‌فرض مرتب‌سازی بر اساس گزینه انتخاب شده یا اولین گزینه موجود
  const defaultSort = selectedSort || sortOptions[0].value

  return (
    <div className="flex items-center justify-between bg-neutral px-4 py-2 rounded-md shadow text-right z-30">
      {/* بخش گزینه‌های مرتب‌سازی */}
      <div className="flex items-center gap-4">
        {/* برچسب مرتب‌سازی در حالت دسکتاپ */}
        <label className="hidden sm:flex items-center gap-2 text-dark">
          <FaSortAmountDown className="w-4 lg:w-6 h-4 lg:h-6" />
          <span className="text-sm">مرتب‌سازی:</span>
        </label>

        {/* دکمه‌های مرتب‌سازی در حالت موبایل */}
        <div className="sm:hidden relative">
          <button
            onClick={toggleSortMenu} // باز یا بسته کردن منوی مرتب‌سازی
            className="flex items-center gap-2 px-3 py-1 text-sm rounded transition-all bg-gray-200 text-gray-500 hover:bg-gray-300"
          >
            مرتب‌سازی
            {/* آیکون فلش به پایین */}
            <FaChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {isSortMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-md rounded-md">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value) // اعمال تغییر مرتب‌سازی
                    setIsSortMenuOpen(false) // بسته کردن منو بعد از انتخاب
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    defaultSort === option.value
                      ? 'bg-primary text-neutral' // اگر این گزینه انتخاب شده باشد
                      : 'bg-white text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* دکمه‌های مرتب‌سازی در حالت دسکتاپ */}
        <div className="hidden sm:flex items-center gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value)} // تغییر مرتب‌سازی
              className={`px-3 py-1 text-sm rounded transition-all ${
                defaultSort === option.value
                  ? 'bg-primary text-neutral' // اگر این گزینه انتخاب شده باشد
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* بخش گزینه‌های نمایش (لیست یا گرید) */}
      <div className="flex items-center gap-2">
        {/* دکمه تغییر به گرید */}
        <button
          onClick={() => onViewModeChange('grid')} // تغییر به حالت گرید
          className={`p-2 rounded transition-all ${
            viewMode === 'grid'
              ? 'bg-primary text-neutral' // اگر حالت گرید انتخاب شده باشد
              : 'bg-background text-dark'
          }`}
          aria-label="مشاهده به صورت گرید"
        >
          <FaTh />
        </button>
        {/* دکمه تغییر به لیست */}
        <button
          onClick={() => onViewModeChange('list')} // تغییر به حالت لیست
          className={`p-2 rounded transition-all ${
            viewMode === 'list'
              ? 'bg-primary text-neutral' // اگر حالت لیست انتخاب شده باشد
              : 'bg-background text-dark'
          }`}
          aria-label="مشاهده به صورت لیست"
        >
          <FaList className="scale-x-[-1]" />{' '}
          {/* معکوس کردن جهت آیکون برای حالت لیست */}
        </button>
      </div>
    </div>
  )
}

export default Toolbar
