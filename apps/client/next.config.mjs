const { IS_DEV } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: IS_DEV ? 'http' : 'https',
                hostname: 'localhost',
            },
        ],
    },
};

export default nextConfig;
