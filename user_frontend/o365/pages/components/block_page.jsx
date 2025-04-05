import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Block_page() {
  return (
    <div className=" flex flex-col space-y-10 mt-4 justify-center">
      <div
        style={{
          WebkitTextSizeAdjust: "100%",
          direction: "ltr",
          textAlign: "left",
          lineHeight: "1.75rem",
          color: "#1b1b1b",
          fontSize: "1.5rem",
          fontWeight: "600",
          boxSizing: "border-box",
        }}
      >
        Loading
      </div>

      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </div>
  );
}
