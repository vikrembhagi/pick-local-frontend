import { useState, useEffect } from "react";
import ProductTile from "../productTile";
import EditInventoryItem from "./editInventory";

export default function InventoryConfig(props) {
  const [editingMode, setEditingMode] = useState(false);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState();

  async function editExisting(clickedItem) {
    console.log(clickedItem.target.id);
    await filterSelectedInventory(clickedItem.target.id);
    console.log(selectedInventoryItem);
    setEditingMode(true);
  }

  async function filterSelectedInventory(itemId) {
    const filteredItem = props.goods.filter(function (good) {
      return good.id == itemId;
    });
    setSelectedInventoryItem(filteredItem);
  }

  function deleteExisting(clickedItem) {}

  console.log(props);
  return (
    <>
      {editingMode ? (
        <>
          <EditInventoryItem
            selectedItem={selectedInventoryItem}
            toggleEditMode={() => setEditingMode(false)}
          />
        </>
      ) : (
        <div className="flex flex-col my-4 gap-10">
          {props.goods.map((good, key) => {
            return (
              <div
                key={key}
                className="flex flex-col bg-gray-100 hover:ring-2 ring-yellow-400"
              >
                <div className="flex flex-row gap-6 py-2 pr-4 border-gray-400 shadow-sm justify-end">
                  <div
                    id={good.id}
                    className=" text-gray-400 font-medium hover:text-yellow-600 cursor-pointer"
                  >
                    Delete
                  </div>
                  <div
                    id={good.id}
                    className=" text-gray-400 font-medium hover:text-yellow-600 cursor-pointer"
                    onClick={(e) => editExisting(e)}
                  >
                    Edit
                  </div>
                </div>
                <ProductTile singleProductInfo={good} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
