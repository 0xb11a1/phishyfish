import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import Wait from "./OTP/components/Wait";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";

const SlugPage = ({ slug }) => {
  const router = useRouter();

  // Client-side slug handling
  const PageChanger = () => {
    if (!slug) {
      return (
        <div className="flex items-center justify-center pt-5 ">
          <CircularProgress size="10rem" />
        </div>
      );
    }
    
    if (slug === process.env.NEXT_PUBLIC_SUB_DIR) {
      setCookie("sec", "aa", {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: "lax",
      });
      useEffect(() => {
        router.push("/");
      }, []);
    } else if (slug === "news") {
      return (
        <div className="flex items-center justify-center pt-5 ">
          <CircularProgress size="10rem" />
        </div>
      );
    } else {
      return <div>Not Found</div>;
    }
  };

  return <div>{PageChanger()}</div>;
};

export async function getStaticPaths() {
  // Define paths for your dynamic routes. Adjust based on your needs.
  return {
    paths: [], // Generate paths if needed, or leave empty for fallback behavior
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
