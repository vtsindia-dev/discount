const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    runtimeCaching,
  },
  i18n,
  images: {
    domains: ['discountitstore.in'],
  },
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/menu": { page: "/menu" },
      "/about": { page: "/about" }
    };
  },

});
