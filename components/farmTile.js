import StrapiImage from "./image";
import GoodImage from "./goodImage";

export default function FarmTile({ farmInfo }) {
  return (
    <div className="w-[500px] flex-1 flex items-center bg-white mb-8 shadow-sm rounded-lg hover:shadow-lg hover:cursor-pointer p-4 ">
      <div className="flex">
        <StrapiImage
          image={farmInfo.profile_photo}
          width="120px"
          height="120px"
          styling="rounded-[50%] "
        />
      </div>
      <div className="ml-6 mr-4 flex flex-col justify-center">
        <div className="text-lg font-medium">{farmInfo.name}</div>
        <div className="text-xs">{farmInfo.address}</div>
        <div className="text-xs mt-4 text-green-800 font-medium">
          Availaible
        </div>
        <div className="flex mt-2">
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
