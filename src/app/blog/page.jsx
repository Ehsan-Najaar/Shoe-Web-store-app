import Image from 'next/image'
import { FiMessageCircle } from 'react-icons/fi'

export default function Blog() {
  const blogs = [
    {
      id: 2,
      title: 'چگونه کفش مناسب برای پیاده‌روی انتخاب کنیم',
      category: 'کفش‌های پیاده‌روی',
      description:
        'در این مقاله نکاتی برای انتخاب کفش مناسب برای پیاده‌روی آورده شده است. انتخاب صحیح کفش می‌تواند به جلوگیری از درد و آسیب‌های پا کمک کند.',
      image: '/images/jpg(8).jpg', // عکس خالی
      link: '#',
      comments: 18,
      date: '2024-11-22',
    },
    {
      id: 4,
      title: 'کفش‌های ورزشی و تاثیر آن‌ها بر عملکرد ورزشکاران',
      category: 'کفش‌های ورزشی',
      description:
        'کفش‌های ورزشی درست می‌توانند تأثیر زیادی بر عملکرد ورزشکاران داشته باشند. این مقاله به بررسی تاثیر کفش‌های مختلف بر عملکرد ورزشی می‌پردازد.',
      image: '/images/jpg(10).jpg', // عکس خالی
      link: '#',
      comments: 12,
      date: '2024-11-18',
    },
    {
      id: 5,
      title: 'چگونه کفش‌های خود را برای مدت طولانی‌تری نگهداری کنیم',
      category: 'کفش‌های مراقبتی',
      description:
        'مراقبت صحیح از کفش‌ها می‌تواند عمر آن‌ها را افزایش دهد. در این مقاله راهکارهایی برای نگهداری کفش‌های خود ارائه می‌دهیم.',
      image: '/images/jpg(11).jpg', // عکس خالی
      link: '#',
      comments: 8,
      date: '2024-11-15',
    },
    {
      id: 1,
      title: 'بهترین کفش‌های ورزشی برای دویدن در سال 2024',
      category: 'کفش‌های ورزشی',
      description:
        'این مقاله بهترین کفش‌های ورزشی برای دویدن در سال 2024 را معرفی می‌کند. اگر به دنبال کفشی راحت و مناسب برای دویدن هستید، این مطلب برای شماست.',
      image: '/images/jpg(7).jpg', // عکس خالی
      link: '#',
      comments: 23,
      date: '2024-11-25',
    },
  ]

  const recentPosts = [
    {
      id: 1,
      image: '/images/jpg(7).jpg',
      title: '5 نکته برای انتخاب کفش مناسب برای دویدن',
      comments: 8,
      date: '2024-02-20',
    },
    {
      id: 2,
      image: '/images/jpg(8).jpg',
      title: 'کفش‌های ورزشی جدید برای سال 2024',
      comments: 15,
      date: '2024-03-10',
    },
    {
      id: 3,
      image: '/images/jpg(9).jpg',
      title: 'چگونه کفش مناسب برای کار انتخاب کنیم',
      comments: 6,
      date: '2024-01-30',
    },
    {
      id: 4,
      image: '/images/jpg(10).jpg',
      title: 'مقایسه انواع کفش‌های پیاده‌روی',
      comments: 10,
      date: '2024-02-05',
    },
    {
      id: 5,
      image: '/images/jpg(11).jpg',
      title: 'کفش‌های ارزان‌قیمت و کیفیت آن‌ها',
      comments: 5,
      date: '2024-02-25',
    },
  ]

  const categories = [
    'کفش‌های ورزشی',
    'کفش‌های چرمی',
    'کفش‌های پیاده‌روی',
    'کفش‌های مراقبتی',
    'کفش‌های روزمره',
  ]

  return (
    <div className="flex items-start justify-between my-12 px-4 lg:px-24">
      {/* بلاگ‌ها */}
      <div className="w-full lg:w-2/3">
        <div className="space-y-12">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="lg:w-[95%] h-max relative flex flex-col text-center lg:text-right lg:flex-row rounded-xl bg-neutral text-gray-700 pt-4 lg:pt-0 shadow-md overflow-hidden"
            >
              <div className="w-40 lg:w-1/5 relative mx-auto overflow-hidden lg:rounded-l-none rounded-xl shrink-0">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover object-center"
                  width={500}
                  height={300}
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <h6 className="block mb-4 font-sans text-base font-semibold uppercase text-gray-700">
                  {blog.category}
                </h6>
                <h4 className="block mb-2 font-sans text-2xl font-semibold text-blue-gray-900">
                  {blog.title}
                </h4>
                <p className="block mb-8 font-sans text-base text-gray-700">
                  {blog.description}
                </p>
                <div className="w-full flex items-center gap-3 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <FiMessageCircle size={20} className="mb-1" />
                    <span>{blog.comments} نظر</span>
                  </p>
                  | <span>{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* پست‌های اخیر */}
      <div className="hidden lg:block w-1/3">
        <div className="bg-neutral border rounded-xl p-4">
          <h2 className="text-2xl font-bold mb-6">پست‌های اخیر</h2>
          <ul className="list-disc list-inside">
            {recentPosts.map((post) => (
              <li
                key={post.id}
                className="flex gap-4 mb-6 text-gray-700 border-t border-gray-300 py-4"
              >
                <Image
                  src={post.image}
                  alt=""
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
                <div className="w-full flex flex-col justify-between">
                  <h4 className="text-md font-semibold">{post.title}</h4>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <span>{post.comments} نظر</span>/<span>{post.date}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* دسته‌بندی‌ها */}
        <div className="bg-neutral border rounded-xl p-4 my-12">
          <h2 className="text-2xl font-bold pb-4 border-b border-gray-300">
            دسته‌بندی‌ها
          </h2>
          <ul className="flex flex-col gap-4 pt-4">
            {categories.map((category, index) => (
              <li
                key={index}
                className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-400 cursor-pointer transition-all duration-300"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
