import Image from 'next/image'
import Link from 'next/link'
import {
  FaDiscord,
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaTwitter,
} from 'react-icons/fa'

const Footer = () => {
  // لینک‌های مختلف در دسته‌های مختلف
  const links = [
    {
      category: 'منابع',
      items: [
        { name: 'فلوبایت', href: '#' },
        { name: 'تیلویند', href: '#' },
      ],
    },
    {
      category: 'دنبال کنید',
      items: [
        { name: 'گیت‌هاب', href: '#' },
        { name: 'دیسکورد', href: '#' },
      ],
    },
    {
      category: 'قانونی',
      items: [
        { name: 'سیاست حفظ حریم خصوصی', href: '#' },
        { name: 'شرایط و ضوابط', href: '#' },
      ],
    },
  ]

  // لینک‌های شبکه‌های اجتماعی
  const socialLinks = [
    { platform: 'Facebook', icon: <FaFacebook />, href: '#' },
    { platform: 'Discord', icon: <FaDiscord />, href: '#' },
    { platform: 'Twitter', icon: <FaTwitter />, href: '#' },
    { platform: 'GitHub', icon: <FaGithub />, href: '#' },
    { platform: 'Dribbble', icon: <FaDribbble />, href: '#' },
  ]

  return (
    <footer className="bg-dark -mb-[88px] rounded-t-3xl">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          {/* بخش لوگو */}
          <div className="mb-6 md:mb-0">
            <Link
              href="/"
              className="flex items-center bg-white p-2 rounded-full"
            >
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={190}
                height={190}
                className="me-3"
              />
            </Link>
          </div>

          {/* بخش لینک‌های مختلف */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {links.map((linkCategory) => (
              <div key={linkCategory.category}>
                <h2 className="mb-6 text-neutral text-lg font-semibold">
                  {linkCategory.category}
                </h2>
                <ul className="text-neutral font-medium">
                  {linkCategory.items.map((item) => (
                    <li key={item.name} className="mb-4">
                      <Link href={item.href} className="hover:underline">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* خط جدا کننده */}
        <hr className="my-6 lg:my-8" />

        {/* بخش کپی‌رایت و شبکه‌های اجتماعی */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-neutral sm:text-center">
            © 2024{' '}
            <Link href="#" className="hover:underline">
              کفشانه
            </Link>{' '}
            تمام حقوق محفوظ است.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            {socialLinks.map((social) => (
              <Link
                href={social.href}
                key={social.platform}
                className="text-neutral ms-5"
              >
                {social.icon}
                {/* توضیح دسترسی برای خوانندگان صفحه */}
                <span className="sr-only">{social.platform} page</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
