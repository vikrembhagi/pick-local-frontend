import axios from "axios";

const baseDBUrl = process.env.DB_HOST;

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
  console.log(url);
  const { data } = await axios.get(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwOTU1OTg3LCJleHAiOjE2MjM1NDc5ODd9.O3MB2dCs3kkJnfpWC7vHAOMk89-yRQXlaz2y48Vsx-Y",
    },
  });
  return data;
}

export async function postSiteConfigUpdate() {}

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
