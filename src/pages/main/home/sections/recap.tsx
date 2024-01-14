import {
  Button,
  Divider,
  Spin,
  message,
} from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetRecap } from "../../../../hooks/recap/recap";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useMemo, useState } from "react";
import { FaChevronRight, FaClipboard } from "react-icons/fa";
import { isEqual } from "../../../../context/utils";
import Loading from "../../../../components/loading";

const RecapSection = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [activeTab, setActiveTab] = useState("mini_reflections");
  const id = params.get("id");

  const goBack = () => navigate("/?tab=recaps");

  const { data: getRecapData, isFetching: getRecapLoad } = useGetRecap(id!);

  const tabs = useMemo(() => [
    {
      title: "Summary",
      extra: "bullet_points",
      key: "mini_reflections",
      label: "Mini Reflection",
      description: "Tailored for speedy understanding, it pinpoints essential details instantly.",
    },
    {
      title: "Overall",
      key: "reflections",
      label: "Overall Reflection",
      description: "Uncover a comprehensive understanding of your content.",
    },
  ], [])

  const currentTab = useMemo(() => tabs.find(({key}) => isEqual(key, activeTab)), [activeTab, tabs])
  const handleCopy = () => {
    message.success("Copied to clipboard");
    navigator.clipboard.writeText(`
      Mini Reflection: ${getRecapData?.data?.mini_reflections},
      Key Points: ${getRecapData?.data?.bullet_points?.join(", ")}.
      Overall Reflection ${getRecapData?.data?.reflections}.
    `);
  };

  if (getRecapLoad) return <Loading />
  if (!isEqual(getRecapData?.data?.status, "Success")) return <div className="w-full h-screen flex justify-center items-center px-5 md:px-10 gap-5">
    <RiArrowGoBackFill className="cursor-pointer text-xl text-[#646462]" onClick={goBack} />
    <p className="text-[28px] font-bold text-dark">Recaps Data Not Ready Yet!</p>
  </div>
  return (
    <Spin spinning={getRecapLoad}>
      <div className="w-full min-h-[95vh] flex flex-col items-center md:py-5 space-y-5">
        <div className="w-full">
          <div className="w-full flex items-center px-5 md:px-10 gap-5">
            <RiArrowGoBackFill className="cursor-pointer text-xl text-[#646462]" onClick={goBack} />
            <p className="text-[28px] font-bold text-dark">{getRecapData?.data?.name}</p>
          </div>

          <Divider className='!mb-0' />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5 ">
          <div className="space-y-1">
            {tabs.map(({description, key, label}) => {
              const isAct = isEqual(key, activeTab)
              return (
              <div onClick={() => setActiveTab(key)} className={`w-full cursor-pointer p-5 md:p-10 space-y-2 hover:bg-[#F9F9F9] ${isAct && "bg-[#F9F9F9]"}`}>
                <div className="w-full flex justify-between items-center">
                  <p className={`text-[22px] font-medium  ${isAct ? "text-primary" : "text-[#838382]"}`}>{label}</p>
                  <FaChevronRight className="text-[#C1C1C0]" />
                </div>
                <p className="text-xs font-medium text-[#1A265180]">{description}</p>
              </div>
            )})}
          </div>

          <div className="md:col-span-2">
            <div className="w-full md:w-[80%] min-h-full mx-auto rounded-xl shadow-2xl drop-shadow-2xl p-5 space-y-5 relative">
              <Divider className="!mb-0 !text-xs !font-normal !text-[#646462]">{currentTab?.title}</Divider>
              <p className="text-base font-normal text-[#1B1B1B] text-cente leading-6">{getRecapData?.data?.recaps?.[activeTab]}</p>
              <div className="space-y-3" hidden={!currentTab?.extra || getRecapLoad}>
                <p className="text-sm font-medium text-dark">Key Points</p>
                <ul className="text-sm text-dark !list-disc px-5">
                  {getRecapData?.data?.recaps?.[currentTab?.extra as any]?.map((d: any) => (
                    <li>{d}</li>
                  ))}
                </ul>
              </div>
              <Button
                className="!absolute !right-5 !bottom-5 bg-primary"
                icon={<FaClipboard />}
                onClick={handleCopy}
                shape="circle"
                type="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default RecapSection;
