import Head from "next/head";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import axios from "axios";
import Link from "next/link";
import Date from "../../components/date";
import { useState, useEffect } from "react";
import SiteConfig from "../../components/admin/siteConfig";
import InventoryConfig from "../../components/admin/inventoryConfig";

export default function Admin(initialData) {
  const selectedFarmInfo = initialData.farmInfo[0];
  const [session, loading] = useSession();
  const [activeTab, setActiveTab] = useState("site");
  const [siteInfo, setSiteInfo] = useState();
  const [inventoryInfo, setInventoryInfo] = useState([]);

  useEffect(() => {
    console.log(selectedFarmInfo);
    async function setFarmSiteData() {
      if (session !== null) {
        const newSession = await getActiveSessionInfo();
        if (newSession !== null) {
          setSiteInfo({
            id: selectedFarmInfo.id,
            name: selectedFarmInfo.name,
            address: selectedFarmInfo.address,
            about_short: selectedFarmInfo.about_short,
            profile_photo: selectedFarmInfo.profile_photo,
          });
          setInventoryInfo(selectedFarmInfo.goods_inventories);
        } else {
          console.log("Logged Out");
        }
      }
    }
    setFarmSiteData();
  }, [initialData, session]);

  function checkActiveTab(tabName) {
    if (tabName == activeTab) {
      return true;
    } else false;
  }

  return (
    <div className="bg-gray-200">
      <Head>
        <title> Pick Local: Admin</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/style.css" />
      </Head>
      <div className="flex flex-col h-screen">
        <div className="p-4 bg-yellow-600 shadow-lg flex flex-row items-center">
          <div className="w-1/3"></div>
          <div className="text-white text-lg font-medium w-1/3 flex justify-center">
            Site Administration
          </div>
          <div className="flex justify-end w-1/3">
            {!session && (
              <div className="flex flex-row items-center">
                <button
                  className=" p-2 rounded-md text-yellow-200 font-medium border-yellow-400 border-1"
                  onClick={() => signIn()}
                >
                  Sign in
                </button>
              </div>
            )}
            {session && (
              <div className="flex flex-row items-center">
                {/* 
                <div className="text-white pr-4">Hi {session.id} !</div>*/}
                <button
                  className="bg-yellow-400 p-2 rounded-md shadow-md font-medium border-yellow-800 border-1"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>

        {session && (
          <div>
            <div className="pl-4 pr-4 py-6 flex flex-col items-center">
              <div className="flex flex-col justify-center items-center pb-4">
                <div className="text-3xl pb-2">{selectedFarmInfo.name}</div>
                <div className="pb-2 underline text-blue-500 cursor-pointer">
                  <Link
                    href={
                      "http://www.localhost:3000/farm/" +
                      selectedFarmInfo.farm_id
                    }
                  >
                    <a>www.localhost:3000/farm/{selectedFarmInfo.farm_id}</a>
                  </Link>
                </div>
                {/*
                <div className="text-gray-600 pb-2">
                  Last Update: <Date dateString={selectedFarmInfo.updated_at} />
                </div>
                */}
              </div>
              <div className="flex flex-row items-center">
                <div
                  className={
                    checkActiveTab("site")
                      ? " text-yellow-600 p-2 text-3xl font-medium border-b-4 border-yellow-600"
                      : "p-2 text-3xl text-gray-400 cursor-pointer"
                  }
                  onClick={() => setActiveTab("site")}
                >
                  Site
                </div>
                <div
                  className={
                    checkActiveTab("inventory")
                      ? " text-yellow-600 p-2 ml-4 text-3xl font-medium border-b-4 border-yellow-600"
                      : "p-2 text-3xl text-gray-400 ml-4 cursor-pointer"
                  }
                  onClick={() => setActiveTab("inventory")}
                >
                  Inventory
                </div>
              </div>
            </div>

            <div className="flex-1 flex overflow-y-auto justify-center items-center">
              <>
                {checkActiveTab("site") && (
                  <>
                    {session && (
                      <>
                        <SiteConfig currentSiteInfo={siteInfo} />
                      </>
                    )}
                  </>
                )}

                {checkActiveTab("inventory") && (
                  <InventoryConfig goods={inventoryInfo} />
                )}
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getActiveSessionInfo() {
  const newSessionStatus = await getSession();
  return newSessionStatus;
}

export async function getServerSideProps({ req }) {
  let headers = {};
  const session = await getSession({ req });
  if (session) {
    headers = {
      Authorization: `Bearer ${session.jwt}`,
      "User-Agent": "*",
      "Content-Type": "application/json",
      accept: "*/*",
    };
  }
  let farmInfo;
  try {
    let { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/farms/?adminName.username=${session.id}`,
      {
        headers: headers,
      }
    );
    farmInfo = data;
  } catch (e) {
    console.log("caught error");
    farmInfo = {};
  }
  console.log(farmInfo);
  return { props: { farmInfo: farmInfo } };
}
