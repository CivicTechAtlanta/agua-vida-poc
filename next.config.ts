import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  maximumFileSizeToCacheInBytes: 5 * 1024 ** 2 //TODO: massively reduce image sizes so this isn't necessary
})

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/agua-vida-poc',
};

export default withSerwist(nextConfig);
