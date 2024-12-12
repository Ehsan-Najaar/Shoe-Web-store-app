import { FiMessageSquare, FiX } from 'react-icons/fi'

// فرم ارسال نظر
const ReviewForm = ({ onClose }) => (
  <div
    className="fixed inset-0 flex flex-col justify-center items-center gap-12 z-50"
    onClick={onClose} // زمانی که روی پس‌زمینه کلیک شد، فرم بسته می‌شود
  >
    <div
      className="lg:w-1/2 w-4/5 p-6 bg-neutral rounded-lg space-y-4 max-w-lg mx-auto"
      onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن فرم هنگام کلیک داخل فرم
    >
      <div className="flex items-center justify-between">
        {/* عنوان فرم و آیکون ارسال نظر */}
        <h3 className="text-xl font-semibold">اضافه کردن نظر</h3>
        <FiMessageSquare size={20} />
      </div>

      {/* فرم نظر */}
      <form className="space-y-4">
        <div className="mb-4">
          {/* فیلد نظر */}
          <textarea
            id="review"
            className="w-full bg-neutral h-60 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border focus:border-secondary"
            placeholder="نظر خود را بنویسید..."
            rows="4"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          {/* چک‌باکس برای ارسال به عنوان کاربر ناشناس */}
          <input type="checkbox" id="saveInfo" className="checkbox-custom" />
          <label htmlFor="saveInfo" className="text-gray-500">
            ثبت به عنوان کاربر ناشناس
          </label>
        </div>

        {/* دکمه ارسال نظر */}
        <button
          type="submit"
          className="w-full bg-primary text-neutral py-2 px-4 rounded-full"
        >
          ارسال
        </button>
      </form>
    </div>

    {/* دکمه بستن فرم */}
    <button className="bg-neutral p-2 rounded-full" onClick={onClose}>
      <FiX size={24} />
    </button>
  </div>
)

export default ReviewForm
