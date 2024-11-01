/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/img/:path*',
                destination: `${process.env.DOMAIN_MEDIA}/img/:path*`,
            },
        ];
    },
};

export default nextConfig;
