import React from "react";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [API_KEY, setAPI_KEY] = useState("");
  const setAPI_KEY_click = async () => {
    setCookie("API_KEY", API_KEY, {
      maxAge: 60 * 60 * 24 * 5,
      sameSite: "lax",
    });
    router.reload();
  };
  return (
    <div>
      <h1 className="text-white">Your super secret password.</h1>
      <input
        className="m-3 text-sm w-2/3 px-4 py-2 border border-solid border-gray-300 rounded text-white"
        type="text"
        value={API_KEY}
        placeholder="Key"
        onChange={(e) => {
          setAPI_KEY(e.currentTarget.value);
        }}
      />
      <div className="mb-5 text-center md:text-left flex flex-col items-center">
        <button
          onClick={setAPI_KEY_click}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
          type="submit"
        >
          Set KEY
        </button>
      </div>
      <div className="text-white">
        <p>⠀⠀⠀⠀⠀⠀⠀.</p>
        <p>⠀⠀⠀⠀⠀⠀":"</p>
        <p>⠀⠀⠀⠀___:____⠀⠀⠀⠀⠀|"\/"|</p>
        <p>⠀⠀,'⠀⠀⠀⠀⠀⠀⠀⠀`.⠀⠀⠀⠀\⠀⠀/</p>
        <p>⠀⠀|⠀⠀O⠀⠀⠀⠀⠀⠀⠀⠀\___/⠀⠀|</p>
        <p>~^~^~^~^~^~^~^~^~^~^~^~^~</p>
      </div>
    </div>
  );
}
