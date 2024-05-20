import Victimlst from "./components/Victimlst";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { toast } from "react-hot-toast";

export default function Home() {
  const [loggedIn, setloggedIn] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

 
  useEffect(() => {
    const checkloggedIn = async () => {
      const cookie = getCookie("API_KEY");
      if (cookie != null) {
        setloggedIn(true);
      }
    };

    checkloggedIn(); 
    get_automode();

    const intervalId = setInterval(() => {
      checkloggedIn(); 
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const pageChange = () => {
    if (loggedIn) {
      return <Victimlst />;
    } else {
      return <Login />;
    }
  };

  const send_automode = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/automode/${isChecked}`, {
        method: "PUT",
        cache: "no-cache",
        headers: {
          "X-API-Key": getCookie("API_KEY"),
        },
      });
    } catch (error) {}
    toast.success(`audo mode is ${isChecked}`);
  };

  const get_automode = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/automode`, {
        method: "GET",
        cache: "no-cache",
        headers: {
          "X-API-Key": getCookie("API_KEY"),
        },
      });
      // i have no idea where i got true and false mixed up, but this work for now :) 
      if (JSON.parse(await res.json()).automode == "True"){
        setIsChecked(false);
      }else{
        setIsChecked(true);
      }
    } catch (error) {}
    toast.success(`Loading configurations`);
  };

  const onAutoMode = () => {
    setIsChecked(!isChecked)
    send_automode()
    console.log('radio', isChecked);
}

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
      <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
        by:@0xcc00
      </p>
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={!isChecked} class="sr-only peer" onChange={onAutoMode}>
          </input>
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Auto mode</span>
      </label>
      {pageChange()}
      {/* <Victimlst /> */}
    </main>
  );
}
