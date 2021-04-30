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

export { baseUrl, fetchAdminJWT };
