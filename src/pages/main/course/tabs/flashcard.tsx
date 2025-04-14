import React, { useState } from 'react'
import { useGetLectureById } from '../../../../hooks/lecture/lecture';
import { useSearchParams } from 'react-router-dom';
import { Button, Spin } from 'antd';
import EmptyDisplay from '../../../../components/EmptyDisplay';
import { LuPlus } from 'react-icons/lu';
import { motion } from "framer-motion";
import { useGetFlashcard, usePostFlashcards } from '../../../../hooks/flashcards/flashcards';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { isEqual } from '../../../../context/utils';


function FlipCard({
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
      onClick={onClick}
      style={{ perspective: "1000px" }}
      className={`w-full md:w-[400px] h-[450px] md:h-[500px] flex items-center justify-center gap-5 mx-auto border border-[#f7f6f8] rounded-lg shadow-xl px-5 py-10`}
    >
      <motion.div
        initial={false}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{duration: 0.6, type: "spring", stiffness: 500, damping: 30}}
      >
        {/* Front of card */}
        <motion.div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute h-full w-full backface-hidden flex flex-col items-center justify-center gap-4 p-8 text-center"
        >
          <p className="text-3xl font-semibold">{front}</p>
          <p className="text-sm text-gray-400">Tap to view meaning</p>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="absolute h-full w-full backface-hidden flex flex-col items-center justify-center gap-4 p-8 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-3xl font-semibold">{back}</p>
          <p className="text-sm text-gray-400">Tap to view word</p>
        </motion.div>
      </motion.div>
    </div>
  );
}



function FlashcardTab() {
  const [param] = useSearchParams()
  const lecture = param.get("lecture")
  const [activeQuest, setActiveQuest] = useState(0)
  const [showMeaning, setShowMeaning] = useState(false)

  const {
    data: getLectureData,
    refetch: getLectureFetch,
    isLoading: getLectureLoad,
  } = useGetLectureById({ id: lecture })

  const {
    data: getFlashcardData,
    refetch: getFlashcardFetch,
    isLoading: getFlashcardLoad,
  } = useGetFlashcard(getLectureData?.flash_card?._id)

  const {
    mutate: postFlashcardAction,
    isLoading: postFlashcardLoad,
  } = usePostFlashcards(() => {getLectureFetch(); (getLectureData?.flash_card?._id && getFlashcardFetch())}, lecture!)

  const flashcardData = (getFlashcardData?.data || getLectureData?.flash_card)
  const CurrentFlashcard: any = (flashcardData?.flash_cards || [])?.at(activeQuest)

  const handleCreateFlashcard = () => postFlashcardAction({ lecture_id: lecture })
  const handlePrev = () => {setActiveQuest(activeQuest - 1); setShowMeaning(false)}
  const handleNext = () => {setActiveQuest(activeQuest + 1); setShowMeaning(false)}
  return (
    <Spin spinning={getLectureLoad || getFlashcardLoad}>
      <div className='w-full'>
        <EmptyDisplay hidden={getLectureData?.flash_card} className='w-full h-[50vh]'>
          <Button loading={postFlashcardLoad} onClick={handleCreateFlashcard} className='!text-sm !font-bold bg-[#4970FC]' icon={<LuPlus className='text-xl' />} size='large' type='primary' shape='round'>Generate material</Button>
        </EmptyDisplay>

        <div hidden={!getLectureData?.flash_card} className='w-full space-y-5'>
          <div className="w-full flex flex-col justify-between items-center md:py-5 space-y-3 bg-white">
            <div className="w-full flex items-center px-5 md:px-10 gap-5">
              <div className="w-full pb-1 flex flex-nowrap items-center gap-3 overflow-x-auto">
                {flashcardData?.flash_cards?.map((d: any, idx: number) => (
                  <Button
                    key={idx}
                    type="primary"
                    onClick={() => setActiveQuest(idx)}
                    className={`!w-[150px] !h-[13px] ${isEqual(idx, activeQuest) ? "bg-primary" : "bg-fint"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {activeQuest + 1} of {flashcardData?.flash_cards?.length}
              </span>
            </div>
    
            <div className="w-full flex justify-between items-center gap-10">
              <Button
                shape='circle'
                onClick={handlePrev}
                icon={<LeftOutlined />}
                disabled={!activeQuest}
              />

              <FlipCard
                isFlipped={showMeaning}
                front={CurrentFlashcard?.word}
                back={CurrentFlashcard?.meaning}
                onClick={() => setShowMeaning(!showMeaning)}
              />

              <Button
                shape='circle'
                onClick={handleNext}
                icon={<RightOutlined />}
                disabled={isEqual((activeQuest + 1), flashcardData?.flash_cards?.length)}
              />
            </div>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default FlashcardTab