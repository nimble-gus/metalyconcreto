/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.t3.storageapi.dev', pathname: '/**' },
      { protocol: 'https', hostname: 't3.storageapi.dev', pathname: '/**' },
      { protocol: 'https', hostname: '*.t3.storage.dev', pathname: '/**' },
      { protocol: 'https', hostname: 'storage.railway.app', pathname: '/**' },
      { protocol: 'https', hostname: '*.storage.railway.app', pathname: '/**' },
    ],
  },
}

module.exports = nextConfig



