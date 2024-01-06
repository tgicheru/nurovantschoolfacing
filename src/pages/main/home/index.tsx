import moment from "moment";
import React, { useMemo, useState, useEffect } from "react";
import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  QRCode,
  Spin,
  Tabs,
  Tag,
  Upload,
  UploadProps,
} from "antd";
import { FaPlus } from "react-icons/fa6";
import { TbCards } from "react-icons/tb";
import { PiRepeatFill } from "react-icons/pi";
import { IoIosVideocam } from "react-icons/io";
import { LuUploadCloud } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import VideoRecordIcon from "../../../assets/icons/videorecordicon";
import CustomPagination from "../../../components/CustomPagination";
import CustomTable from "../../../components/CustomTable";
import { ColumnsType } from "antd/es/table";
import { BiTestTube } from "react-icons/bi";
import { handleCapitalize, isEqual } from "../../../context/utils";
import { IoMailOutline } from "react-icons/io5";
import QuizSection from "./sections/quiz";
import FlashcardSection from "./sections/flashcard";
import modalAtom, { ModalType } from "../../../atoms/modal/modal.atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import InviteModal from "../../../components/modals/InviteModal";
import { awsConfig } from "../../../aws/awsConfig";
import AWS from "aws-sdk";
import authAtom from "../../../atoms/auth/auth.atom";
import { useGetLectures, usePostLecture } from "../../../hooks/lecture/lecture";
import { useGetAllQuiz, usePostQuiz } from "../../../hooks/quiz/quiz";
import {
  useGetAllFlashcards,
  usePostFlashcards,
} from "../../../hooks/flashcards/flashcards";
import QuizQuestionsSection from "./sections/quizQuestions";

