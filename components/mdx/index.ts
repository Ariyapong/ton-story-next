import type { MDXRemoteProps } from "next-mdx-remote/rsc";

import { ZoomableImage } from "./zoomable-image";

export const mdxComponents: MDXRemoteProps["components"] = {
  img: ZoomableImage,
};
