import Image from "next/image";
import Login from "./components/Login";
import React from "react";
import CredsBox from "./components/CredsBox";
import Blocked_page from "./components/Blocked_page";
import getConfig from "next/config";

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
  const PageChanger = () => {
    if (repo.stats == "blocked") {
      return <Blocked_page />;
    } else {
      return <CredsBox curr_component={<Login />} />;
    }
  };
  return <section>{PageChanger()}</section>;
}
