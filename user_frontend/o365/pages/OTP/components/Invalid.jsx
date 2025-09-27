import React from "react";
import { useRouter } from "next/router";

export default function Invalid() {
  const router = useRouter();

  const loginPage = async () => {
    router.back();
  };
  return (
    <main className="flex flex-col space-y-4">
      {" "}
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
        Invalid username or password
      </div>
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
          color: "#fff",
          borderColor: "#0067b8",
          backgroundColor: "#0067b8",
          display: "block",
          alignSelf: "self-end",
        }}
      >
        Go back to the login page
      </button>
    </main>
  );
}
