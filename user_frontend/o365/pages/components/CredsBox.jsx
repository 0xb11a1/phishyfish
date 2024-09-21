import Image from "next/image";
export default function CredsBox({ curr_component }) {
  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div
        style={{
          WebkitTextSizeAdjust: "100%",
          fontWeight: "400",
          fontSize: ".9375rem",
          lineHeight: "1.25rem",
          direction: "ltr",
          color: "#1b1b1b",
          textAlign: "left",
          boxSizing: "border-box",
          position: "relative",
          maxWidth: "440px",
          width: "calc(100% - 40px)",
          padding: "44px",
          marginBottom: "28px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          minWidth: "320px",
          minHeight: "338px",
          overflow: "hidden",
        }}
      >
        <img
          id="box-logo"
          src="/internal/Microsoft-logo.png"
          style={{
            WebkitTextSizeAdjust: "100%",
            fontWeight: "400",
            fontSize: ".9375rem",
            lineHeight: "1.25rem",
            direction: "ltr",
            color: "#1b1b1b",
            textAlign: "left",
            boxSizing: "border-box",
            border: "0",
            verticalAlign: "middle",
            maxWidth: "256px",
            height: "24px",
            marginBottom: "0.6rem",
            position: "relative",
          }}
          alt="something"
        />

        {curr_component}
      </div>
    </div>
  );
}
