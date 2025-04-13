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
import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export function FlipCard({
  front,
  back,
  isFlipped,
  onClick,
}: {
  front: string;
  back: string;
  isFlipped: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`w-full md:w-[400px] h-[450px] md:h-[500px] flex items-center justify-center gap-5 mx-auto border border-[#f7f6f8] rounded-lg shadow-xl px-5 py-10`}
      style={{ perspective: "1000px" }}
      onClick={onClick}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {/* Front of card */}
        <motion.div
          className={
            "absolute h-full w-full backface-hidden flex flex-col items-center justify-center gap-4 p-8 text-center"
          }
          style={{ backfaceVisibility: "hidden" }}
        >
          <h2 className="text-3xl font-semibold">{front}</h2>
          <p className="text-sm text-gray-400">Tap to view meaning</p>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className={
            "absolute h-full w-full backface-hidden flex flex-col items-center justify-center gap-4 p-8 text-center"
          }
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h2 className="text-3xl font-semibold">{back}</h2>
          <p className="text-sm text-gray-400">Tap to view word</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

const FlashcardSection = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const id = params.get("id");
  const [activeQuest, setActiveQuest] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const resetQuest = () => setActiveQuest(0);
  const goBack = () => navigate("/");

  const { data: getFlashcardData, isLoading: getFlashcardLoad } =
    useGetFlashcard(id!);

  const handleSubmit = () => {};

  const CurrentFlashcard: any = useMemo(
    () => getFlashcardData?.data?.flash_cards?.[activeQuest],
    [activeQuest, getFlashcardData?.data?.flash_cards]
  );

  const handlePrevious = () => {
    setActiveQuest(activeQuest - 1);
    setShowMeaning(false);
  };

  const handleNext = () => {
    setActiveQuest(activeQuest + 1);
    setShowMeaning(false);
  };

  return (
    <Spin spinning={getFlashcardLoad}>
      <div className="w-full md:min-h-[95vh] flex flex-col justify-between items-center md:py-5 space-y-5 bg-white">
        <div className="w-full flex items-center px-5 md:px-10 gap-5">
          <MdCancel className="cursor-pointer text-3xl" onClick={goBack} />
          <div className="w-full pb-1 flex flex-nowrap items-center gap-3 overflow-x-auto">
            {getFlashcardData?.data?.flash_cards?.map((d: any, idx: number) => (
              <Button
                type="primary"
                key={idx}
                onClick={() => setActiveQuest(idx)}
                className={`!w-[150px] !h-[13px] ${
                  isEqual(idx, activeQuest) ? "bg-primary" : "bg-fint"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 whitespace-nowrap">
            {activeQuest + 1} of {getFlashcardData?.data?.flash_cards?.length}
          </span>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-10">
          <div className="relative w-full">
            <Button
              icon={<LeftOutlined />}
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
              }}
              onClick={handlePrevious}
              disabled={activeQuest === 0}
            />
            {/* <div className="flex items-center justify-center gap-2 flex-col w-full">
              
              <p className="text-dark text-[24px] md:text-[28px] leading-[40px] text-center w-full font-bold">
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
            </div> */}
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
            <FlipCard
              front={CurrentFlashcard?.word}
              back={CurrentFlashcard?.meaning}
              isFlipped={showMeaning}
              onClick={() => setShowMeaning(!showMeaning)}
            />

            <Button
              icon={<RightOutlined />}
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
              }}
              onClick={handleNext}
              disabled={
                activeQuest + 1 ===
                getFlashcardData?.data?.flash_cards?.length - 1
              }
            />
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

        {/* <div className="w-full">
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
                getFlashcardData?.data?.flash_cards?.length
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
        </div> */}
      </div>
    </Spin>
  );
};

export default FlashcardSection;
