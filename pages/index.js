import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import axios from "axios";
import { fetchAdminJWT } from "../lib/utils";

export default function Home(farmListdata, testData) {
  console.log(farmListdata);
  return (
    <div>
      <Head>
        <title>Pick Local</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <div className="text-6xl">
          <span className="mr-4">
            <Image
              src="/cherries-512x512.png"
              width="64px"
              height="64px"
            ></Image>
          </span>
          Pick Local
        </div>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
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
