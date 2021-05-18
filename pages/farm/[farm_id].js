import Head from "next/head";
import { getAllFarmsID, getSingleFarmData } from "../../lib/utils";
import StrapiImage from "../../components/image";
import Date from "../../components/date";
import ProductTile from "../../components/productTile";
import Link from "next/link";

export default function FarmPage({ singleFarmData }) {
  console.log(singleFarmData);
  return (
    <div>
      <Head>
        <title>{singleFarmData.name}</title>
      </Head>
      <div className="flex flex-col w-100vw min-h-screen bg-yellow-100">
        <div className="flex flex-col bg-gradient-to-b from-blue-400 to-yellow-100 p-8 ">
          <div className="flex flex-row items-center">
            <div className="flex-none ">
              <div className="rounded-[50%]">
                <StrapiImage
                  image={singleFarmData.profile_photo}
                  width="200px"
                  height="200px"
                  styling="rounded-[50%]"
                />
              </div>
            </div>
            <div className="flex flex-col ml-8 ">
              <div className=" text-blue-800 underline mb-2">
                {" "}
                <Link href={`/`}>
                  <a>All Farms</a>
                </Link>
              </div>
              <div className="text-4xl mb-8 font-medium">
                {singleFarmData.name}
              </div>
              <div className="text-base">{singleFarmData.about_short}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row p-8">
          <div className="flex flex-col flex-none w-[200px] p-6">
            <div className="font-medium">Contact</div>
            <div>{singleFarmData.address} </div>
            <div className="font-medium mt-4">Last Updated</div>
            <div>
              <Date dateString={singleFarmData.updated_at} />{" "}
            </div>
          </div>
          <div className="flex flex-col ml-8">
            <div className="text-xl mb-6 font-medium">Availaible Produce</div>
            <div className="flex flex-row flex-wrap">
              {singleFarmData.goods_inventories.map((good, key) => {
                console.log(good);
                return (
                  <div key={key}>
                    <ProductTile singleProductInfo={good} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
