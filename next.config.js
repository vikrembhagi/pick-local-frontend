module.exports = {
  /* config options here */
  images: {
    domains: ["www.develop-sr3snxi-k2njt3x4d4c26.ca-1.platformsh.site"],
  },
  env: {
    DB_HOST: process.env.DEV_DB_HOST,
    DB_ADMIN_IDENTIFIER: process.env.DB_ADMIN_IDENTIFIER,
    DB_ADMIN_PASS: process.env.DB_ADMIN_PASS,
    DB_DEV_ADMIN_JWT: process.env.ADMIN_JWT,
  },
};
