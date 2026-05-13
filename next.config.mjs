/** @type {import('next').NextConfig} */
const basePath = process.env.NODE_ENV === "production" ? "/wedding-website" : "";

const nextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
};

export default nextConfig;
