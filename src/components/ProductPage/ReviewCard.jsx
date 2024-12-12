import { FiThumbsDown, FiThumbsUp, FiUser } from 'react-icons/fi'

// کامپوننت کارت نظرات
const ReviewCard = ({ name, review, date }) => (
  <div className="flex items-start gap-4 p-4 bg-neutral rounded-lg">
    {/* آواتار کاربر */}
    <div className="w-12 h-12 grid place-items-center rounded-full bg-gray-300">
      <FiUser size={24} className="text-gray-600" />
    </div>

    <div className="flex-grow">
      {/* بخش نام کاربر و دکمه‌های لایک/دیسلایک */}
      <div className="flex justify-between items-center mb-2">
        {/* نمایش نام کاربر */}
        <span className="font-semibold text-gray-900">{name}</span>
        <div className="flex items-center gap-6 text-gray-500">
          {/* دکمه لایک */}
          <button className="flex flex-col items-center hover:text-primary">
            <FiThumbsUp size={18} />
            <span className="ml-1">موافق</span>
          </button>
          {/* دکمه دیسلایک */}
          <button className="flex flex-col items-center hover:text-primary">
            <FiThumbsDown size={18} />
            <span className="ml-1">مخالف</span>
          </button>
        </div>
      </div>

      {/* نمایش متن نظر */}
      <p className="text-gray-700 mb-2">{review}</p>

      {/* تاریخ ارسال نظر */}
      <span className="text-sm text-gray-500">{date}</span>
    </div>
  </div>
)

export default ReviewCard
