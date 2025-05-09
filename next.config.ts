import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";
// const path = require('path');

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js'
})

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/agua-vida-poc',
};

export default withSerwist(nextConfig);