function Home() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [param, setParam] = useSearchParams();
  const [activeTab, setActiveTab] = useState(param.get("tab") || "lecture");
  const [isGenerate, setIsGenerate] = useState(false);
  const [upldFile, setUpldFile] = useState<any>({});
  const [isRecord, setIsRecord] = useState(false);
  const [isInvite, setIsInvite] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const handleUpldFileClr = () => setUpldFile({});
  const onGenClose = () => setIsGenerate(false);
  const onGenOpen = () => setIsGenerate(true);
  const onRecClose = () => setIsRecord(false);
  const onInvClose = () => setIsInvite(false);
  const [isOpen, setIsOpen] = useState(false);
  const onCreClose = () => setIsCreate(false);
  const onInvOpen = () => setIsInvite(true);
  const onRecOpen = () => setIsRecord(true);
  const activeSection = param.get("section");
  const onCreOpen = () => setIsCreate(true);
  const activeAction = param.get("action");
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const lectureId = param.get("id");

  // Live recording section
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRecording) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    if (elapsedTime === Number(selectedOption) * 60) {
      handleStopRecording();
    }

    return () => clearInterval(timer);
  }, [isRecording]);

  const handleStartRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        setElapsedTime(0);

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            setRecordedChunks((prevChunks) => [...prevChunks, e.data]);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: "audio/wav" });
          // Do something with the recorded blob, like saving it or playing it
          console.log(blob, blob.size);
          // Configure AWS with your credentials
          AWS.config.update({
            accessKeyId: awsConfig.accessKeyId,
            secretAccessKey: awsConfig.secretAccessKey,
            region: awsConfig.region,
          });

          // Specify the bucket and key (object key) for the upload
          const uploadParams = {
            Bucket: "nurovantfrontend",
            Key: `recording`, // You can customize the key based on your requirement
            Body: blob,
            ContentType: blob.type,
          };

          const s3 = new AWS.S3();

          // Upload the file
          s3.upload(
            uploadParams,
            (
              err: Error | null,
              data: AWS.S3.ManagedUpload.SendData | undefined
            ) => {
              if (err) {
                console.error("Error uploading file", err);
              } else {
                console.log("File uploaded successfully", data);

                postLectAction({
                  file_url: data?.Location,
                  file_type: "audio",
                  file_name: data?.Key,
                  lecture_name: data?.Key,
                  upload_type: "audio upload",
                });
                // Handle success, update UI, etc.
              }
            }
          );
        };

        recorder.start();
        setIsRecording(true);
      })
      .catch((err) => console.error("Error accessing microphone:", err));
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      console.log(elapsedTime);
      console.log(Number(selectedOption) * 60);
      setIsRecording(false);
    }
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const options = [];
  for (let i = 1; i <= 60; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const {
    data: getLectData,
    refetch: getLectFetch,
    isFetching: getLectLoad,
  } = useGetLectures({ limit, page });

  const {
    data: getAllQuizData,
    refetch: getAllQuizFetch,
    isFetching: getAllQuizLoad,
  } = useGetAllQuiz({ limit, page });

  const {
    data: getAllFlashcardData,
    refetch: getAllFlashcardFetch,
    isFetching: getAllFlashcardLoad,
  } = useGetAllFlashcards({ limit, page });

  const handleAction = (action: string, id: string) => {
    setParam({ action, id });
    onGenOpen();
  };

  const setModal = useSetRecoilState(modalAtom);
  const { user } = useRecoilValue(authAtom);

  // const handleViewQuiz = (id: string) => setParam({ id, section: "quiz" });
  const handleViewFlashcard = (id: string) =>
    setParam({ id, section: "flashcard" });
  const handleViewQuiz = (id: string) =>
    setParam({ id, section: "quiz" });
  const handleInvite = (id: string) => onInvOpen();

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    directory: false,
    method: undefined,
    showUploadList: false,
    className: "!w-full md:!w-[80%]",
    onChange({ file }) {
      setUpldFile({
        file: file?.originFileObj,
        fileobj: file,
      });
    },
  };

  const lectureColumns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "lecture_title",
      render: (d) => <p>{d || "NIL"}</p>,
    },
    {
      title: "Date uploaded",
      dataIndex: "lecture_date",
      render: (d) => <p>{moment(d).format("L")}</p>,
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (d) => (
        <div className="flex items-center gap-3">
          <Button
            onClick={() => handleAction("quiz", d)}
            className="text-primary"
            type="text"
            icon={<BiTestTube />}
          >
            Quiz
          </Button>
          <Button
            onClick={() => handleAction("flashcard", d)}
            className="text-primary"
            type="text"
            icon={<TbCards />}
          >
            Flashcards
          </Button>
          <Button
            onClick={() => handleAction("recap", d)}
            className="text-primary"
            type="text"
            icon={<PiRepeatFill />}
          >
            Recaps
          </Button>
        </div>
      ),
    },
  ];

  const quizColumns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "",
      render: (d) => (
        <Button
          onClick={() => handleViewQuiz(d?._id)}
          className="text-primary"
          type="text"
        >
          {d?.name}
        </Button>
      ),
    },
    {
      title: "Date uploaded",
      dataIndex: "createdAt",
      render: (d) => <p>{moment(d).format("L")}</p>,
    },
    {
      title: "Participants",
      dataIndex: "",
      render: () => <p>0</p>,
    },
    {
      title: "Actions",
      dataIndex: "",
      render: () => (
        <div className="flex items-center gap-3">
          <Button
            onClick={() => handleInvite("quiz")}
            className="text-primary"
            type="text"
            icon={<IoMailOutline />}
          >
            Send Invitation
          </Button>
        </div>
      ),
    },
  ];

  const flashcardColumns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "",
      render: (d) => (
        <Button
          onClick={() => handleViewFlashcard(d?._id)}
          className="text-primary"
          type="text"
        >
          {d?.name}
        </Button>
      ),
    },
    {
      title: "Date uploaded",
      dataIndex: "",
      render: () => <p>{moment().format("L")}</p>,
    },
    {
      title: "Participants",
      dataIndex: "",
      render: () => <p>0</p>,
    },
    {
      title: "Actions",
      dataIndex: "",
      render: () => (
        <div className="flex items-center gap-3">
          <Button
            onClick={() => handleInvite("flashcard")}
            className="text-primary"
            type="text"
            icon={<IoMailOutline />}
          >
            Send Invitation
          </Button>
        </div>
      ),
    },
  ];

  const recapColumns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "",
      render: () => <p>Untitled 01</p>,
    },
    {
      title: "Date uploaded",
      dataIndex: "",
      render: () => <p>{moment().format("L")}</p>,
    },
    {
      title: "Participants",
      dataIndex: "",
      render: () => <p>0</p>,
    },
    {
      title: "Actions",
      dataIndex: "",
      render: () => (
        <div className="flex items-center gap-3">
          <Button
            onClick={() => handleInvite("recaps")}
            className="text-primary"
            type="text"
            icon={<IoMailOutline />}
          >
            Send Invitation
          </Button>
        </div>
      ),
    },
  ];

  const tabs = useMemo(
    () => [
      {
        key: "lecture",
        column: lectureColumns,
        data: getLectData?.lectures,
        label: (
          <div className="flex items-center gap-3">
            <p>Lecture</p>
            <Tag className="!bg-lit !border-0">
              {getLectData?.lectures?.length}
            </Tag>
          </div>
        ),
      },
      {
        key: "quiz",
        column: quizColumns,
        data: getAllQuizData?.data,
        label: (
          <div className="flex items-center gap-3">
            <p>Quiz</p>
            <Tag className="!bg-lit !border-0">
              {getAllQuizData?.data?.length}
            </Tag>
          </div>
        ),
      },
      {
        key: "flash-cards",
        column: flashcardColumns,
        data: getAllFlashcardData?.data,
        label: (
          <div className="flex items-center gap-3">
            <p>Flash cards</p>
            <Tag className="!bg-lit !border-0">
              {getAllFlashcardData?.data?.length}
            </Tag>
          </div>
        ),
      },
      {
        key: "recaps",
        column: recapColumns,
        label: (
          <div className="flex items-center gap-3">
            <p>Recaps</p>
            <Tag className="!bg-lit !border-0">1</Tag>
          </div>
        ),
      },
    ],
    [getLectData, getAllQuizData, getAllFlashcardData]
  );

  const handleTab = (tab: string) => {
    setParam({ tab });
    setActiveTab(tab);
  };
  const column = useMemo(
    () => tabs.find((d) => isEqual(d.key, activeTab))?.column,
    [activeTab, tabs]
  );
  const data = useMemo(
    () => tabs.find((d) => isEqual(d.key, activeTab))?.data,
    [activeTab, tabs]
  );

  const successAction = () => {
    onClose();
    getLectFetch();
    getAllQuizFetch();
    getAllFlashcardFetch();
    setModal({
      modalType: (handleCapitalize(activeAction!) || "Success") as ModalType,
      showModal: true,
    });
  };

  // const handleUpload = () => {
  //   console.log(upldFile);
  //   if (!upldFile) {
  //     console.error("No file selected");
  //     return;
  //   }

  //   // Configure AWS with your credentials
  //   AWS.config.update({
  //     accessKeyId: awsConfig.accessKeyId,
  //     secretAccessKey: awsConfig.secretAccessKey,
  //     region: awsConfig.region,
  //   });

  //   // Create an S3 service object
  //   const s3 = new AWS.S3();

  //   // Specify the bucket and key (object key) for the upload
  //   const uploadParams = {
  //     Bucket: "nurovantfrontend",
  //     Key: `audio/${upldFile.name}`, // You can customize the key based on your requirement
  //     Body: upldFile.file.url,
  //     ContentType: upldFile.type,
  //   };

  //   // Upload the file
  //   s3.upload(
  //     uploadParams,
  //     (err: Error | null, data: AWS.S3.ManagedUpload.SendData | undefined) => {
  //       if (err) {
  //         console.error("Error uploading file", err);
  //       } else {
  //         console.log("File uploaded successfully", data);
  //         // Handle success, update UI, etc.
  //       }
  //     }
  //   );
  // };

  const { mutate: postLectAction, isLoading: postLectLoad } =
    usePostLecture(successAction);

  const { mutate: postQuizAction, isLoading: postQuizLoad } =
    usePostQuiz(successAction);

  const { mutate: postFlashcardAction, isLoading: postFlashcardLoad } =
    usePostFlashcards(successAction);

  const handleUploadTest = () => {
    postLectAction({
      file_url: "s3://nurovantfrontend/Demons-And-Angels-1.mp3",
      file_type: "audio",
      file_name: "Demons-And-Angels-1.mp3",
      lecture_name: "omega",
      upload_type: "audio upload",
    });
  };

  const handleCreateQuiz = (value: any) => {
    const lecture = getLectData?.lectures?.find((d: any) =>
      isEqual(d?._id, lectureId)
    );
    const payload = {
      ...value,
      title: value?.quiz_title,
      file_url: lecture?.contentUrl,
      file_type: lecture?.contentType,
      file_name: lecture?.lecture_title,
      lecture_id: lectureId,
    };
    postQuizAction(payload);
  };

  const handleCreateFlashcard = (value: any) => {
    const lecture = getLectData?.lectures?.find((d: any) =>
      isEqual(d?._id, lectureId)
    );
    const payload = {
      ...value,
      title: value?.flashcard_title,
      file_url: lecture?.contentUrl,
      file_type: lecture?.contentType,
      file_name: lecture?.lecture_title,
      lecture_id: lectureId,
    };
    postFlashcardAction(payload);
  };

  const isFetchLoad = getLectLoad || getAllQuizLoad;
  const isActionLoad = postQuizLoad;
  const isFlashActionLoad = postFlashcardLoad;

  const CreateContent = useMemo(
    () =>
      [
        {
          key: "quiz",
          component: (
            <Form onFinish={handleCreateQuiz} layout="vertical">
              <Form.Item label="Name of Quiz" name="quiz_title">
                <Input
                  className="!rounded-xl"
                  placeholder="Enter quiz name"
                  size="large"
                />
              </Form.Item>
              <Form.Item label="Select no of Questions">
                <div className="grid grid-cols-3 gap-3">
                  {Array.from(Array(3).keys()).map((idx) => (
                    <Button className="!rounded-xl" size="large">{`${
                      (idx + 1) * 10
                    } Questions`}</Button>
                  ))}
                </div>
              </Form.Item>
              <Form.Item label="Quiz Duration">
                <div className="grid grid-cols-3 gap-3">
                  {Array.from(Array(3).keys()).map((idx) => (
                    <Button className="!rounded-xl" size="large">{`${
                      (idx + 1) * 10
                    } mins`}</Button>
                  ))}
                </div>
              </Form.Item>
              <Button
                className="bg-primary !w-full"
                loading={isActionLoad}
                htmlType="submit"
                type="primary"
                size="large"
                shape="round"
              >
                Save Quiz
              </Button>
            </Form>
          ),
        },
        {
          key: "flashcard",
          component: (
            <Form layout="vertical" onFinish={handleCreateFlashcard}>
              <Form.Item label="Name of Flash cards" name="flashcard_title">
                <Input
                  className="!rounded-xl"
                  placeholder="Enter flash cards name"
                  size="large"
                />
              </Form.Item>
              <Button
                className="bg-primary !w-full"
                htmlType="submit"
                loading={isFlashActionLoad}
                type="primary"
                size="large"
                shape="round"
              >
                Save Flash-Cards
              </Button>
            </Form>
          ),
        },
        {
          key: "recap",
          component: (
            <Form layout="vertical">
              <Form.Item label="Name of Recaps" name="name">
                <Input
                  className="!rounded-xl"
                  placeholder="Enter recaps name"
                  size="large"
                />
              </Form.Item>
              <Button
                className="bg-primary !w-full"
                htmlType="submit"
                type="primary"
                size="large"
                shape="round"
              >
                Save Recaps
              </Button>
            </Form>
          ),
        },
      ]?.find((d) => isEqual(d.key, activeAction))?.component,
    [
      activeAction,
      lectureId,
      getLectData,
      getAllQuizData,
      getAllFlashcardData,
      isActionLoad,
      isFlashActionLoad,
    ]
  );

  const SectionContent = useMemo(
    () =>
      [
        {
          key: "quiz",
          conponent: <QuizSection />,
        },
        {
          key: "flashcard",
          conponent: <FlashcardSection />,
        },
        {
          key: "quiz-questions",
          conponent: <QuizQuestionsSection />,
        },
      ].find((d) => isEqual(d.key, activeSection))?.conponent,
    [activeSection]
  );

  // const [blob, setBlob] = useState<Blob>();
  const handleUpload = () => {
    console.log(upldFile);
    if (!upldFile) {
      console.error("No file selected");
      return;
    }

    // Configure AWS with your credentials
    AWS.config.update({
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      region: awsConfig.region,
    });

    // Create an S3 service object
    const s3 = new AWS.S3();
    var audioBlob: Blob | null | undefined = null || undefined;

    if (upldFile.file) {
      const reader = new FileReader();

      reader.onload = () => {
        var blob = new Blob([reader.result as ArrayBuffer], {
          type: upldFile.file.type,
        });
        audioBlob = blob;
        // setBlob(blob);
      };

      reader.readAsArrayBuffer(upldFile.file);
    }

    // Specify the bucket and key (object key) for the upload
    const uploadParams = {
      Bucket: "nurovantfrontend",
      Key: `${upldFile.file.name}`, // You can customize the key based on your requirement
      Body: audioBlob,
      ContentType: upldFile.file.type,
    };

    // Upload the file
    s3.upload(
      uploadParams,
      (err: Error | null, data: AWS.S3.ManagedUpload.SendData | undefined) => {
        if (err) {
          console.error("Error uploading file", err);
        } else {
          console.log("File uploaded successfully", data);

          postLectAction({
            file_url: data?.Location,
            file_type: "audio",
            file_name: data?.Key,
            lecture_name: data?.Key,
            upload_type: "audio upload",
          });
          // Handle success, update UI, etc.
        }
      }
    );
  };

  if (SectionContent) return SectionContent;
  return (
    <Spin spinning={isFetchLoad}>
      <div className="w-full h-full md:py-5 space-y-5">
        <div className="flex justify-between items-center px-5 md:px-10">
          <div>
            <p
              className="text-3xl font-bold text-secondary"
              onClick={() => {
                // setModal({
                //   showModal: true,
                //   modalType: "Quiz",
                // });
              }}
            >
              Hello {user?.info?.name}
            </p>
            <p className="text-base font-normal text-gray">
              Welcome to your dashboard
            </p>
          </div>
          <Button
            onClick={onOpen}
            className="bg-primary !rounded-2xl"
            type="primary"
            size="large"
            icon={<FaPlus />}
          >
            Create
          </Button>
        </div>

        <div hidden={!getLectData?.lectures?.length} className="w-full">
          <div className="flex justify-between items-center px-5 md:px-10">
            <Tabs
              activeKey={activeTab}
              defaultActiveKey={activeTab}
              items={tabs}
              onChange={handleTab}
              className="!p-0 !m-0"
            />
            <CustomPagination
              total={75}
              pageSize={limit}
              sizeChanger
              current={page}
              size="small"
              onChange={setPage}
            />
          </div>
          <div>
            <CustomTable data={data} column={column} pagination={false} />
          </div>
        </div>

        <div hidden={Boolean(getLectData?.lectures?.length)}>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <VideoRecordIcon bg="#4970FC" color="#fff" />
            <p className="text-[40px] font-semibold text-secondary mb-5">
              Lectures
            </p>
            <Button
              onClick={onOpen}
              className="bg-primary !px-20 !rounded-2xl"
              type="primary"
              size="large"
            >
              Create New
            </Button>
          </div>
        </div>

        {/* upload document modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <Modal
          onCancel={onClose}
          closeIcon={false}
          footer={false}
          open={isOpen}
        >
          <div className="flex flex-col justify-center items-center gap-5">
            <p className="text-[32px] font-semibold text-secondary">
              Import Document
            </p>
            <Upload.Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <LuUploadCloud className="text-gray text-2xl bg-light mx-auto" />
              </p>
              <p className="ant-upload-text">
                {upldFile?.file ? (
                  "Your file has been uploaded"
                ) : (
                  <>
                    <b className="text-primary">Click to upload</b> or drag and
                    drop
                  </>
                )}
              </p>
              <p className="ant-upload-hint">
                {upldFile?.file ? (
                  <Button
                    onClick={handleUpldFileClr}
                    type="text"
                    danger
                    size="large"
                  >
                    Delete
                  </Button>
                ) : (
                  "SVG, PNG, JPG or GIF (max. 800x400px)"
                )}
              </p>
            </Upload.Dragger>
            <Button
              className="text-primary !text-base !font-medium"
              type="text"
              size="large"
              onClick={() => {
                onRecOpen();
                onClose();
              }}
              icon={<IoIosVideocam />}
            >
              Make a live recording
            </Button>
            <Button
              disabled={!upldFile?.file}
              onClick={handleUploadTest}
              loading={postLectLoad}
              // onClick={() => {
              //   handleUpload();
              // }}
              className="bg-primary !w-full md:!w-[70%]"
              type="primary"
              size="large"
              shape="round"
            >
              Create Lecture
            </Button>
          </div>
        </Modal>

        {/* record lecture modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <Modal
          onCancel={onRecClose}
          closeIcon={false}
          footer={false}
          open={isRecord}
        >
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="text-center">
              <p className="text-[32px] font-semibold text-secondary">
                Make a Live Lecture
              </p>
              <p className="ant-upload-hint">
                How long do you want to record for?
              </p>
            </div>
            {/* <div className="grid grid-cols-3 gap-3">
              {Array.from(Array(3).keys()).map((idx) => (
                <Button className="!rounded-xl" size="large">{`${
                  (idx + 3) * 5
                } mins`}</Button>
              ))}
            </div> */}
            <div className="w-full flex items-center justify-center gap-1">
              <select value={selectedOption} onChange={handleSelectChange}>
                <option value="" disabled>
                  Select an option
                </option>
                {options}
              </select>

              <span className="text-[14px] leading-[20px]">Mins</span>
            </div>

            {isRecording && (
              <div className="w-full flex items-center justify-center">
                <p className="text-[14px] leading-[20px] text-center">
                  Recorded Time: {formatTime(elapsedTime)}
                </p>
              </div>
            )}
            <Button
              // disabled={!upldFile?.file}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className="bg-primary !w-full md:!w-[70%]"
              type="primary"
              size="large"
              shape="round"
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
          </div>
        </Modal>

        {/* generate from content modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <Modal
          onCancel={onGenClose}
          open={isGenerate}
          closeIcon={false}
          footer={false}
          width={350}
        >
          <div className="flex flex-col justify-center items-center gap-3">
            <p className="text-[32px] font-semibold text-secondary capitalize">
              {activeAction}
            </p>
            <p className="text-sm font-normal text-secondary capitalize">{`Create ${activeAction} from this content`}</p>
            <Button
              onClick={onCreOpen}
              loading={isActionLoad}
              className="bg-primary !w-full"
              type="primary"
              size="large"
              shape="round"
            >
              Generate
            </Button>
          </div>
        </Modal>

        {/* create from content modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <Modal
          onCancel={onCreClose}
          closeIcon={false}
          open={isCreate}
          footer={false}
        >
          <div className="space-y-5">
            <div className="text-center">
              <p className="text-[32px] font-semibold text-secondary capitalize">{` Create ${activeAction}`}</p>
              <p className="text-sm font-normal text-secondary capitalize">{`Please fill the information below to personalise your ${activeAction}.`}</p>
            </div>
            {CreateContent}
          </div>
        </Modal>

        {/* invitation modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <InviteModal isOpen={isInvite} onClose={onInvClose} />
      </div>
    </Spin>
  );
}

export default Home;
