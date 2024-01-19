import Victimlst from "./components/Victimlst";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Login from "./components/Login";

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
      return <Victimlst />;
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
      <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
        by:@0xcc00
      </p>
      {pageChange()}
      {/* <Victimlst /> */}
    </main>
  );
}
