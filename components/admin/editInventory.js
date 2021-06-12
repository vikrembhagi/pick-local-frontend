import { useState, useEffect } from "react";
import GoodImage from "../goodImage";
import Date from "../date";
import { inventory_statusList } from "../../lib/utils";
import StrapiImage from "../image";

export default function EditInventoryItem(props) {
  console.log(props);

  const [goodsTitle, setGoodsTitle] = useState("");
  const [goodsDescription, setGoodsDescription] = useState("");

  function checkActiveStatus(stat) {
    if (stat == props.selectedItem[0].status) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="w-[500px] bg-gray-100 flex flex-col my-4 mb-8">
      <div className="flex flex-row gap-4 justify-end pr-4">
        <div className="p-2 text-gray-400 font-medium hover:text-gray-600 cursor-pointer">
          Delete
        </div>
        <div
          onClick={() => props.toggleEditMode()}
          className="p-2 text-gray-400 font-medium hover:text-gray-600 cursor-pointer"
        >
          Cancel
        </div>

        <div className="p-2 text-gray-400 font-medium hover:text-yellow-600 cursor-pointer">
          Save
        </div>
      </div>
      <div className="bg-white flex flex-col p-6 gap-4">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="text-2xl py-2">Edit information</div>
            <div className="ml-auto">
              <GoodImage
                category={props.selectedItem[0].goodsCategory}
                width="80px"
                height="60px"
              />
            </div>
          </div>
          <div className="text-xs">
            Updated: <Date dateString={props.selectedItem[0].updated_at} />
          </div>
        </div>

        <div className="flex pt-2 flex-col gap-2">
          <div className="text-sm font-medium text-gray-600">Image</div>
          {props.selectedItem[0].goodsPhotos ? (
            <div className="w-[120px]">
              <StrapiImage
                image={props.selectedItem[0].goodsPhotos}
                width="120px"
                height="100px"
                styling=""
              />
            </div>
          ) : (
            <div className="w-[120px] h-[100px] bg-gray-300 flex justify-center items-center text-sm font-medium ">
              {" "}
              No Image
            </div>
          )}
        </div>
        <div className="flex pt-2 flex-col gap-2">
          <div className="text-sm font-medium text-gray-600">Status</div>
          <div className="flex pt-2 flex-row gap-4">
            <div className="pr-2">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="InStock"
                  checked={checkActiveStatus("InStock")}
                  className="mr-2 text-yellow-600"
                />
                In Stock
              </label>
            </div>
            <div className="pr-2">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="ComingSoon"
                  checked={checkActiveStatus("ComingSoon")}
                  className="mr-2 text-yellow-600"
                />
                Coming Soon
              </label>
            </div>
            <div className="pr-2">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="DoneForTheSeason"
                  checked={checkActiveStatus("DoneForTheSeason")}
                  className="mr-2 text-yellow-600"
                />
                Done for the season
              </label>
            </div>
          </div>
        </div>
        <div className="flex pt-2 flex-col gap-2">
          <div className="text-sm font-medium text-gray-600">Display Name</div>
          <input
            id="goodsTitle"
            type="text"
            className="rounded w-full bg-gray-100 border-transparent focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            value={props.selectedItem[0].goodsTitle}
          />
        </div>
        <div className="flex pt-2 flex-col gap-2">
          <div className="text-sm font-medium text-gray-600">
            Item Description
          </div>
          <textarea
            id="goodsDescription"
            class="rounded w-full h-36 bg-gray-100 border-transparent focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            value={props.selectedItem[0].goodsDescription}
            maxLength="200"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
