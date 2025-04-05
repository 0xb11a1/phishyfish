import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import Wait from "./OTP/components/Wait";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

const SlugPage = ({ slug }) => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false); // State to manage the loading animation

  useEffect(() => {
    if (slug === process.env.NEXT_PUBLIC_SUB_DIR) {
      setIsRedirecting(true);
      setCookie("sec", "aa", {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: "lax",
      });
      // TODO fix redirection
      router.replace("/").then(() => {
        setIsRedirecting(false);
      });
    }
  }, [slug, router]); // Dependencies added to avoid infinite rerenders

  const pageChanger = () => {
    if (!slug || isRedirecting) {
      return (
        <div className="flex items-center justify-center pt-5">
          <CircularProgress size="10rem" />
        </div>
      );
    } else {
      router.push("../");
    }
  };
};

export async function getStaticPaths() {
  return {
    paths: [], // Generate paths if needed
    fallback: "blocking", // Enable blocking fallback
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  // Pass the slug to the page as props
  return {
    props: {
      slug: slug || null,
    },
  };
}

export default SlugPage;
