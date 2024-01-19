import '@/styles/globals.css'
import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
const {nextui} = require("@nextui-org/react");
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
  
    <NextUIProvider>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
    </NextUIProvider>
  
    );
  
}
