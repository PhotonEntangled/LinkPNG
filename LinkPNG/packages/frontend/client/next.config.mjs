/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-map-gl'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig 