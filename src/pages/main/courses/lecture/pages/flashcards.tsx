import React from "react";
import { useSearchParams } from "react-router-dom";

const FlashcardPage = () => {
  const [param, setParam] = useSearchParams();

  return (
    <div className="w-full flex flex-col">
      <div></div>
    </div>
  );
};

export default FlashcardPage;
