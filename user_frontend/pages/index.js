import Image from "next/image";
import Login from "./components/Login";
import React from "react";

export default function Home() {
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="/microsoft_logo.png"
        />
      </div>
      <Login />
    </section>
  );
}
