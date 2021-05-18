import { getStrapiMedia } from "../lib/media";
import Image from "next/image";

const StrapiImage = ({ image, width, height, styling }) => {
  console.log("In strapi Media");
  console.log(image);
  const imageUrl = getStrapiMedia(image[0]);
  console.log(imageUrl);

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
