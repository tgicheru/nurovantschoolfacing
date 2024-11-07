import React, { useState } from "react";
import {
  useGetAdaptiveLearning,
  useGetALQuiz,
  usePostALQuiz,
} from "../../../../hooks/adaptivelearning/adaptivelearning";
import { useSearchParams } from "react-router-dom";
import { Button, Collapse, Spin } from "antd";
import { ImSpinner } from "react-icons/im";
import CustomPagination from "../../../../components/CustomPagination";
import { isEqual } from "../../../../context/utils";

function AnalysisTab() {
  const [params] = useSearchParams();
  const id = params.get("id");

  const {
    data: getALData,
    refetch: getALFetch,
    isLoading: getALLoad,
  } = useGetAdaptiveLearning(id!);
  const {
    data: getALQuizData,
    refetch: getALQuizFetch,
    isLoading: getALQuizLoad,
  } = useGetALQuiz(id!);

  const { mutate: postALQuizAction, isLoading: postALQuizLoad } = usePostALQuiz(
    () => {
      getALFetch();
      getALQuizFetch();
    }
  );

  // console.log("quiz data", getALQuizData);

  // const isSaved = ["knowledgeGraph_saved", "quizResult_saved"].includes(getALData?.data?.quiz?.status)

  // https://als-data-analysis-nrdi.codecapsules.co.za/

  const fetchLoad = getALLoad || getALQuizLoad;
  return (
    <Spin spinning={fetchLoad}>
      <div className="w-full">
        {/* add iframe woth the link above */}
        <iframe
          src={`https://als-data-analysis-nrdi.codecapsules.co.za?file=${getALQuizData?.data?.aws_path}`}
          width="100%"
          height="800px"
          title="ALS Data Analysis"
        ></iframe>
        <div className=""></div>
      </div>
    </Spin>
  );
}

export default AnalysisTab;
