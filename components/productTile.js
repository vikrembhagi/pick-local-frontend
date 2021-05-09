import GoodImage from "./goodImage";
import Date from "./date";

export default function ProductTile(singleProductInfo) {
  const selectedGood = singleProductInfo.singleProductInfo;
  console.log(selectedGood.goodsTitle);
  return (
    <div className="w-[400px] h-[200px] bg-white mb-6 mr-6 p-6 pl-4 flex flex-row items-center rounded-lg">
      <div className=" flex-none">
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
        <div className="text-sm mb-4 max-h-[100px] overflow-auto ">
          {selectedGood.goodsDescription}
        </div>
        <div className=" text-xs">
          <span>Updated: </span>{" "}
          <span className="font-medium">
            <Date dateString={selectedGood.lastUpdated} />
          </span>
        </div>
      </div>
    </div>
  );
}
