/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['media.leprechaun.loc'],
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/api/:path*',
    //             destination: 'http://api.leprechaun.loc/api/:path*',
    //         },
    //     ];
    // },
};

module.exports = nextConfig;
