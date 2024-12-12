/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // اگر از دامنه‌های خاص برای تصاویر خارجی استفاده می‌کنید، آن‌ها را اینجا اضافه کنید.
    formats: ['image/avif', 'image/webp'], // فرمت‌های پشتیبانی شده برای تصاویر
  },
}

export default nextConfig
