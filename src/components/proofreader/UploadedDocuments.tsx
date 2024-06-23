import { Button, Form, Input } from "antd";
import React from "react";
import { BsJournalText } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { LuSearch } from "react-icons/lu";

interface IUploadedProps {
  data: any;
  getData: any;
  setSelected: any;
  setQuery: any;
}

export const UploadedDocuments = ({
  data,
  getData,
  setSelected,
  setQuery,
}: IUploadedProps) => {
  console.log("ggg", getData);
  return (
    <div className="bg-white px-4 py-8 flex flex-col gap-[22px] rounded-[8px] w-full lg:w-[317px] h-fit font-montserrat">
      <h2 className="text-[#414141] font-semibold text-[18px] leading-[27px]">
        Uploaded Documents
      </h2>
      <div className="w-full flex flex-col gap-4">
        {/* <div className="w-full flex items-center gap-3 bg-[#F5F5F5] py-4 px-2 rounded-[8px]">
          <LuSearch size={20} className="cursor-pointer" onClick={() => {}} />
          <input
            type="text"
            placeholder="Search your files here"
            className="outline-none focus:ring-0 bg-inherit text-[14px] leading-[20px]"
          />
        </div> */}
        <Form onFinish={setQuery}>
          <Form.Item name="search">
            <Input
              placeholder="Search your files here"
              size="large"
              prefix={
                <Button htmlType="submit" type="text" icon={<FiSearch />} />
              }
            />
          </Form.Item>
        </Form>

        <div hidden={!data?.data?.length} className="space-y-2">
          {getData.map((d: any) => {
            const handleSelect = () => setSelected(d);
            return (
              <div
                onClick={handleSelect}
                className="w-full p-1 flex items-center gap-2 whitespace-nowrap truncate cursor-pointer"
              >
                <BsJournalText className="!text-[24px] !font-medium !text-[#676767]" />
                <p className="text-sm font-medium text-[#676767]">{d?.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
