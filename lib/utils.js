import axios from "axios";

const baseUrl = process.env.DB_HOST;

export async function fetchAdminJWT() {
  let url = `${baseUrl}/auth/local`;
  const response = await axios.post(`${url}`, {
    identifier: process.env.DB_ADMIN_IDENTIFIER,
    password: process.env.DB_ADMIN_PASS,
  });
  const data = response.data.jwt;
  return data;
}

export function getStrapiURL(path = "") {
  return `${process.env.DB_HOST || "http://localhost:3001"}${path}`;
}

export async function getAllFarmsData() {
  const { data } = await axios.get(process.env.DB_HOST + "/farms", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE5NzYzNTU2LCJleHAiOjE2MjIzNTU1NTZ9.mAwERoIbEG_eAu8ArdoMkXfWl9nclTLEJ2fbyJfMfpQ",
    },
  });
  return data;
}

export async function getAllFarmsID() {
  const data = await getAllFarmsData();
  console.log(data);
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

export { baseUrl };
