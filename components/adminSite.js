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
    <div className="bg-gray-100 flex-col justify-center items-center shadow-md my-4">
      <div className="flex flex-row border-gray-200 justify-center items-center ">
        {editMode ? (
          <div className="flex flex-row gap-4">
            <div
              className="p-2 text-gray-400 font-medium hover:text-gray-600 cursor-pointer"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </div>
            <div
              className="p-2 text-gray-400 font-medium hover:text-yellow-600 cursor-pointer"
              onClick={saveSiteInfoUpdates}
            >
              Save
            </div>
          </div>
        ) : (
          <div>
            <div
              className="p-2 text-gray-400 font-medium hover:text-yellow-600 cursor-pointer"
              onClick={() => setEditMode(true)}
            >
              Edit Site
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse md:flex-row lg:flex-row p-8 bg-white gap-4">
        <div className="flex flex-col gap-4">
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
                  className="rounded w-96 bg-gray-100 border-transparent focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
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
          <div className=" flex flex-col justify-center items-center bg-gray-100">
            <StrapiImage
              image={selectedSiteInfo.profile_photo}
              width="120px"
              height="120px"
              styling=""
            />

            {editMode && (
              <div className="flex flex-row p-1 justify-evenly">
                <div
                  className=" text-gray-400 font-medium hover:text-gray-600 cursor-pointer"
                  onClick={() => setEditMode(false)}
                >
                  Replace
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
