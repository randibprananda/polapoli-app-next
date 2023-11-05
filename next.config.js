const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  publicRuntimeConfig: {
    maps_key: process.env.NEXT_PUBLIC_MAPS_KEY,
    gtag_key: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    base_url: process.env.NEXT_PUBLIC_BASE_URL,
    client_url: process.env.NEXT_PUBLIC_CLIENT_URL,
    base_url_image: process.env.NEXT_PUBLIC_BASE_URL_IMAGE,
    base_url_image_cms: process.env.NEXT_PUBLIC_BASE_URL_IMAGE_CMS
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    api_backend_host: process.env.NEXT_PUBLIC_API_HOST,
    api_xendit: process.env.NEXT_PUBLIC_API_XENDIT,
    username_xendit: process.env.NEXT_PUBLIC_USERNAME_XENDIT,
    api_cms: process.env.NEXT_PUBLIC_API_CMS
  },
  images: {
    domains: [
      process.env.NEXT_PUBLIC_BASE_URL_IMAGE,
      process.env.NEXT_PUBLIC_BASE_URL_IMAGE_CMS,
      'pola-poli.konsulinaja.id',
      'pola-poli-cms.konsulinaja.id',
      'cdn0-production-images-kly.akamaized.net',
      'upload.wikimedia.org',
      'img.inews.co.id',
      'localhost',
      'imgsrv2.voi.id',
      'akcdn.detik.net.id',
      'polapoli-cms.madjou.com'
    ]
  }
};

module.exports = nextConfig;
