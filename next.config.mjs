export default {
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("node-pg-migrate", "pg");
    }
    return config;
  },
};
