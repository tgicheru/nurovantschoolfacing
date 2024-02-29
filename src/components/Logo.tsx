import React from "react";
import { Image } from "antd";
import { Link } from "react-router-dom";
import icon from "../assets/icons/icon.png";
import logo from "../assets/logo.png";

type Props = {
  isIcon?: boolean;
};
function Logo({ isIcon }: Props) {
  return (
    <Link to="/" className="w-full block logo-b">
      <Image
        alt="logo"
        src={isIcon ? icon : logo}
        preview={false}
        className="w-auto mx-auto"
      />
    </Link>
  );
}

export default Logo;
