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

const FlashcardSection = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const id = params.get("id");
  const [activeQuest, setActiveQuest] = useState(0);

  const resetQuest = () => setActiveQuest(0);
  const goBack = () => navigate("/");

  const { data: getFlashcardData, isFetching: getFlashcardLoad } =
    useGetFlashcard(id!);
  console.log(getFlashcardData?.data?.flashCards);

  const handleSubmit = () => {};

  const CurrentFlashcard: any = useMemo(
    () => getFlashcardData?.data?.flashCards?.[activeQuest],
    [activeQuest, getFlashcardData?.data?.flashCards]
  );

  return (
    <Spin spinning={getFlashcardLoad}>
      <div className="w-full min-h-[95vh] flex flex-col justify-between items-center md:py-5 space-y-5">
        <div className="w-full flex items-center px-5 md:px-10 gap-5">
          <MdCancel className="cursor-pointer text-3xl" onClick={goBack} />
          <div className="w-full pb-1 flex flex-nowrap items-center gap-3 overflow-x-auto">
            {getFlashcardData?.data?.flashCards?.map((d: any, idx: number) => (
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
          <div className="w-[272px] flex items-center justify-center gap-5 mx-auto border border-[#f7f6f8] rounded-lg shadow-xl px-5 py-10">
            <div className="flex items-center justify-center gap-2 flex-col w-full">
              {/* <span className="px-4 py-2 border border-[#F2F2FA] rounded-3xl">
                {activeQuest + 1}/{getFlashcardData?.data?.flashCards?.length}
              </span> */}
              <p className="text-dark font-medium text-[32px] leading-[40px] text-center w-full">
                {CurrentFlashcard?.word}
              </p>
              <span className="text-[18px] leading-[20px] text-dark text-center">
                {CurrentFlashcard?.meaning}
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
              onClick={() => setActiveQuest(activeQuest - 1)}
              disabled={!activeQuest}
              size="large"
            >
              Prev
            </Button>
            <Button
              className="border-primary text-primary rounded-xl"
              disabled={isEqual(
                activeQuest + 1,
                getFlashcardData?.data?.flashCards?.length
              )}
              onClick={() => setActiveQuest(activeQuest + 1)}
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

export default FlashcardSection;
