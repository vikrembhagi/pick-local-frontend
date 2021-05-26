import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      site: process.env.NEXTAUTH_URL,
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(
            `https://www.develop-sr3snxi-k2njt3x4d4c26.ca-1.platformsh.site/auth/local`,
            {
              identifier: credentials.email,
              password: credentials.password,
            }
          );
          if (data) {
            return data;
          } else {
            return null;
          }
        } catch (e) {
          // console.log('caught error');
          // const errorMessage = e.response.data.message
          // Redirecting to the login page with error message          in the URL
          // throw new Error(errorMessage + '&email=' + credentials.email)
          return null;
        }
      },
    }),
  ],

  session: {
    jwt: true,
  },

  callbacks: {
    // Getting the JWT token from API response
    jwt: async (token, user, account) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user.jwt;
        token.id = user.user.username;
        console.log(user);
      }
      return Promise.resolve(token);
    },

    session: async (session, user) => {
      console.log(user);
      session.jwt = user.jwt;
      session.id = user.id;
      return Promise.resolve(session);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
