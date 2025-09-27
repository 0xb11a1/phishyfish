import { setCookie } from "cookies-next";

function SlugPage() {
  return null;
}

export async function getServerSideProps(context) {
  const { params, req, res, query } = context;
  const { slug } = params;
  // const redirect = query.redirect || null;

  const buildQueryString = (queryObj) => {
    const params = new URLSearchParams(queryObj);
    return params.toString() ? `?${params.toString()}` : "";
  };

  const queryString = buildQueryString(query);

  if (slug === process.env.NEXT_PUBLIC_SUB_DIR) {
    // Set the cookie on the server side
    setCookie("sec", "aa", {
      req,
      res,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
    });

    // if (redirect) {
    //   return {
    //     redirect: {
    //       destination: `/${queryString}`,
    //       permanent: false,
    //     },
    //   };
    // }

    return {
      redirect: {
        destination: `/${queryString}`,
        permanent: false,
      },
    };
  } else {
    // if (redirect) {
    //   return {
    //     redirect: {
    //       destination: `../${queryString}`,
    //       permanent: false,
    //     },
    //   };
    // }

    return {
      redirect: {
        destination: `../${queryString}`,
        permanent: false,
      },
    };
  }
}

export default SlugPage;
