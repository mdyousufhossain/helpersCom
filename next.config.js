/** @type {import('next').NextConfig} */
// sometimes something cant be done right 
const nextConfig = {
  experimental: {
    serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackages: ['mongose']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      },
      {
        protocol: 'http',
        hostname: '*'
      }
    ]
  }
}

module.exports = nextConfig
