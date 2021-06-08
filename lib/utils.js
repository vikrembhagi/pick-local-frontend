import axios from "axios";
import { useSession, getSession } from "next-auth/client";

const baseDBUrl = process.env.DB_HOST;
const adminJWT = process.env.DB_DEV_ADMIN_JWT;

export async function fetchAdminJWT() {
  let url = `${baseDBUrl}/auth/local`;
  const response = await axios.post(`${url}`, {
    identifier: process.env.DB_ADMIN_IDENTIFIER,
    password: process.env.DB_ADMIN_PASS,
  });
  const data = response.data.jwt;
  return data;
}

export function getStrapiURL(path = "") {
  return `${baseDBUrl}${path}`;
}

export async function getAllFarmsData() {
  let url = `${baseDBUrl}/farms`;
  let authJWT = console.log(url);
  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${adminJWT}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function postSiteConfigUpdate(farmSiteInfo) {
  const session = await getSession();
  let farmSiteUpdateApiUrl = `${baseDBUrl}/farms/${farmSiteInfo.id}`;
  console.log(farmSiteInfo);
  let resp;

  /*
  try {
    const response = await axios.put(farmSiteUpdateApiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
      data: farmSiteInfo,
    });
    console.log(response.data.args);
    return response;
  } catch (err) {
    console.log(err);
  }
  */

  var options = {
    method: "PUT",
    url: farmSiteUpdateApiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.jwt}`,
    },
    data: farmSiteInfo,
  };

  await axios
    .request(options)
    .then(function (response) {
      console.log(response);
      resp = response;
      console.log(resp);
    })
    .catch(function (error) {
      console.error(error);
    });
  return resp;
}

export async function getAllFarmsID() {
  const data = await getAllFarmsData();
  return data.map((farm) => {
    return {
      params: {
        farm_id: farm.farm_id,
      },
    };
  });
}

export async function getSingleFarmData(farmID) {
  const data = await getAllFarmsData();
  const singleFarmData = data.find(({ farm_id }) => farm_id === farmID);
  return singleFarmData;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}
