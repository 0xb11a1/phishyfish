import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function Wait() {
  return (
    <div>
      <h1>Please Wait ...</h1>
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#2563eb"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
