import React from "react";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Image from "next/image";
import picker_verify_fluent_authenticator from "../../../public/picker_verify_fluent_authenticator.png";
export default function OTP({ id }) {
  const [OTP_code, setOTP_code] = useState("");

  useEffect(() => {
    const getOTP = async () => {
      const res = await fetch(`${process.env.API_URL}/OTP/${id}`, {
        method: "GET",
        cache: "no-cache",
      });
      const res_json = await res.json();
      // return JSON.parse(json).data
      setOTP_code(res_json.data);
    };
    getOTP();
  }, []);
  return (
    <main className="flex flex-col">
      <div
        style={{
          WebkitTextSizeAdjust: "100%",
          direction: "ltr",
          textAlign: "left",
          boxSizing: "border-box",
          lineHeight: "1.75rem",
          marginLeft: "0",
          marginRight: "0",
          color: "#1b1b1b",
          fontSize: "1.5rem",
          fontWeight: "600",
          padding: "0",
          marginTop: "16px",
          marginBottom: "12px",
        }}
      >
        Approve sign in request
      </div>
      <div className="flex flex-row pt-4">
        <Image
          className="size-6 mr-2"
          src={picker_verify_fluent_authenticator}
          alt="something"
          height={150}
          width={200}
        />
        <div
          style={{
            WebkitTextSizeAdjust: "100%",
            direction: "ltr",
            color: "#1b1b1b",
            textAlign: "left",
            fontWeight: "400",
            fontSize: ".9375rem",
            lineHeight: "1.25rem",
            boxSizing: "border-box",
          }}
        >
          Open your Authenticator app, and enter the number shown to sign in.
        </div>
      </div>
      <h1 className="text-5xl p-4 text-center m-10">{OTP_code}</h1>

      <div className="flex flex-col space-y-4">
        <div
          style={{
            WebkitTextSizeAdjust: "100%",
            direction: "ltr",
            color: "#1b1b1b",
            textAlign: "left",
            fontWeight: "400",
            fontSize: ".9375rem",
            lineHeight: "1.25rem",
            boxSizing: "border-box",
          }}
        >
          No numbers in your app? Make sure to upgrade to the latest version.
        </div>
        <div className="flex flex-row space-x-2 ">
          <input
            type="checkbox"
            style={{
              WebkitTextSizeAdjust: "100%",
              direction: "ltr",
              color: "inherit",
              font: "inherit",
              margin: "0",
              fontFamily: "inherit",
              fontSize: "inherit",
              maxWidth: "100%",
              lineHeight: "inherit",
              boxSizing: "border-box",
              padding: "0",
              width: "20px",
              height: "20px",
            }}
          ></input>
          <div
            style={{
              WebkitTextSizeAdjust: "100%",
              direction: "ltr",
              color: "#1b1b1b",
              textAlign: "left",
              fontWeight: "400",
              fontSize: ".9375rem",
              lineHeight: "1.25rem",
              boxSizing: "border-box",
            }}
          >
            Don't ask again for 90 days
          </div>
        </div>
        <a
          href="#"
          style={{
            WebkitTextSizeAdjust: "100%",
            fontWeight: "400",
            lineHeight: "1.25rem",
            direction: "ltr",
            textAlign: "left",
            fontSize: ".8125rem",
            boxSizing: "border-box",
            backgroundColor: "transparent",
            textDecoration: "none",
            color: "#0067b8",
          }}
        >
          I can't use my Microsoft Authenticator app right now
        </a>{" "}
        <a
          href="#"
          style={{
            WebkitTextSizeAdjust: "100%",
            fontWeight: "400",
            lineHeight: "1.25rem",
            direction: "ltr",
            textAlign: "left",
            fontSize: ".8125rem",
            boxSizing: "border-box",
            backgroundColor: "transparent",
            textDecoration: "none",
            color: "#0067b8",
          }}
        >
          More information
        </a>
      </div>
    </main>
  );
}
