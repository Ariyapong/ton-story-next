"use client";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

type Props = Readonly<React.ImgHTMLAttributes<HTMLImageElement>>;

export function ZoomableImage({ alt = "", ...rest }: Props) {
  return (
    <Zoom wrapElement="span">
      <img alt={alt} {...rest} />
    </Zoom>
  );
}
