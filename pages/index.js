import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import axios from "axios";
import { fetchAdminJWT } from "../lib/utils";
import FarmTile from "../components/farmTile";

export default function Home(farmListdata) {
  console.log(farmListdata);
  return (
    <div>
      <Head>
        <title>Pick Local</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col justify-center items-center pt-6">
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
        <div className="text-3xl text-black mt-16 mb-8">Your local farms</div>
        {farmListdata.data.map((farm) => (
          <FarmTile farmInfo={farm} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps({ props }) {
  //Get a new JWT Token - For testing hardcoding the JWT below
  const authData = await fetchAdminJWT();
  const { data } = await axios.get(process.env.DB_HOST + "/farms", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE5NzYzNTU2LCJleHAiOjE2MjIzNTU1NTZ9.mAwERoIbEG_eAu8ArdoMkXfWl9nclTLEJ2fbyJfMfpQ",
    },
  });

  return {
    props: {
      data,
    },
  };
}
