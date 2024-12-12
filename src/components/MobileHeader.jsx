import Drawer from '@/components/Drawer'
import Image from 'next/image'
import Link from 'next/link'

export default function MobileHeader() {
  return (
    <header className="w-full lg:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-secondary z-50 border-b border-dark">
      {/* لوگو سمت چپ */}
      <figure className="flex items-center">
        <Link href={'/'} className="h-12 grid place-items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={90}
            height={90}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>
      </figure>

      {/* مدیریت نمایش دراور */}
      <Drawer />
    </header>
  )
}
