import { getStrapiMedia } from "../lib/media";
import Image from "next/image";

const StrapiImage = ({ image, width, height, styling }) => {
  const imageUrl = getStrapiMedia(image);
  return (
    <Image
      src={imageUrl}
      alt={image.alternativeText || image.name}
      width={width}
      height={height}
      className={styling}
    />
  );
};

export default StrapiImage;
