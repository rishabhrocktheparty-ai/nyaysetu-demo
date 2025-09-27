"use strict";
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["nyay-setu-bucket.s3.amazonaws.com"],
    },
    experimental: {
        appDir: false
    }
};
module.exports = nextConfig;
