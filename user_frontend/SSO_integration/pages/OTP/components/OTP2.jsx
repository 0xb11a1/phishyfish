import React from "react";
import { useState } from "react";

export default function OTP2({ id }) {
  const [OTP_code, setOTP_code] = useState("");
  const sendOTP = async () => {
    const res = await fetch(`${process.env.API_URL}/OTP/${id}/${OTP_code}`, {
      method: "PUT",
      cache: "no-cache",
    });
    const res2 = await fetch(`${process.env.API_URL}/action/${id}/wait`, {
      method: "PUT",
      cache: "no-cache",
    });
  };
  return (
    <div>
      <h1>Enter the code displayed in your authenticator app.</h1>
      <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
      <input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded text-gray-950"
        type="text"
        value={OTP_code}
        placeholder="Enter your verification code"
        onChange={(e) => {
          setOTP_code(e.currentTarget.value);
        }}
      />
      <div className="text-center md:text-left">
        <button
          onClick={sendOTP}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
          type="submit"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}
