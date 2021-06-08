import StrapiImage from "../components/image";
import { useState, useEffect } from "react";
import { session, useSession } from "next-auth/client";
import { postSiteConfigUpdate } from "../lib/utils";

export default function SiteConfig(props) {
  const [editMode, setEditMode] = useState(false);
  const [aboutFarm, setAboutFarm] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [address, setAddress] = useState("");
  const [profilePhoto, setProfilePhoto] = useState();
  const [farmID, setFarmID] = useState();

  const selectedSiteInfo = props.currentSiteInfo;

  useEffect(() => {
    console.log(selectedSiteInfo);
    setAboutFarm(selectedSiteInfo.about_short);
    setDisplayName(selectedSiteInfo.name);
    setAddress(selectedSiteInfo.address);
    setProfilePhoto(selectedSiteInfo.profile_photo);
    setFarmID(selectedSiteInfo.id);
  }, [props]);

  async function saveSiteInfoUpdates() {
    const updatedSiteInfo = {
      id: farmID,
      name: displayName,
      address: address,
      profile_photo: profilePhoto,
      about_short: aboutFarm,
    };
    const postResponse = await postSiteConfigUpdate(updatedSiteInfo);
    console.log(postResponse);

    if (postResponse.status == 200) {
      setEditMode(false);
      window.location.reload();
    }
  }

  return (
    <div>
      <div>
        <div>
          {editMode ? (
            <div className="flex flex-row pb-5 pt-5 pl-5 items-left gap-6">
              <div
                className="p-2 border-2 bg-gray-200 shadow-md border-black rounded hover:bg-gray-300 cursor-pointer"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </div>
              <div
                className="p-2 border-2 bg-yellow-100 shadow-md border-black rounded hover:bg-yellow-200 cursor-pointer"
                onClick={saveSiteInfoUpdates}
              >
                Save
              </div>
            </div>
          ) : (
            <div className="flex flex-row pb-5 pt-5 pl-5 items-left">
              <div
                className="p-2 border-2 bg-yellow-100 shadow-md border-black rounded hover:bg-yellow-200 cursor-pointer"
                onClick={() => setEditMode(true)}
              >
                Edit Site
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row lg:flex-row pl-5 gap-6">
        <div className="flex flex-col gap-6 mr-8">
          <div>
            <div className="text-sm font-medium pb-2 text-gray-600">
              Display Name
            </div>
            {editMode ? (
              <div>
                <input
                  id="name"
                  type="text"
                  className="rounded w-96 bg-gray-100 border-transparent focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
            ) : (
              <div className=" text-lg">{displayName}</div>
            )}
          </div>

          <div>
            <div className="text-sm font-medium text-gray-600 pb-2">
              About your farm
            </div>
            {editMode ? (
              <div>
                <textarea
                  id="about_short"
                  class="rounded w-96 h-36 bg-gray-100 border-transparent focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  value={aboutFarm}
                  onChange={(e) => setAboutFarm(e.target.value)}
                  maxLength="200"
                ></textarea>
              </div>
            ) : (
              <div className="text-lg w-96 h-auto">{aboutFarm}</div>
            )}
          </div>

          <div>
            <div className="text-sm font-medium text-gray-600 pb-2">
              Full Address
            </div>
            {editMode ? (
              <div>
                <input
                  id="address"
                  type="text"
                  className="rounded  w-96 bg-gray-100 border-transparent focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            ) : (
              <div className=" text-lg w-96 h-auto">{address}</div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-600 pb-2">
            Display Image
          </div>
          <div className="p-2 bg-gray-300">
            <StrapiImage
              image={selectedSiteInfo.profile_photo}
              width="200px"
              height="200px"
              styling="rounded-lg"
            />
          </div>
          {editMode && (
            <div className="flex flex-row gap-4 pt-4 justify-evenly">
              <div
                className="p-2 border-2 bg-yellow-100  shadow-md border-black rounded hover:bg-yellow-200 cursor-pointer"
                onClick={() => setEditMode(false)}
              >
                Replace
              </div>
              <div
                className="p-2 border-2 bg-gray-200 shadow-md border-black rounded hover:bg-red-200 cursor-pointer"
                onClick={() => setEditMode(false)}
              >
                Remove
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
