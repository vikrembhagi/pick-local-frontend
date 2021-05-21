import Head from "next/head";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import axios from "axios";

export default function Admin(initialData) {
  const [session, loading] = useSession();
  return (
    <div className="container">
      <Head>
        <title>Admin Console</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <h1>Auth Test</h1>
      {console.log(initialData.farmInfo)}
      <div>
        {!session && (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.id} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
      </div>

      <h1>Content...</h1>

      <div>Test</div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  let headers = {};
  const session = await getSession({ req });
  if (session) {
    headers = {
      Authorization: `Bearer ${session.jwt}`,
      "User-Agent": "*",
      "Content-Type": "application/json",
      accept: "*/*",
    };
  }
  let farmInfo;
  try {
    let { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/farms/2`,
      {
        headers: headers,
      }
    );
    farmInfo = data;
  } catch (e) {
    console.log("caught error");
    farmInfo = {};
  }

  return { props: { farmInfo: farmInfo } };
}
