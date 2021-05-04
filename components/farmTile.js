import StrapiImage from "./image";
import GoodImage from "./goodImage";

export default function FarmTile({ farmInfo }) {
  return (
    <div className="w-[500px] flex-1 flex items-center border border-gray-100 bg-white mb-8 shadow-sm rounded-lg ">
      <div className="flex">
        <StrapiImage
          image={farmInfo.profile_photo}
          width="150px"
          height="150px"
        />
      </div>
      <div className="ml-4 flex flex-col justify-center">
        <div className="text-lg font-medium">{farmInfo.name}</div>
        <div className="text-xs">{farmInfo.address}</div>
        <div className="flex mt-4">
          {farmInfo.goods_inventory_ids.map((good, key) => (
            <div
              key={key}
              className="flex flex-col justify-center items-center mr-6"
            >
              <div>
                <GoodImage
                  category={good.goodsCategory}
                  width="48px"
                  height="32px"
                />
              </div>

              <div className="text-sm font-medium">{good.goodsCategory}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
