import React from "react";
import { useRouter } from "next/router";

export default function Timeout({ id }) {
  const router = useRouter();

  const loginPage = async () => {
    router.back();
  };

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
        We didn't hear from you
      </div>
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
          We sent an identity verification request to your Microsoft
          Authenticator app, but we didn't hear from you in time.{" "}
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
            View details
          </a>
        </div>

        <a
          href="#"
          style={{
            WebkitTextSizeAdjust: "100%",
            fontWeight: "400",
            lineHeight: "1.25rem",
            direction: "ltr",
            textAlign: "left",
            fontSize: ".900rem",
            boxSizing: "border-box",
            backgroundColor: "transparent",
            textDecoration: "none",
            color: "#0067b8",
          }}
        >
          Send another request to my Microsoft Authenticator app
        </a>

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
        <button
          onClick={loginPage}
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
            color: "#000",
            borderColor: "#0067b8",
            backgroundColor: "rgba(0,0,0,0.2)",
            display: "block",
            width: "27%",
            alignSelf: "self-end",
          }}
        >
          Cancel
        </button>
      </div>
    </main>
  );
}
