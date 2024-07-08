import React, { useEffect, useMemo, useState } from "react";
import { CustomButton } from "../../../components";
import {
  Button,
  Drawer,
  Form,
  Input,
  Modal,
  Spin,
  Upload,
  UploadProps,
} from "antd";
import { LuInbox } from "react-icons/lu";
import { FiUploadCloud } from "react-icons/fi";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { useAWSUpload } from "../../../hooks/otherhooks";
import { UploadedDocuments } from "../../../components/proofreader/UploadedDocuments";
import {
  useEditProofReader,
  useGetProofReader,
  usePostProofReader,
} from "../../../hooks/proofreader/proofreader";
import moment from "moment";
import { FaPlus } from "react-icons/fa";
import { RiArrowDropDownLine, RiArrowUpLine } from "react-icons/ri";
import { FiArrowRight } from "react-icons/fi";
import { get } from "http";
import { transformText } from "../../../constants";

function ProofReaderPage() {
  const { width } = useWindowSize();
  const [open, setOpen] = useState(false);
  const [upldFile, setUpldFile] = useState<any>({});
  const [upldFileData, setUpldFileData] = useState<any>({});
  const [isMobile, setIsMobile] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<any>({});

  const [openSuggestion, setOpenSuggestion] = useState(0);

  const [query, setQuery] = useState({
    search: "",
  });

  const isSelected = Object.values(selected)?.some((d) => d);

  useEffect(() => {
    if (width) {
      if (width < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  }, [width]);

  const {
    data: getProofReaderData,
    refetch: getProofReaderRefetch,
    isFetching: getProofReaderLoad,
    data: editProofReaderData,
  } = useGetProofReader();

  const { mutate: postProofReaderAction, isLoading: postProofReaderLoad } =
    usePostProofReader(() => {
      getProofReaderRefetch();
      onClose();
      setTitle("");
      setText("");
      // setSelected({});
    });

  const { mutate: editProofReaderAction, isLoading: editProofReaderLoad } =
    useEditProofReader(selected?._id, () => {
      getProofReaderRefetch().then(() => {});
      const newSelected = editProofReaderData?.data?.find(
        (d: any) => d?._id === selected?._id
      );
      setSelected(newSelected);
    });

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleProofReaderCreate = () => {
    // onClose();
    setIsLoading(true);
    postProofReaderAction({
      title,
      text,
    });
    setIsLoading(false);
  };

  const handleProofReaderEdit = (textToReplace: string, newText: string) => {
    editProofReaderAction({
      title: selected?.title,
      text: transformText(selected?.text, textToReplace, newText),
    });
  };

  const getData = useMemo(() => {
    const data = getProofReaderData?.data || [];
    if (!query) return getProofReaderData?.data || [];
    return data?.filter((d: any) =>
      d?.title?.toLowerCase()?.includes(query?.search?.toLowerCase())
    );
  }, [getProofReaderData, query]);

  // Function to wrap the highlighted word with a span
  const getHighlightedText = (text: string, highlight: string) => {
    // Split the text into parts based on the highlight word
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part?.toLowerCase() === highlight?.toLowerCase() ? (
        <span
          key={index}
          // style={{ backgroundColor: "yellow" }}
          className="bg-[#FF8080] text-[#fff] font-medium px-1 rounded-[16px]"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Spin spinning={getProofReaderLoad}>
      <div className="px-5 md:px-10 flex justify-end items-center">
        <Button
          onClick={() => showDrawer()}
          className="bg-primary !rounded-2xl mt-4"
          type="primary"
          size="large"
          icon={<FaPlus />}
        >
          Create
        </Button>
      </div>
      <div className="md:px-10 my-6 flex flex-col lg:flex-row gap-6 w-full">
        <UploadedDocuments
          data={getProofReaderData}
          getData={getData}
          setQuery={setQuery}
          setSelected={setSelected}
        />
        <div className="flex-1 py-6 px-8 rounded-[8px] flex items-center justify-center relative bg-white h-[300px] md:h-[80vh] font-montserrat overflow-y-auto">
          <div className="w-full h-full min-h-[80vh] bg-white grid grid-cols-1 md:grid-cols-3 md:divide-x divide-[#EFEFEF]">
            <div className="md:col-span-2 p-5 md:py-10 h-full overflow-y-auto">
              {isSelected ? (
                <div className="space-y-2 h-full">
                  <div className="w-full flex flex-col gap-2 pb-4 border-b border-b-[#EFEFEF]">
                    <h5 className="text-xl font-semibold text-[#414141]">
                      {selected?.title}
                    </h5>
                    <p className="text-xs font-normal text-[#414141]">
                      Created at{" "}
                      <b>{moment(selected?.createdAt).format("LLLL")}</b>
                    </p>
                  </div>
                  <div className="w-full overflow-y-auto h-full py-4">
                    <p
                      className="text-sm font-medium text-[#414141] mb-9"
                      // dangerouslySetInnerHTML={{ __html: selected?.text }}
                    >
                      {getHighlightedText(
                        selected?.text,
                        selected?.suggestions[openSuggestion]?.word
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col gap-3 items-center justify-center px-4 lg:px-0">
                  <p className="text-[14px] leading-[24px] font-medium text-[#1B2124]">
                    Paste or upload text in English to get started
                  </p>
                  <CustomButton
                    text="Upload Document"
                    type="button"
                    onClick={() => {
                      showDrawer();
                    }}
                  />
                </div>
              )}
            </div>
            <div className="p-5 md:py-10 md:col-span-1 space-y-3 w-full h-full">
              <h5 className="text-[16px] leading-[24px] font-medium text-[#414141] pb-3 border-b border-b-[#EFEFEF]">
                Suggestions
              </h5>

              <div className="w-full space-y-3 h-[450px] overflow-y-auto">
                {selected?.suggestions
                  // ?.filter(
                  //   (suggestion: any) => suggestion.correct_words.trim() !== ""
                  // )
                  ?.map((d: any, index: number) => (
                    <div className="w-full shadow-sm border border-[#f5f5f5] py-4 flex flex-col gap-3 rounded-[8px]">
                      <div
                        className={`w-full px-4 flex items-center justify-between ${
                          openSuggestion === index &&
                          "pb-2 border-b border-b-[#EFEFEF]"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <div className="h-[6px] w-[6px] rounded-full bg-[#ff0000]" />
                          <p className="text-[14px] leading-[23px] font-medium text-[#414141]">
                            Correctness
                          </p>
                        </div>
                        <div
                          onClick={() =>
                            setOpenSuggestion(
                              openSuggestion === index ? -1 : index
                            )
                          }
                          className="cursor-pointer"
                        >
                          <RiArrowDropDownLine
                            className={`text-[24px] ${
                              openSuggestion === index && "rotate-180"
                            }`}
                          />
                        </div>
                      </div>
                      {openSuggestion === index && (
                        <div className="flex flex-col w-full gap-3">
                          <div className="py-2 px-4 flex flex-row items-center justify-between gap-2">
                            <div className="px-2 py-1 bg-[#EAEAEA] rounded-[18px] flex items-center justify-center w-full">
                              <span className="text-[12px] leading-[24px] font-medium text-[#676767]">
                                {d.word}
                              </span>
                            </div>

                            <FiArrowRight className="text-[24px]" />

                            <div className="px-2 py-1 bg-[#DBE2FE] rounded-[18px] flex items-center justify-center w-full">
                              <span className="text-[12px] leading-[24px] font-medium text-primary">
                                {d.correct_words}
                              </span>
                            </div>
                          </div>

                          <span className="text-[14px] leading-[20px] px-4">
                            It appears that a word needs to be corrected
                          </span>

                          <div className="py-2 px-4 flex flex-row items-center justify-between gap-2">
                            <Button
                              className="bg-primary !h-[40px] font-montserrat"
                              disabled={false}
                              onClick={() => {
                                handleProofReaderEdit(
                                  selected?.suggestions[index]?.word,
                                  selected?.suggestions[index]?.correct_words
                                );
                              }}
                              type="primary"
                              size="large"
                              shape="round"
                              loading={editProofReaderLoad}
                              block
                            >
                              Accept
                            </Button>

                            <Button
                              className="bg-[#F5F5F5] text-[#676767] !h-[40px] hover:!bg-[#F5F5F5]/90 hover:!text-[#676767] font-montserrat"
                              disabled={false}
                              onClick={() => {
                                setOpenSuggestion(-1);
                              }}
                              type="primary"
                              size="large"
                              shape="round"
                              block
                            >
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            open={open}
            width={isMobile ? "80%" : "40%"}
          >
            <h2 className="text-[20px] leading-[30px] font-semibold tracking-[2%] font-montserrat mb-1">
              Perfect Your Writing
            </h2>
            <p className="text-[16px] leading-[24px] font-montserrat mb-4 text-[#414141]">
              Ensure Precision, Correctness, and Clear Communication
            </p>
            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-col gap-1 w-full">
                <h4 className="text-[16px] leading-[24px] font-medium font-montserrat">
                  Title
                </h4>
                <input
                  type="text"
                  className="w-full border border-[#cecccc] rounded-[8px] p-3 font-montserrat"
                  value={title}
                  placeholder="Enter the title of the document"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <p className="text-[14px] leading-[23px] text-[#646462] font-medium font-montserrat">
                Text
              </p>
              <textarea
                className="w-full border border-[#cecccc] rounded-[8px] p-3 h-[160px] font-montserrat"
                value={text}
                placeholder="Enter the text to be analyzed"
                onChange={(e) => setText(e.target.value)}
              />

              <Button
                className="bg-primary !h-[50px] font-montserrat"
                disabled={title.length === 0 || text.length === 0}
                onClick={() => {
                  handleProofReaderCreate();
                }}
                type="primary"
                size="large"
                shape="round"
                loading={postProofReaderLoad}
                block
              >
                Create
              </Button>
            </div>
          </Drawer>

          <Modal
            open={isLoading}
            footer={false}
            onCancel={() => setIsLoading(false)}
            title="Upload Document"
          >
            <div className="py-6 flex flex-col gap-4">
              <p className="text-[16px] leading-[24px] font-medium text-[#414141]">
                Proof Reading in Progress ...
              </p>
              <div className="w-full flex items-center justify-center">
                <Spin />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </Spin>
  );
}

export default ProofReaderPage;
