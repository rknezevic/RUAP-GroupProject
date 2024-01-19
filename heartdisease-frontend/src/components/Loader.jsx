import React from "react";

export default function Loader() {
  return (
    <div
      className="spinner-border"
      style={{
        width: "3rem",
        height: "3rem",
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
      role="status"
    ></div>
  );
}
