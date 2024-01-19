import React from "react";
import { useRouter } from "next/router";

export default function Invalid() {
  const router = useRouter();

  const loginPage = async () => {
    router.back();
  };
  return (
    <main>
      {" "}
      <h1>invalid username or password</h1>
      <div className="text-center md:text-left">
        <button
          onClick={loginPage}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded text-xs tracking-wider"
        >
          Go back to login page
        </button>
      </div>
    </main>
  );
}
