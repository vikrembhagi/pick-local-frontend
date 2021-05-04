import { getStrapiMedia } from "../lib/media";
import Image from "next/image";

const StrapiImage = ({ image, width, height }) => {
  const imageUrl = getStrapiMedia(image);

  return (
    <Image
      src={imageUrl}
      alt={image.alternativeText || image.name}
      width={width}
      height={height}
      className="rounded-lg rounded-r-none"
    />
  );
};

export default StrapiImage;
