import React from "react";
import { useSearchParams } from "react-router-dom";
import FlashcardSection from "../../sections/flashcard";

const FlashcardPage = () => {
  const [param, setParam] = useSearchParams();

  return (
    <div className="w-full flex flex-col">
      <FlashcardSection />
    </div>
  );
};

export default FlashcardPage;
