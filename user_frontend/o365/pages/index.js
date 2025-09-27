import Image from "next/image";
import Login from "./components/Login";
import React from "react";
import CredsBox from "./components/CredsBox";
import Block_page from "./components/block_page";
import getConfig from "next/config";
import { getCookie } from "cookies-next";


export async function getServerSideProps({ req }) {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

  const API_URI = serverRuntimeConfig.apiUrl;
  let res;
  try {
    res = await fetch(
      `${API_URI}/ipblockcheck/${req.headers["x-forwarded-for"]}`
    );
  } catch (error) {
    const API_URI = publicRuntimeConfig.apiUrl;
    res = await fetch(
      `${API_URI}/ipblockcheck/${req.headers["x-forwarded-for"]}`
    );
  }
  const repo = await res.json();
  return { props: { repo } };
}

export default function Home({ repo }) {
  //  if (typeof document !== "undefined") {
  //   document.body.classList.add(
  //     `bg-[url('/${GlobalConifg.subDir}/background.svg')]`,
  //     "w-full",
  //     "bg-cover"
  //   );
  // }
  // const router = useRouter();

  const PageChanger = () => {
    // return <div>path is : {router.asPath}</div>;
    
    if ((repo.stats == "blocked")) {
      return <Block_page />;
    } else {
      return <CredsBox curr_component={<Login />} />;
    }
  };
  return <section>{PageChanger()}</section>;
}
