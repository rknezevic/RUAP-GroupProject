import React from "react";
import { useNavigate } from "react-router-dom";

export default function SmallLogo() {
  const navigate = useNavigate();
  return (
    <img
      src="/hearth-logo.png"
      alt="logo"
      width={50}
      style={{
        backgroundColor: "transparent",
        cursor: "pointer",
        borderRadius: "40px",
      
      }}
      onClick={() => navigate("/")}
    />
  );
}