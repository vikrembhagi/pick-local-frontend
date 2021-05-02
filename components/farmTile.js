import StrapiImage from "./image";

export default function FarmTile({ farmInfo }) {
  return (
    <div className="w-[500px] flex-1 flex items-center border border-gray-100 bg-white mb-4 shadow-sm rounded-lg ">
      <div className="flex m-4">
        <StrapiImage
          image={farmInfo.profile_photo}
          width="100px"
          height="100px"
        />
      </div>
      <div className="ml-2 flex flex-col justify-center">
        <div className="text-lg font-medium">{farmInfo.name}</div>
        <div className="text-xs">{farmInfo.address}</div>
      </div>
    </div>
  );
}
