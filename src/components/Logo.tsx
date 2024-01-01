import React from "react";
import { Image } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Logo() {
  return (
    <Link to="/" className="w-full flex items-center justify-center">
      <Image
        alt="logo"
        src={logo}
        preview={false}
        className="w-auto mx-auto mt-[32px]"
      />
    </Link>
  );
}

export default Logo;
