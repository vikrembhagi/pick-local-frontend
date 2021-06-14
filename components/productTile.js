import GoodImage from "./goodImage";
import Date from "./date";

export default function ProductTile(singleProductInfo) {
  const selectedGood = singleProductInfo.singleProductInfo;
  return (
    <div className="w-[500px] h-[200px] bg-white p-6 pl-4 flex flex-row items-center shadow-md">
      <div className="flex-none">
        <GoodImage
          category={selectedGood.goodsCategory}
          width="120px"
          height="100px"
        />
      </div>
      <div className="flex flex-col ml-4">
        <div className="text-lg mb-4 font-medium">
          {selectedGood.goodsTitle}
        </div>
        <div className="text-sm mb-4 max-h-[80px] overflow-hidden ">
          {selectedGood.goodsDescription}
        </div>
        <div className=" text-xs">
          <span>Updated: </span>{" "}
          <span className="font-medium">
            <Date dateString={selectedGood.updated_at} />
          </span>
        </div>
      </div>
    </div>
  );
}
