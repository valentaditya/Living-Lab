const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // Mengizinkan semua path di domain ini
      },
    ],
  },
};

module.exports = nextConfig;