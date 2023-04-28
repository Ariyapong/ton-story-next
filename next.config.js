module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    reactStrictMode: true,
    webpack(config) {
      config.plugins.push(
        require("unplugin-icons/webpack")({
          compiler: "jsx",
          jsx: "react",
        })
      );

      return config;
    },
  };
  console.log("check next config : ", nextConfig);
  return nextConfig;
};
