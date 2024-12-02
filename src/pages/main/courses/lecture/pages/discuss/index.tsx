import React from "react";
import BackButton from "../../components/BackButton";
import { BorderHOC } from "../../../../../../components";
import MessagePic from "../../../../../../assets/messages.svg";
import Send2Image from "../../../../../../assets/send-2.svg";
import { Button, Form, Input } from "antd";
import { IoCopyOutline } from "react-icons/io5";

const DiscussPage = () => {
  const [form] = Form.useForm();
  const handleSubmit = (d: any) => {
    console.log(d);
  };
  const [showContent, setShowContent] = React.useState(false);
  return (
    <div className="min-h-[75vh] h-full w-full flex flex-col items-center justify-between">
      <div className="w-full flex flex-col gap-6">
        <BackButton text="Go Back" />
        <BorderHOC />
      </div>
      <div className="w-full flex flex-col gap-[80px]">
        {showContent === false && (
          <div className="flex items-center justify-center flex-col gap-4">
            <img
              src={MessagePic}
              alt="messages"
              className="w-[100px] h-[100px]"
            />

            <p className="text-[20px] leading-[30px] text-neutral-900 text-center w-[414px]">
              Hey there, I&apos;m here to assist you with any questions you have
              about the content of the document.
            </p>
          </div>
        )}
        {showContent === false && (
          <div className="w-full grid grid-cols-3 gap-[15px]">
            {[
              {
                header: "Whats the material all about?",
                text: "Give me the main idea or purpose of the content of the material.",
              },
              {
                header: "Summarize this material",
                text: "Provide a brief overview of the main points or key takeaways from the content.",
              },
              {
                header: "Give me keywords regarding this material",
                text: "Identify important words or phrases that capture the core themes or topics of the content.",
              },
            ].map((item, idx) => (
              <div
                className="w-full flex flex-col cursor-pointer"
                key={idx}
                onClick={() => {
                  setShowContent(true);
                }}
              >
                <BorderHOC rounded="rounded-[10px]">
                  <div className="flex flex-col p-6">
                    <h4 className="text-base font-bold text-neutral-900">
                      {item.header}
                    </h4>
                    <span className="text-sm font-medium text-neutral-500">
                      {item.text}
                    </span>
                  </div>
                </BorderHOC>
              </div>
            ))}
          </div>
        )}
        <div className={`w-full ${showContent && "flex flex-col gap-[72px] "}`}>
          {showContent && (
            <div className="w-full flex gap-[10px]">
              <div className="w-[34px] h-[34px]">
                <BorderHOC rounded="rounded-[1000px]">
                  <div className="w-full h-[full] p-1 flex items-center justify-center">
                    <img
                      src={MessagePic}
                      alt="messages"
                      className="w-[20px] h-[20px]"
                    />
                  </div>
                </BorderHOC>
              </div>
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm font-medium text-neutral-900">
                  “Today's lecture covered the creation of a travel-booking app,
                  designed with simplicity and intuitiveness in mind, similar to
                  Airbnb. The homepage of the app features a scrollable feed
                  with listings categorized by type, displaying essential
                  information such as title, rating, price, and thumbnail image.
                  The bottom menu includes Home, Search, Bookings, Messages, and
                  Profile icons.Listing Details provides in-depth information
                  about properties or experiences, including images,
                  descriptions, amenities, reviews, and a map view. Merchant
                  Information is also highlighted, allowing users to learn more
                  about the host through a popup modal that displays their full
                  profile, including bio, ratings, and other listings.For
                  non-logged-in users, the app still offers an enriched browsing
                  experience, showcasing previews of listings and merchant
                  information. However, logging in or registering is necessary
                  for actions like booking or accessing detailed merchant
                  profiles. The app simplifies the login process using an OTP
                  system for both email and phone number verifications.The
                  design excludes banners and advertisements, focusing solely on
                  listings. The app navigation is intuitive with clear
                  distinctions between different sections, and easy access to
                  the user's cart, bookings, and messages. A cart system is
                  integrated into the app, allowing users to add multiple
                  listings before proceeding to checkout, making trip planning
                  more manageable.”
                </span>
                <IoCopyOutline className="text-[14px] text-neutral-900" />
              </div>
            </div>
          )}
          {showContent && (
            <div className="w-full flex justify-end">
              <div className="w-[360px] flex flex-col">
                <BorderHOC rounded="rounded-[10px]">
                  <div className="flex flex-col p-6">
                    <h4 className="text-base font-bold text-neutral-900">
                      {"Give me keywords regarding this material"}
                    </h4>
                    <span className="text-sm font-medium text-neutral-500">
                      {
                        "Identify important words or phrases that capture the core themes or topics of the content."
                      }
                    </span>
                  </div>
                </BorderHOC>
              </div>
            </div>
          )}
          <Form
            form={form}
            onFinish={handleSubmit}
            className="!w-full relative"
          >
            <Form.Item name="question">
              <Input
                required
                size="large"
                placeholder="Ask me anything"
                className="!h-[50px] !rounded-[100px] !pl-[20px] !pr-[5px] !py-[14px] bg-[#f5f5f5] bg-opacity-90"
              />
            </Form.Item>
            <Button
              // loading={postDisChatLoad}
              className="bg-white rounded-[10000px] h-[40px] w-[40px] absolute right-[5px] top-[5px] flex items-center justify-center !p-0"
              htmlType="submit"
              type="primary"
              shape="round"
              size="large"
            >
              <img src={Send2Image} alt="send" className="w-[20px] h-[20px]" />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DiscussPage;
