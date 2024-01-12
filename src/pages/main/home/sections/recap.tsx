import { useGetFlashcard } from "../../../../hooks/flashcards/flashcards";
import {
  Button,
  Divider,
  Input,
  Popconfirm,
  Radio,
  Space,
  Spin,
  Tag,
} from "antd";
import React, { useMemo, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isEqual } from "../../../../context/utils";
import { useRecoilValue } from "recoil";
import authAtom from "../../../../atoms/auth/auth.atom";
import { useGetRecap } from "../../../../hooks/recap/recap";

const RecapSection = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const id = params.get("id");
  const [activeQuest, setActiveQuest] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const resetQuest = () => setActiveQuest(0);
  const goBack = () => navigate("/");

  const { data: getRecapData, isFetching: getRecapLoad } =
    useGetRecap(id!);
  console.log(getRecapData?.data?.flashCards);

  const handleSubmit = () => {};

  const CurrentFlashcard: any = useMemo(
    () => getRecapData?.data?.flashCards?.[activeQuest],
    [activeQuest, getRecapData?.data?.flashCards]
  );

  return (
    <Spin spinning={getRecapLoad}>
      <div className="w-full min-h-[95vh] flex flex-col justify-between items-center md:py-5 space-y-5">
        <div className="w-full flex items-center px-5 md:px-10 gap-5">
          <MdCancel className="cursor-pointer text-3xl" onClick={goBack} />
          <div className="w-full pb-1 flex flex-nowrap items-center gap-3 overflow-x-auto">
            {getRecapData?.data?.flashCards?.map((d: any, idx: number) => (
              <Button
                type="primary"
                onClick={() => setActiveQuest(idx)}
                className={`!w-[150px] !h-[13px] ${
                  isEqual(idx, activeQuest) ? "bg-primary" : "bg-fint"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-10">
          <div className="w-[282px] flex items-center justify-center gap-5 mx-auto border border-[#f7f6f8] rounded-lg shadow-xl px-5 py-10">
            <div className="flex items-center justify-center gap-2 flex-col w-full">
              {/* <span className="px-4 py-2 border border-[#F2F2FA] rounded-3xl">
                {activeQuest + 1}/{getRecapData?.data?.flashCards?.length}
              </span> */}
              <p className="text-dark text-[32px] leading-[40px] text-center w-full font-bold">
                {showMeaning
                  ? CurrentFlashcard?.meaning
                  : CurrentFlashcard?.word}
              </p>
              <span
                className="text-[14px] leading-[20px] text-[#c1c1c0] text-center cursor-pointer"
                onClick={() => {
                  setShowMeaning((prev) => !prev);
                }}
              >
                Tap to view {showMeaning ? "word" : "meaning"}
              </span>
            </div>
            {/* {CurrentQuest?.answered ? ( */}
            {/* <div className="space-y-3">
                <p>Correct Answer: {CurrentQuest?.answer}</p>
                <p>Your Answer: {CurrentQuest?.user_answer}</p>
                <p>
                  Status:{" "}
                  <Tag color={CurrentQuest?.status ? "success" : "error"}>
                    {CurrentQuest?.statue ? "Correct" : "Incorrect"}
                  </Tag>
                </p>
              </div> */}
            {/* ) : CurrentQuest?.mcq ? ( */}
            {/* <Radio.Group
                onChange={(e) => handleAnswer(e?.target?.value)}
                value={CurrentQuest?.response}
              >
                <Space direction="vertical">
                  {CurrentQuest?.options?.map((d: any) => (
                    <Radio value={d}>{d}</Radio>
                  ))}
                </Space>
              </Radio.Group> */}
          </div>
          <Popconfirm
            okButtonProps={{ type: "primary", className: "bg-primary" }}
            description="details will be submitted by clicking OK"
            title="Are you sure to end session?"
            onConfirm={handleSubmit}
          >
            <Button
              className="!font-bold"
              //   loading={postAnsLoad}
              type="text"
              danger
            >
              End Session
            </Button>
          </Popconfirm>
        </div>

        <div className="w-full">
          <Divider />
          <div className="flex gap-10 justify-center items-center">
            <Button
              className="border-primary text-primary rounded-xl"
              onClick={() => {
                setActiveQuest(activeQuest - 1);
                setShowMeaning(false);
              }}
              disabled={!activeQuest}
              size="large"
            >
              Prev
            </Button>
            <Button
              className="border-primary text-primary rounded-xl"
              disabled={isEqual(
                activeQuest + 1,
                getRecapData?.data?.flashCards?.length
              )}
              onClick={() => {
                setActiveQuest(activeQuest + 1);
                setShowMeaning(false);
              }}
              size="large"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default RecapSection;
