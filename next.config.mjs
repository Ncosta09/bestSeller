/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.licdn.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'eloquent-javascript-es.vercel.app',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'upload.wikimedia.org',
            pathname: '**',
          }
        ],
      },
};

export default nextConfig;
