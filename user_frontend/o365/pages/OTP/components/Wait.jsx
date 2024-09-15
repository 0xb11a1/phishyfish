import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Wait() {
  return (
    <div className=" flex flex-col items-center justify-center">
      <h1>Please Wait ...</h1>

      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#0067b8"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
