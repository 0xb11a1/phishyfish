import Victimlst from "./components/Victimlst";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { toast } from "react-hot-toast";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { Button } from "@nextui-org/react";
import ConfigView from "./components/ConfigView";
import Link from "next/link";
import GeneralInfo from "./components/GeneralInfo";
export default function Home() {
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    const checkloggedIn = async () => {
      const cookie = getCookie("API_KEY");
      if (cookie != null) {
        setloggedIn(true);
      }
    };

    checkloggedIn();

    const intervalId = setInterval(() => {
      checkloggedIn();
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const pageChange = () => {
    if (loggedIn) {
      return (
        <div>
          <div className="flex flex-row  items-center justify-center">
            <ConfigView />
            <GeneralInfo />
          </div>
          <hr class="h-px my-8 bg-gray-600 border-0" />
          <Victimlst />
        </div>
      );
    } else {
      return <Login />;
    }
  };

  return (
    <main className="text-center p-10">
      <div className="flex justify-center">
        <h1 className="text-white mb-4 text-4xl font-extrabold leading-none tracking-tightmd:text-5xl lg:text-6xltext-white">
          PhishyFish
        </h1>
        <h1 className="mb-4 font-extrabold leading-none tracking-tightmd:text-5xl lg:text-6xltext-white text-sky-500 text-base">
          &gt;&lt;(((&ordm;&gt;
        </h1>
      </div>
      <div className="flex flex-row space-x-2 justify-center mb-2 text-gray-400 text-lg font-normal lg:text-xl sm:px-16 xl:px-48">
        <p className="m-1">By: Bilal</p>
        <a href="https://x.com/0xcc00">
          <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 512 512"
            >
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
          </span>
        </a>
        <a href="https://github.com/0xb11a1">
          <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#333]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
          </span>
        </a>
      </div>

      {pageChange()}
      {/* <Victimlst /> */}
    </main>
  );
}
