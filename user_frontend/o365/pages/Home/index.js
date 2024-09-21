import { useEffect } from "react";
export default function Home() {
    // This is the dummpy page for now it redirect the user 
  useEffect(() => {
    window.location.assign("https://duckduckgo.com/");
  });
  return <div></div>;
}
