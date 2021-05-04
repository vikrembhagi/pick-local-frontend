import Image from "next/image";

export default function GoodImage({ category, width, height }) {
  const imageURL = "/GoodsImages/" + category + ".jpg";

  return (
    <div>
      <Image
        src={imageURL}
        alt={category}
        width={width}
        height={height}
        className="rounded-lg rounded-r-none"
      />
    </div>
  );
}
