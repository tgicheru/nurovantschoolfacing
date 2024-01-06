import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetFlashcard } from "../../../../hooks/flashcards/flashcards";

const FlashcardSection = () => {
  const [params, setParams] = useSearchParams();
  const id = params.get("id");

  const { data: getQuizData, isFetching: getQuizLoad } = useGetFlashcard(id!);
  console.log(getQuizData);

  return (
    <div>
      <div></div>flashcardSection
    </div>
  );
};

export default FlashcardSection;
