import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import axios from "axios";
import { fetchAdminJWT, getAllFarmsData } from "../lib/utils";
import FarmTile from "../components/farmTile";

export default function Home(farmListdata) {
  console.log(farmListdata);
  return (
    <div>
      <Head>
        <title>Pick Local</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col justify-start items-center pt-6 bg-home-bg h-screen">
        <div className="text-6xl">
          <span className="mr-6">
            <Image
              src="/cherries-512x512.png"
              width="32px"
              height="32px"
            ></Image>
          </span>
          Pick Local
          <span className="ml-6">
            <Image src="/farmer-512x512.png" width="32px" height="32px"></Image>
          </span>
        </div>
        <div className="text-3xl text-black mt-16 mb-8">Your local produce</div>

        <div className="flex flex-col">
          {farmListdata.data.map((farm, key) => (
            <div className="flex-1">
              <FarmTile key={key} farmInfo={farm} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ props }) {
  //Get a new JWT Token - For testing hardcoding the JWT below
  const authData = await fetchAdminJWT();
  const data = await getAllFarmsData();

  return {
    props: {
      data,
    },
  };
}
