import React from "react";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

export default function OTP({ id }) {
  const [OTP_code, setOTP_code] = useState("");

  useEffect(() => {
    const getOTP = async () => {
      const res = await fetch(`${process.env.API_URL}/OTP/${id}`, {
        method: "GET",
        cache: "no-cache",
      });
      const json = await res.json();
      // return JSON.parse(json).data
      setOTP_code(JSON.parse(json).data);
    };
    getOTP();
  }, []);
  return (
    <main>
      <h1 className="text-2xl text-slate-800">Approve sign in request</h1>
      <div className="flex flex-row pt-4">
        <img
          className="size-6 mr-2"
          src="/picker_verify_fluent_authenticator.png"
        />
        <p className="text-xs text-slate-800 ">
          Open your Authenticator app, and enter the number shown to sign in.{" "}
        </p>
      </div>
      <h1 className="text-4xl p-4 text-center">{OTP_code}</h1>

      <TailSpin
        visible={true}
        height="40"
        width="40"
        color="#2563eb"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </main>
  );
}
