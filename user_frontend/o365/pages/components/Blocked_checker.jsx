import React, { useEffect } from "react";
import Wait from "../OTP/components/Wait";
import { useRouter } from "next/router";

export default function Blocked_page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/news");
  },[]);
  return (
    <div className="flex h-screen w-full bg-gray-200">{/* <Wait /> */}</div>
  );
}
