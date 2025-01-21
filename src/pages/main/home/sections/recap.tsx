import { Button, Card, Divider, Spin, Tabs, Tag, message } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetRecap } from "../../../../hooks/recap/recap";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useEffect, useMemo, useState } from "react";
import { FaChevronRight, FaClipboard } from "react-icons/fa";
import { handleCapitalize, isEqual } from "../../../../context/utils";
import Loading from "../../../../components/loading";
import { IoCopyOutline } from "react-icons/io5";
import { ImQuotesLeft } from "react-icons/im";

const RecapSection = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("mini_reflections");
  const [miniViewList, setMiniViewList] = useState<number[]>([]);

  const id = params.get("id");
  const level = params.get("level");
  const section = params.get("section");

  const [refechValue, setRefetchValue] = useState(false);
  const [levelValue, setLevelValue] = useState(null);

  useEffect(() => {
    refetch();
  }, [level, refechValue]);

  const goBack = () => navigate("/?tab=recaps");

  const {
    data: getRecapData,
    isLoading: getRecapLoad,
    refetch,
    isRefetching: getRecapRefetch,
  } = useGetRecap(
    id!,
    level !== "on" || level !== null
      ? {
          grade_level: handleCapitalize(
            (level as string) || (levelValue as unknown as string)
          ),
        }
      : {}
  );

  const tabs = useMemo(
    () =>
      [
        {
          title: "Summary",
          label: "Mini Recaps",
          key: "mini_reflections",
          description:
            "Tailored for speedy understanding, it pinpoints essential details instantly.",
        },
        {
          title: "Overall",
          key: "reflections",
          extra: "bullet_points",
          label: "Overall Recaps",
          description: "Uncover a comprehensive understanding of your content.",
        },
        {
          title: "Transcription",
          label: "Transcription",
          key: "full_transcriptions",
          description: "Your original file converted to transcript.",
        },
      ].filter(({ key }) =>
        Object.keys(getRecapData?.data?.recaps || {})?.includes(key)
      ),
    [getRecapData]
  );

  const currentTab = useMemo(
    () => tabs.find(({ key }) => isEqual(key, activeTab)),
    [activeTab, tabs]
  );
  const titles = useMemo(() => {
    if (activeTab === "mini_reflections")
      return `${getRecapData?.data?.name} - Mini Recaps`;
    else if (activeTab === "reflections")
      return `${getRecapData?.data?.name} - Overall Recaps`;
    else if (activeTab === "full_transcriptions")
      return `${getRecapData?.data?.name} - Transcription`;
  }, [activeTab, getRecapData?.data?.name]);

  const {
    isMiniRecapTab,
    miniRecapObj,
    currentRecapData,
    currentRecapExtra,
    miniRecapCount,
  } = useMemo(() => {
    const currentRecapExtra =
      getRecapData?.data?.recaps?.[currentTab?.extra as any];
    const miniRecapData = getRecapData?.data?.recaps?.mini_reflections;
    const currentRecapData = getRecapData?.data?.recaps?.[activeTab];
    const isMiniObject = typeof miniRecapData === "object";
    const isMiniRecapTab = activeTab === "mini_reflections";
    const miniRecapObj = isMiniObject
      ? miniRecapData
      : {
          CHUNK_REFLECTION_0: miniRecapData,
          CHUNK_BULLET_POINT_0: [],
          CHUNK_STATEMENT_0: "",
        };
    const miniRecapArr = Object.entries(miniRecapObj || {});
    const miniRecapCount = miniRecapArr?.filter(([key]) =>
      key?.toLowerCase()?.includes("chunk_statement")
    )?.length;
    return {
      miniRecapArr,
      miniRecapObj,
      miniRecapCount,
      currentRecapData,
      isMiniRecapTab,
      currentRecapExtra,
    };
  }, [getRecapData, currentTab, activeTab]);
  const handleCopy = () => {
    message.success("Copied to clipboard");
    navigator.clipboard.writeText(`
      Mini Recaps: ${getRecapData?.data?.mini_reflections},
      Key Points: ${getRecapData?.data?.bullet_points?.join(", ")}.
      Overall Recaps ${getRecapData?.data?.reflections}.
    `);
  };

  if (getRecapLoad) return <Loading />;
  if (!isEqual(getRecapData?.data?.status, "Success"))
    return (
      <div className="w-full h-screen flex justify-center items-center px-5 md:px-10 gap-5">
        <RiArrowGoBackFill
          className="cursor-pointer text-xl text-[#646462]"
          onClick={goBack}
        />
        <p className="text-[28px] font-bold text-dark">
          Recaps Data Not Ready Yet!
        </p>
      </div>
    );
  return (
    <Spin spinning={getRecapLoad || getRecapRefetch}>
      <div className="w-full min-h-[95vh] flex flex-col items-center md:py-5 space-y-5 bg-white">
        <div className="w-full">
          <div className="w-full flex items-center px-5 md:px-10 gap-5">
            <RiArrowGoBackFill
              className="cursor-pointer text-xl text-[#646462]"
              onClick={goBack}
            />
            <p className="text-[28px] font-bold text-dark">
              {getRecapData?.data?.name}
            </p>
          </div>

          <Divider className="!mb-0" />
        </div>

        <div className="w-full flex flex-col gap-5 px-5 lg:px-10">
          <div className="w-fit flex items-center px-[8px] py-[9px] gap-[14px] bg-lit rounded-lg">
            {[...(getRecapData?.data?.selected_grade_level || ["on"])].map(
              (d: any) => (
                <Tag
                  className={`${
                    level === null && d === "on"
                      ? "!bg-primary text-white"
                      : level !== null && level === d
                      ? "!bg-primary text-white"
                      : "text-black bg-lit"
                  } !border-0 font-montserrat !mr-0 cursor-pointer`}
                  key={d}
                  style={{ padding: "5px 10px" }}
                  onClick={() => {
                    if (d !== "on") {
                      setParams({ section: section!, id: id!, level: d });
                      setLevelValue(d);
                    } else {
                      setParams({ section: section!, id: id! });
                      setLevelValue(null);
                    }
                    setRefetchValue(!refechValue);
                    refetch().then(() => {
                      refetch();
                    });
                  }}
                >
                  {d === "on" ? "" : handleCapitalize(d)} Grade Level
                </Tag>
              )
            )}
          </div>
          <div className="space-y-1">
            {/* {tabs.map(({ description, key, label }) => {
              const isAct = isEqual(key, activeTab);
              return (
                <div
                  onClick={() => setActiveTab(key)}
                  className={`w-full cursor-pointer p-5 md:p-10 space-y-2 hover:bg-[#F9F9F9] ${
                    isAct && "bg-[#F9F9F9]"
                  }`}
                >
                  <div className="w-full flex justify-between items-center">
                    <p
                      className={`text-[22px] font-medium  ${
                        isAct ? "text-primary" : "text-[#838382]"
                      }`}
                    >
                      {label}
                    </p>
                    <FaChevronRight className="text-[#C1C1C0]" />
                  </div>
                  <p className="text-xs font-medium text-[#1A265180]">
                    {description}
                  </p>
                </div>
              );
            })} */}
            <Tabs
              items={tabs}
              activeKey={activeTab}
              defaultActiveKey={activeTab}
              onChange={setActiveTab}
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5 ">
            <div className="md:col-span-2 space-y-5">
              {/* <div className="w-full md:w-[80%] min-h-full mx-auto rounded-xl shadow-2xl drop-shadow-2xl p-5 !pb-16 space-y-5 relative">
              <Divider className="!mb-0 !text-xs !font-normal !text-[#646462]">
                {currentTab?.title}
              </Divider>
              <p className="text-base font-normal text-[#1B1B1B] text-cente leading-6">
                {getRecapData?.data?.recaps?.[activeTab]}
              </p>
              <div
                className="space-y-3"
                hidden={!currentTab?.extra || getRecapLoad}
              >
                <p className="text-sm font-medium text-dark">Key Points</p>
                <ul className="text-sm text-dark !list-disc px-5">
                  {getRecapData?.data?.recaps?.[currentTab?.extra as any]?.map(
                    (d: any) => (
                      <li>{d}</li>
                    )
                  )}
                </ul>
              </div>
              <Button
                className="!absolute !right-5 !bottom-5 bg-primary"
                icon={<FaClipboard />}
                onClick={handleCopy}
                shape="circle"
                type="primary"
              />
            </div> */}
              {isMiniRecapTab ? (
                Array.from(Array(miniRecapCount).keys())?.map((d) => {
                  const isViewMore = miniViewList?.includes(d);
                  const point = miniRecapObj?.[`CHUNK_BULLET_POINT_${d}`];
                  const statement = miniRecapObj?.[`CHUNK_STATEMENT_${d}`];
                  const reflection = miniRecapObj?.[`CHUNK_REFLECTION_${d}`];
                  const viewMore = () => setMiniViewList([...miniViewList, d]);
                  const viewLess = () =>
                    setMiniViewList(
                      miniViewList?.filter((b) => !isEqual(d, b))
                    );
                  const viewText = isViewMore
                    ? "Hide Full Chunk"
                    : "Read Full Chunk";
                  const handleView = () =>
                    isViewMore ? viewLess() : viewMore();
                  return (
                    <Card
                      key={d}
                      title={
                        <div className="">
                          <ImQuotesLeft className="text-3xl text-[#D1D1D1]" />
                          <p className="whitespace-normal p-5 pt-0 text-sm font-medium text-[#414141] !line-clamp-1">
                            {reflection}
                          </p>
                        </div>
                      }
                      className="shadow-md"
                      headStyle={{ background: "#F5F5F5" }}
                    >
                      <div className="!space-y-5">
                        <p
                          className={`text-sm font-normal text-[#1B1B1B] ${
                            !isViewMore && "line-clamp-3"
                          }`}
                        >
                          {statement}
                        </p>
                        <div hidden={!isViewMore} className="space-y-5">
                          <p className="text-sm font-normal text-[#1B1B1B]">
                            {reflection}
                          </p>
                          <div hidden={!point?.length} className="space-y-2">
                            <p className="text-sm font-medium text-[#1B1B1B]">
                              Key Points
                            </p>
                            <ul className="!list-disc px-5 !text-sm">
                              {(point || [])?.map((p: string) => (
                                <li>{p}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <Button
                          type="text"
                          onClick={handleView}
                          className="text-primary !px-0"
                        >
                          {viewText}
                        </Button>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <Card className="shadow-md">
                  <div className="!space-y-5">
                    <p className="text-sm font-normal text-[#1B1B1B]">
                      {currentRecapData}
                    </p>
                    <div
                      hidden={!currentRecapExtra?.length}
                      className="space-y-2"
                    >
                      <p className="text-sm font-medium text-[#1B1B1B]">
                        Key Points
                      </p>
                      <ul className="!list-disc px-5 !text-sm">
                        {(currentRecapExtra || [])?.map((p: string) => (
                          <li>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      type="text"
                      size="large"
                      className="!px-0"
                      onClick={handleCopy}
                      icon={<IoCopyOutline className="text-xl" />}
                    />
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default RecapSection;
