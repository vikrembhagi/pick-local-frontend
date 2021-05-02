import axios from "axios";

const baseUrl = process.env.DB_HOST;

async function fetchAdminJWT() {
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

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

export { baseUrl, fetchAdminJWT };
