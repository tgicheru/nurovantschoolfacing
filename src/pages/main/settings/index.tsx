import React, { useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  Radio,
  Spin,
  Upload,
  UploadProps,
  message,
} from "antd";
import referImage from "../../../assets/refer-image.png";
import { BsCopy } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import { PiCoins } from "react-icons/pi";
import authAtom from "../../../atoms/auth/auth.atom";
import { extractAvatar, isEqual } from "../../../context/utils";
import CustomTable from "../../../components/CustomTable";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useChangePassword,
  useGetSubs,
  usePostSub,
  usePostVerifySub,
  useSetProfile,
} from "../../../hooks/profile/profile";
import { MdEdit } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { useAWSUpload, useStripePay } from "../../../hooks/otherhooks";
import SubscribeContent from "./contents/subscribe";

function SettingsPage() {
  const { user } = useRecoilValue(authAtom);
  const actPlan = (`${user?.info?.current_tier}_${user?.info?.subscription_duration || user?.info?.duration}`);
  const [subPlan, setSubPlan] = useState(actPlan || "");
  const [actSub, setActSub] = useState("Monthly");
  const subTier = subPlan?.split("_")?.[0];
  const actSubLow = actSub?.toLowerCase();
  const actSubLowRep = actSubLow?.replaceAll("ly", "");
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [isPWOpen, setIsPWOpen] = useState(false);
  const onSubClose = () => setIsSubOpen(false);
  const onPayClose = () => setIsPayOpen(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onPayOpen = () => setIsPayOpen(true);
  const onSubOpen = () => setIsSubOpen(true);
  const onPWClose = () => setIsPWOpen(false);
  const onPWOpen = () => setIsPWOpen(true);
  const onEdClose = () => setIsEdit(false);
  const onClose = () => setIsOpen(false);
  const onEdOpen = () => setIsEdit(true);
  const onOpen = () => setIsOpen(true);
  const [form] = Form.useForm();

  const isNoEditMail = ["google", "apple"]?.includes(user?.info?.sign_up_type)

  const { data: getSubsData, isFetching: getSubsLoad } = useGetSubs();

  const { isLoading: postSubLoad, mutateAsync: postSubAction } = usePostSub();

  const { mutate: postVerifySubAction, isLoading: postVerifySubLoad } =
    usePostVerifySub(onSubClose);

  const { mutate: putPasswordAction, isLoading: putPasswordLoad } =
    useChangePassword();

  const { mutate: setProfileAction, isLoading: setProfileLoad } =
    useSetProfile(onEdClose);

  const {
    data: postPayData,
    mutate: postPayAction,
    isLoading: postPayLoad,
  } = useStripePay(onPayOpen);

  const { mutate: uploadFileAction } = useAWSUpload(
    (res: any) => setProfileAction({ profile_img: res?.Location }),
    () => {},
    "profile"
  );

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    directory: false,
    method: undefined,
    showUploadList: false,
    onChange({ file }: { file: Blob | any }) {
      uploadFileAction(file?.originFileObj);
    },
  };

  const referCode = user?.info?.reflectly_code;
  const referURL = `${window.location.origin.toString()}/auth?referral=${referCode}`;
  const handleCopyRefer = () => {
    navigator.clipboard.writeText(referURL);
    message.success("Copied to clipboard");
  };
  const handleCopyCode = () => {
    navigator.clipboard.writeText(referCode);
    message.success("Copied to clipboard");
  };

  const details = useMemo(
    () => [
      {
        key: <p className="text-base font-medium text-[#646462]">Name</p>,
        data: isEdit ? (
          <Form.Item name="name" className="!m-0 !p-0">
            <Input placeholder="Enter your full name" size="large" />
          </Form.Item>
        ) : (
          user?.info?.name || "NIL"
        ),
      },
      {
        key: <p className="text-base font-medium text-[#646462]">Email</p>,
        data: (isEdit && !isNoEditMail) ? (
          <Form.Item name="email" className="!m-0 !p-0">
            <Input placeholder="Enter your email" type="email" size="large" />
          </Form.Item>
        ) : (
          user?.info?.email || "NIL"
        ),
      },
      {
        key: <p className="text-base font-medium text-[#646462]">Phone</p>,
        data: isEdit ? (
          <Form.Item name="mobile_number" className="!m-0 !p-0">
            <Input placeholder="Enter your mobile number" size="large" />
          </Form.Item>
        ) : (
          user?.info?.mobile_number || "NIL"
        ),
      },
      {
        key: <p className="text-base font-medium text-[#646462]">Country</p>,
        data: isEdit ? (
          <Form.Item name="country" className="!m-0 !p-0">
            <Input placeholder="Enter your country" size="large" />
          </Form.Item>
        ) : (
          user?.info?.country || "NIL"
        ),
      },
      {
        key: <p className="text-base font-medium text-[#646462]">Institution</p>,
        data: isEdit ? (
          <Form.Item name="institution" className="!m-0 !p-0">
            <Input placeholder="Enter your institution" size="large" />
          </Form.Item>
        ) : (
          user?.info?.institution || "NIL"
        ),
      },
      {
        key: <p className="text-base font-medium text-[#646462]">Course Taught</p>,
        data: isEdit ? (
          <Form.Item name="course_taught" className="!m-0 !p-0">
            <Input placeholder="Enter your course taught" size="large" />
          </Form.Item>
        ) : (
          user?.info?.course_taught || "NIL"
        ),
      },
      {
        notActive: isNoEditMail,
        key: <p className="text-base font-medium text-[#646462]">Password</p>,
        data: (
          <Button
            onClick={onPWOpen}
            className="text-primary text-sm font-medium !p-0 !m-0 !bg-transparent"
            type="text"
          >
            Change
          </Button>
        ),
      },
      {
        key: (
          <p className="text-base font-medium text-[#646462]">Subscription</p>
        ),
        data: (
          <div className="flex items-center">
            <p className="capitalize">{user?.info?.current_tier}</p>
            <Button
              loading={getSubsLoad}
              onClick={onSubOpen}
              className="text-primary text-sm font-medium !bg-transparent"
              type="text"
            >
              View Plans
            </Button>
          </div>
        ),
      },
      {
        data: isEdit ? (
          <div className="flex items-center gap-5">
            <Button
              onClick={onEdClose}
              className="text-primary"
              type="default"
              icon={<AiFillCloseCircle />}
            >
              Close
            </Button>
            <Button
              htmlType="submit"
              loading={setProfileLoad}
              className="bg-primary"
              type="primary"
              icon={<FiSave />}
            >
              Save update
            </Button>
          </div>
        ) : (
          <Button
            onClick={onEdOpen}
            className="text-primary"
            type="default"
            icon={<MdEdit />}
          >
            Edit details
          </Button>
        ),
      },
    ].filter(d => !d?.notActive),
    [user, isEdit, getSubsLoad, setProfileLoad, isNoEditMail]
  );

  const subscriptions = useMemo(
    () => [
      {
        key: "premium",
        title: "Premium",
        yearly: getSubsData?.data?.premium_year?.price,
        monthly: getSubsData?.data?.premium_month?.price,
        features: [
          "Get access to all features",
          `${
            getSubsData?.data?.[`premium_${actSubLowRep}`]?.credits
          } credits per ${actSubLowRep}`,
        ],
      },
      {
        key: "pro",
        title: "Pro",
        yearly: getSubsData?.data?.pro_year?.price,
        monthly: getSubsData?.data?.pro_month?.price,
        features: ["Unlimited transcription time", "Unlimited credit"],
      },
    ],
    [actSubLowRep, getSubsData]
  );

  const handlePasswSubmit = (d: any) => {
    const payload = {
      user: user?.info?._id,
      ...d,
    };
    putPasswordAction(payload);
  };

  const handleSubscribe = () => {
    const subscription = subscriptions?.find(({ key }) =>
      isEqual(key, subTier)
    );
    const payload = subscription?.[actSubLow as keyof typeof subscription];
    postPayAction(payload);
  };

  const handleSubResponse = async ({
    paymentIntent,
  }: {
    paymentIntent: any;
  }) => {
    const payload = {
      amount: paymentIntent?.amount / 100,
      duration: actSubLowRep,
      tier: subTier,
    };
    await postSubAction(payload).then((res) =>
      postVerifySubAction({
        reference: paymentIntent?.id,
        token: res?.data,
      })
    );
    onPayClose();
  };

  const subscriptionLoad = (postPayLoad || postSubLoad || postVerifySubLoad);
  return (
    <div className="w-full h-screen md:py-5 px-5 md:px-10 space-y-5 bg-white">
      <div className="flex justify-end md:justify-between items-center">
        <p className="hidden md:block text-3xl font-bold text-secondary">
          Account Settings
        </p>
        <Button
          className="bg-primary !rounded-3xl"
          onClick={onOpen}
          type="primary"
          size="large"
          hidden
        >
          Refer a Friend
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Avatar size={70} src={user?.info?.profile_img}>
            {extractAvatar(user?.info?.name || "USER")}
          </Avatar>
          <Upload {...uploadProps}>
            <Button loading={setProfileLoad}>Change photo</Button>
          </Upload>
        </div>
        <p className="text-2xl font-bold text-secondary">
          {user?.info?.name || "User"}
        </p>
        <div className="flex items-center gap-3 !hidden">
          <p className="text-sm font-medium text-[#A2A2A1]">Nurovant Code:</p>
          <div className="flex items-center gap-3">
            <p className="text-base font-medium text-[#838382]">{referCode}</p>
            <Button
              icon={<BsCopy className="text-xl font-extrabold" />}
              className="text-[#646462]"
              onClick={handleCopyCode}
              type="text"
            />
          </div>
        </div>
        <div>
          <p className="text-base font-medium flex items-center gap-2 text-[#646462]">
            <PiCoins />
            <span>{user?.info?.current_credit}</span>
          </p>
          <p className="text-sm font-medium text-[#838382]">Total credits</p>
        </div>
        <Form
          onFinish={setProfileAction}
          initialValues={user?.info}
          layout="vertical"
          form={form}
        >
          <CustomTable
            column={[
              { dataIndex: "key", render: (d: any) => d },
              { dataIndex: "data", render: (d: any) => d },
            ]}
            pagination={false}
            data={details}
            noHeader
          />
        </Form>
      </div>

      {/* change password modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  */}
      <Modal
        footer={false}
        open={isPWOpen}
        closeIcon={false}
        onCancel={onPWClose}
      >
        <div className="w-full md:p-5 flex flex-col justify-center items-center text-center gap-7">
          <p className="text-[26px] font-bold text-secondary">
            Change Password
          </p>
          <p className="text-sm font-normal text-[#646462]">
            Enhance your digital security by initiating a password reset for
            strengthened protection.
          </p>
          <Form onFinish={handlePasswSubmit} className="w-full space-y-10">
            <div className="relative">
              <label
                htmlFor="password"
                className="absolute z-10 -top-5 left-3 bg-[#E0E0E0] !text-xs font-semibold text-dark px-2 py-1 border-2 border-[#E0E0E0] rounded-3xl"
              >
                Old Password
              </label>
              <Form.Item name="old_password" className="!relative">
                <Input
                  className="px-5 py-3 rounded-xl"
                  placeholder="Password"
                  type="password"
                  id="password"
                  size="large"
                />
              </Form.Item>
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="absolute z-10 -top-5 left-3 bg-[#E0E0E0] !text-xs font-semibold text-dark px-2 py-1 border-2 border-[#E0E0E0] rounded-3xl"
              >
                New Password
              </label>
              <Form.Item name="password" className="!relative">
                <Input
                  className="px-5 py-3 rounded-xl"
                  placeholder="Password"
                  type="password"
                  id="password"
                  size="large"
                  required
                />
              </Form.Item>
            </div>
            <Button
              className="w-full md:w-[70%] bg-primary !h-[50px]"
              loading={putPasswordLoad}
              htmlType="submit"
              type="primary"
              shape="round"
              size="large"
            >
              Save
            </Button>
          </Form>
        </div>
      </Modal>

      {/* referral modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  */}
      <Modal open={isOpen} footer={false} closeIcon={false} onCancel={onClose}>
        <div className="w-full md:p-5 flex flex-col justify-center items-center text-center gap-5">
          <Image alt="refer" src={referImage} />
          <p className="text-3xl font-bold text-secondary">
            Refer now and earn credits
          </p>
          <p className="text-sm font-normal text-[#646462]">
            Sharing is rewarding! Invite your friends to Reflectly, and you'll
            both receive 10 credits to explore our premium offerings.
          </p>
          <Input
            className="!border-none !bg-transparent"
            defaultValue={referURL}
            value={referURL}
            size="large"
            readOnly
            suffix={
              <Button
                icon={<BsCopy className="text-xl font-extrabold" />}
                className="text-primary"
                onClick={handleCopyRefer}
                type="text"
              />
            }
          />
        </div>
      </Modal>

      {/* subscription modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  */}
      <Modal
        footer={false}
        open={isSubOpen}
        closeIcon={false}
        onCancel={onSubClose}
      >
        <Spin spinning={getSubsLoad}>
          {isPayOpen && postPayData ? (
            <SubscribeContent
              clientSecret={postPayData?.client_secret!}
              action={handleSubResponse}
            />
          ) : (
            <div className="w-full md:p-5 flex flex-col justify-center items-center text-center gap-5">
              <p className="text-2xl font-bold text-secondary">Subscription</p>
              <div className="w-full md:w-[50%] mx-auto rounded-3xl p-1 grid grid-cols-2 bg-[#F5F5F5]">
                {["Monthly", "Yearly"].map((d) => {
                  const handleSub = () => setActSub(d);
                  const act = isEqual(actSub, d);
                  return (
                    <Button
                      className={`text-sm font-medium ${
                        act ? "bg-white text-primary" : "text-[#838382]"
                      }`}
                      type={act ? "primary" : "text"}
                      onClick={handleSub}
                      shape="round"
                      size="large"
                      block
                    >
                      {d}
                    </Button>
                  );
                })}
              </div>
              <Radio.Group
                onChange={({ target: { value } }) => setSubPlan(value)}
                className="!w-full space-y-5"
                value={subPlan}
                size="large"
              >
                {subscriptions.map((d) => {
                  const subLow = actSub?.toLowerCase();
                  const value = `${d?.key}_${actSubLowRep}`;
                  return (
                    <div className="w-full border border-[#E0E0E0] rounded-2xl py-3">
                      <div className="flex justify-between items-center px-5">
                        <p className="text-lg font-semibold text-[#1A2651]">
                          {d?.title}
                        </p>
                        <Radio value={value} />
                      </div>
                      <Divider className="!my-2" />
                      <div className="text-start space-y-3 px-5">
                        <p className="text-[32px] font-semibold text-primary">
                          ${d?.[subLow as keyof typeof d]}
                          <sub className="text-base font-medium text-[#646462]">
                            /{subLow}
                          </sub>
                        </p>
                        {d?.features?.map((f) => (
                          <Button
                            className="!w-full !truncate !p-0 !m-0 !bg-transparent !text-start"
                            icon={
                              <FaCheckCircle className="text-primary text-xl !bg-transparent" />
                            }
                            block
                            type="text"
                          >
                            {f}
                          </Button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </Radio.Group>
              <Button
                className="w-[80%] !h-[50px] bg-primary"
                disabled={isEqual(subPlan, actPlan)}
                loading={subscriptionLoad}
                onClick={handleSubscribe}
                type="primary"
                shape="round"
                size="large"
              >
                Continue
              </Button>
              <p className="text-sm font-normal text-[#646462]">
                Upgrade your plan today and enjoy the best our platform has to
                offer.{" "}
                <Link
                  to="https://www.nurovant.com/termofservice.html"
                  target="_blank"
                  className="text-primary"
                >
                  Our terms of service
                </Link>
              </p>
            </div>
          )}
        </Spin>
      </Modal>
    </div>
  );
}

export default SettingsPage;
