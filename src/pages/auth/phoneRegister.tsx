import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, Select } from "antd";
import { usePhoneRegister } from "../../hooks/auth/authentications";
import { AllNationsCode } from "../../constants";
import { set } from "react-hook-form";

const { Option } = Select;

function RegisterPage() {
  const navigate = useNavigate();
  const { mutate, isLoading, isSuccess, data } = usePhoneRegister();

  const [selectBeforeText, setSelectBeforeText] = useState("+234");
  const [countryName, setCountryName] = useState("Nigeria");
  const [mobileNumber, setMobileNumber] = useState("");

  const onFinish = (values: any) => {
    const fullMobileNumber = `${selectBeforeText}${values.mobile}`;
    setMobileNumber(fullMobileNumber);

    mutate({ mobile: fullMobileNumber, type: "sign_up" } as unknown as void);
  };

  useEffect(() => {
    if (isSuccess && data !== undefined) {
      navigate(
        `/auth/verify/${
          data?.data?.reference_id
        }?mobile=${mobileNumber}&country=${countryName.toLowerCase()}`
      );
    }
  }, [isSuccess]);

  const handleSelectChange = (value: any) => {
    // setSelectBeforeText(value);
    const selectedValue = value.target.innerText.split("+");
    setSelectBeforeText(`+${selectedValue[1]}`);
    const country = AllNationsCode.find(
      (nation) => nation.emoji === selectedValue[0]
    );
    setCountryName(country!.new_field);
  };

  const selectBefore = (
    <Select
      defaultValue="+234"
      className="!text-white"
      style={{
        color: "#fff",
      }}
      onClick={handleSelectChange}
    >
      {AllNationsCode.map((nation, index) => (
        <Option value={nation.value} key={index}>
          {nation.emoji}
          {nation.value}
        </Option>
      ))}
    </Select>
  );

  return (
    <div className="w-full text-white px-5 sm:px-10 md:px-14 space-y-10">
      <div className="text-center flex flex-col gap-3">
        <p className="text-4xl font-bold">Got a Phone Number?</p>
        <p className="text-lg font-medium px-5">
          Power up your learning one phone number at a time.
        </p>
      </div>

      <Form
        onFinish={onFinish}
        initialValues={{ mobile: "", type: "sign_up" }}
        layout="vertical"
        className="space-y-5 relative"
      >
        <Form.Item name="mobile" className="!relative">
          <Input
            className="!text-white placeholder:!text-white rounded-xl !bg-[#6788FC] focus:bg-[#6788FC] hover:bg-[#6788FC] !border-none"
            placeholder="Enter your phone number"
            addonBefore={selectBefore}
            size="large"
            type="tel"
            id="mobile"
            required
          />
        </Form.Item>
        <Form.Item hidden name="type">
          <Input required />
        </Form.Item>
        <Divider className="!text-white !border-white">Or</Divider>
        <Link
          className="text-center text-white underline block text-sm font-medium"
          to="/auth/email-register"
        >
          Sign up email
        </Link>
        <Button
          loading={isLoading}
          block
          className="!rounded-3xl !h-[50px] bg-white text-silver hover:!bg-white hover:!text-primary hover:!font-bold"
          size="large"
          type="primary"
          htmlType="submit"
        >
          Proceed
        </Button>
      </Form>
    </div>
  );
}

export default RegisterPage;
