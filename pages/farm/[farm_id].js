import Head from "next/head";
import { getAllFarmsID, getSingleFarmData } from "../../lib/utils";

export default function FarmPage({ singleFarmData }) {
  console.log(singleFarmData);
  return <div>Hello</div>;
}

export async function getStaticPaths() {
  // Return a list of possible value for farm ids
  const paths = await getAllFarmsID();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the farm using params.farm_id
  const singleFarmData = await getSingleFarmData(params.farm_id);
  return {
    props: {
      singleFarmData,
    },
  };
}
