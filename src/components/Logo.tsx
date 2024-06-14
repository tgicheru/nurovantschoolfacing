import React from "react";
import { Image } from "antd";
import { Link } from "react-router-dom";
import icon from "../assets/icons/icon.png";
import text from "../assets/textLogo.png";
import logo from "../assets/logo.png";

type Props = {
  path?: string;
  noLogo?: boolean;
  isText?: boolean;
  isIcon?: boolean;
};
function Logo({ path, isIcon, isText, noLogo  }: Props) {
  return (
    <Link to={path || "/"} className="w-full flex items-center logo-b">
      <Image
        alt="logo"
        preview={false}
        hidden={noLogo}
        src={isIcon ? icon : logo}
        className="w-auto mx-auto"
      />
      <Image
        src={text}
        alt="logo"
        preview={false}
        hidden={!isText}
        className="w-auto mx-auto"
      />
    </Link>
  );
}

export default Logo;
