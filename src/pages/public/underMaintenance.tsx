import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Divider, Form, Input } from "antd";
import { useEmailLogin } from "../../hooks/auth/authentications";

function UnderMaintenance() {
  const { mutate, isLoading } = useEmailLogin();
  const [params] = useSearchParams();
  const mobile = params.get("mobile");

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-black px-5 sm:px-10 md:px-14 space-y-10 max-w-[1024px] mx-auto bg-white">
      <h1 className="text-[36px] leading-[48px] lg:text-[70px] lg:leading-[74px] tracking-[-0.36px] font-bold text-center">
        The site is currently down for maintenance
      </h1>
      <div className="text-[16px] leading-[24px] lg:text-[24px] lg:leading-[36px] font-normal font-montserrat text-center">
        <p>We apologize for any inconveniences caused</p>
        <p>We will be back up soon</p>
      </div>
    </div>
  );
}

export default UnderMaintenance;
