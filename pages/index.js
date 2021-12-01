import Head from "next/head";
import Sidebar from "../components/sidebar";
import Center from "../components/Center";
import { getSession } from "next-auth/react";
import Player from "../components/Player";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotify clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
          <Sidebar />
          <Center />
        </main>
      </div>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
