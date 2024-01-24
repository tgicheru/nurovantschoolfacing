/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import React, { useMemo, useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Spin,
  Tabs,
  Tag,
  Upload,
  UploadProps,
} from "antd";
import { FaPlus } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
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
import { isEqual } from "../../../context/utils";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMailOutline } from "react-icons/io5";
import QuizSection from "./sections/quiz";
import FlashcardSection from "./sections/flashcard";
import modalAtom from "../../../atoms/modal/modal.atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import InviteModal from "../../../components/modals/InviteModal";
import { awsConfig } from "../../../aws/awsConfig";
import AWS from "aws-sdk";
import authAtom from "../../../atoms/auth/auth.atom";
import { useDeleteLecture, useGetLectures, usePostLecture } from "../../../hooks/lecture/lecture";
import { useDeleteQuiz, useGetAllQuiz, usePostQuiz } from "../../../hooks/quiz/quiz";
import {
  useDeleteFlashcard,
  useGetAllFlashcards,
  usePostFlashcards,
} from "../../../hooks/flashcards/flashcards";
import QuizQuestionsSection from "./sections/quizQuestions";
import { useDeleteRecap, useGetAllRecaps, usePostRecaps } from "../../../hooks/recap/recap";
import RecapSection from "./sections/recap";
import {
  useDeleteDiscuss,
  useGetAllDiscuss,
  usePostDiscuss,
} from "../../../hooks/discuss/discuss";
import DiscussSection from "./sections/discuss";

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
  const inviteType = param.get("type");
  const onCreOpen = () => {
    setIsCreate(true);
    onGenClose();
  };
  const onClose = () => {
    handleUpldFileClr();
    setIsOpen(false);
  };
  const activeAction = param.get("action");
  const onOpen = () => setIsOpen(true);
  const paramId = param.get("id");

  const [loading, setLoading] = useState(false);

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
            Key: `recording-${blob.size}.wav`, // You can customize the key based on your requirement
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
      onRecClose();
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

  // get data hooks >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

  const {
    data: getAllRecapData,
    refetch: getAllRecapFetch,
    isFetching: getAllRecapLoad,
  } = useGetAllRecaps({ limit, page });

  const {
    data: getAllDiscussData,
    refetch: getAllDiscussFetch,
    isFetching: getAllDiscussLoad,
  } = useGetAllDiscuss({ limit, page });

  const handleRefetch = () => {
    getLectFetch();
    getAllQuizFetch();
    getAllRecapFetch();
    handleUpldFileClr();
    getAllDiscussFetch();
    getAllFlashcardFetch();
  };

  // get data hooks >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const {
    mutate: deleteLectAction,
    isLoading: deleteLecLoad,
  } = useDeleteLecture(handleRefetch);

  const {
    mutate: deleteQuiztAction,
    isLoading: deleteQuizLoad,
  } = useDeleteQuiz(handleRefetch);

  const {
    mutate: deleteFlashtAction,
    isLoading: deleteFlashLoad,
  } = useDeleteFlashcard(handleRefetch);

  const {
    mutate: deleteRectAction,
    isLoading: deleteRecLoad,
  } = useDeleteRecap(handleRefetch);

  const {
    mutate: deleteDisctAction,
    isLoading: deleteDiscLoad,
  } = useDeleteDiscuss(handleRefetch);

  const deleteLoad = (deleteLecLoad || deleteQuizLoad || deleteFlashLoad || deleteRecLoad || deleteDiscLoad);

  const handleAction = (action: string, id: string) => {
    setParam({ action, id });
    onGenOpen();
  };

  const handleDelete = (
    type: "lecture" | "quiz" | "flashcard" | "recap" | "discuss",
    id: string,
  ) => {
    const actions = {
      flashcard: () => deleteFlashtAction(id),
      discuss: () => deleteDisctAction(id),
      lecture: () => deleteLectAction(id),
      quiz: () => deleteQuiztAction(id),
      recap: () => deleteRectAction(id),
    }
    const action = () => {
      actions?.[type]?.();
      Modal.destroyAll();
    }
    Modal.confirm({
      footer: false,
      title: false,
      icon: <></>,
      content: (
        <div className="w-full pl-7 flex flex-col justify-between items-center gap-5 text-center">
          <p className="text-3xl font-bold text-dark">
            Are you sure you want to delete this data?
          </p>
          <p className="text-[14px] leading-[24px] font-medium text-[#646462]">
            Deleting this data would permanently remove it from your account.
          </p>
          <div className="w-full items-center justify-center !gap-3">
            <Button
              onClick={Modal.destroyAll}
              type="text"
              className="!border !rounded-md !border-[#C1C1C0] !text-[#C1C1C0] !font-medium !text-[14px] !leading-[20px] !mr-3"
            >
              No, keep
            </Button>
            <Button
              className="!font-medium !text-[14px] !leading-[20px]"
              loading={deleteLoad}
              onClick={action}
              danger
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      ),
    });
  }

  const setModal = useSetRecoilState(modalAtom);
  const { user } = useRecoilValue(authAtom);

  const handleView = (section: string, id: string) => setParam({ id, section });
  const handleInvite = (type: string, id: string) => {
    onInvOpen();
    setParam({ type, id });
  };

  const [audioBlob, setAudioBlob] = useState<
    Blob | null | undefined | Body | any
  >(null);

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    directory: false,
    method: undefined,
    showUploadList: false,
    className: "!w-full md:!w-[80%]",
    onChange({ file }: { file: Blob | any }) {
      setUpldFile({
        file: file?.originFileObj,
        fileobj: file,
      });

      console.log(file?.originFileObj);

      if (file?.originFileObj) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          // Create a Blob from the loaded data
          if (e.target?.result instanceof ArrayBuffer) {
            const audioBlob = new Blob([e.target.result], { type: file.type });
            setAudioBlob(audioBlob);
          }

          // Do something with the Blob, such as sending it to a server or processing it
          console.log(audioBlob);
        };

        // Read the content of the file as a data URL
        reader.readAsArrayBuffer(file?.originFileObj);
      }
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
      dataIndex: "",
      render: (d) => (
        <div className="flex items-center gap-3">
          <Button
            onClick={() => handleAction("quiz", d?._id)}
            className="text-primary"
            icon={<BiTestTube />}
            disabled={d?.quiz}
            type="text"
          >
            Quiz
          </Button>
          <Button
            onClick={() => handleAction("flashcards", d?._id)}
            className="text-primary"
            disabled={d?.flashcards}
            icon={<TbCards />}
            type="text"
          >
            Flashcards
          </Button>
          <Button
            onClick={() => handleAction("recaps", d?._id)}
            className="text-primary"
            icon={<PiRepeatFill />}
            disabled={d?.recaps}
            type="text"
          >
            Recaps
          </Button>
          <Button
            onClick={() => handleAction("discussion", d?._id)}
            className="text-primary"
            icon={<AiOutlineMessage />}
            disabled={d?.discussions}
            type="text"
          >
            Discuss
          </Button>
        </div>
      ),
    },
    {
      dataIndex: "_id",
      render: (d) => <Button
        onClick={() => handleDelete("lecture", d)}
        icon={<GoTrash className="text-lg" />}
        loading={deleteLoad}
        type="text"
      />
    },
  ];

  const quizColumns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "",
      render: (d) => (
        <Button
          onClick={() => handleView("quiz", d?._id)}
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
      dataIndex: "participants",
      render: (d) => <p>{d || 0}</p>,
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (d) => (
        <div className="flex items-center gap-3">
          <Button
            onClick={() => handleInvite("quiz", d)}
            className="text-primary"
            icon={<IoMailOutline />}
            type="text"
          >
            Send Invitation
          </Button>
        </div>
      ),
    },
    {
      dataIndex: "_id",
      render: (d) => <Button
        onClick={() => handleDelete("quiz", d)}
        icon={<GoTrash className="text-lg" />}
        loading={deleteLoad}
        type="text"
      />
    },
  ];

  const flashcardColumns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "",
      render: (d) => (
        <Button
          onClick={() => handleView("flashcards", d?._id)}
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
      dataIndex: "_id",
      render: (d) => (
        <div className="flex items-center gap-3">
          <Button
            onClick={() => handleInvite("flashcard", d)}
            className="text-primary"
            type="text"
            icon={<IoMailOutline />}
          >
            Send Invitation
          </Button>
        </div>
      ),
    },
    {
      dataIndex: "_id",
      render: (d) => <Button
        onClick={() => handleDelete("flashcard", d)}
        icon={<GoTrash className="text-lg" />}
        loading={deleteLoad}
        type="text"
      />
    },
  ];

  const recapColumns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "",
      render: (d) => (
        <Button
          disabled={["Processing", "Failed"]?.includes(d?.status)}
          onClick={() => handleView("recaps", d?._id)}
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
      title: "Status",
      dataIndex: "status",
      render: (d) => <p>{d || "Completed"}</p>,
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (d) => (
        <div className="flex items-center gap-3">
          <Button
            disabled={["Processing", "Failed"]?.includes(d?.status)}
            onClick={() => handleInvite("recap", d?._id)}
            className="text-primary"
            icon={<IoMailOutline />}
            type="text"
          >
            Send Invitation
          </Button>
        </div>
      ),
    },
    {
      dataIndex: "_id",
      render: (d) => <Button
        onClick={() => handleDelete("recap", d)}
        icon={<GoTrash className="text-lg" />}
        loading={deleteLoad}
        type="text"
      />
    },
  ];

  const discussColumns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "",
      render: (d) => (
        <Button
          onClick={() => handleView("discuss", d?._id)}
          className="text-primary"
          type="text"
        >
          {d?.name || "untitled 01"}
        </Button>
      ),
    },
    {
      title: "Date created",
      dataIndex: "createdAt",
      render: (d) => <p>{moment(d).format("L")}</p>,
    },
    {
      dataIndex: "_id",
      render: (d) => <Button
        onClick={() => handleDelete("discuss", d)}
        icon={<GoTrash className="text-lg" />}
        loading={deleteLoad}
        type="text"
      />
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
        data: getAllRecapData?.data,
        label: (
          <div className="flex items-center gap-3">
            <p>Recaps</p>
            <Tag className="!bg-lit !border-0">
              {getAllRecapData?.data?.length}
            </Tag>
          </div>
        ),
      },
      {
        key: "discuss",
        column: discussColumns,
        data: getAllDiscussData?.data,
        label: (
          <div className="flex items-center gap-3">
            <p>Discuss</p>
            <Tag className="!bg-lit !border-0">
              {getAllDiscussData?.data?.length}
            </Tag>
          </div>
        ),
      },
    ],
    [
      deleteLoad,
      getLectData,
      getAllQuizData,
      getAllFlashcardData,
      getAllRecapData,
      getAllDiscussData,
    ]
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
    setLoading(false);
    onClose();
    onRecClose();
    handleRefetch();
    setModal({
      modalType: "Success",
      showModal: true,
      message: "Lecture generated successfully",
      action: "View",
    });
  };

  const quizSuccessAction = (res: any) => {
    onClose();
    onGenClose();
    onCreClose();
    onRecClose();
    handleRefetch();
    setModal({
      modalType: "Success",
      showModal: true,
      path: `/?section=quiz&id=${res?.data?._id}`,
      message: "Quiz generated successfully",
      action: "View Quiz",
    });
  };

  const flashCardSuccessAction = (res: any) => {
    onClose();
    onGenClose();
    onRecClose();
    onCreClose();
    handleRefetch();
    setModal({
      showModal: true,
      modalType: "Success",
      path: `/?section=flashcards&id=${res?.data?._id}`,
      message: "Flashcards generated successfully",
      action: "View Flashcards",
    });
  };

  const recapSuccessAction = (res: any) => {
    onClose();
    onGenClose();
    onRecClose();
    onCreClose();
    handleRefetch();
    setModal({
      showModal: true,
      path: "/?tab=recaps",
      modalType: "Success",
      // path: `/?section=recaps&id=${res?.data?._id}`,
      message: `Recaps submitted successfully, Status: ${res?.data?.status}`,
      action: "View Recaps",
    });
  };

  const discussSuccessAction = (res: any) => {
    onClose();
    onGenClose();
    onRecClose();
    onCreClose();
    handleRefetch();
    setModal({
      showModal: true,
      modalType: "Success",
      path: `/?section=discuss&id=${res?.data?._id}`,
      message: `Discussion created successfully`,
      action: "View Discussion",
    });
  };

  const { mutate: postLectAction, isLoading: postLectLoad } =
    usePostLecture(successAction);

  const { mutate: postQuizAction, isLoading: postQuizLoad } =
    usePostQuiz(quizSuccessAction);

  const { mutate: postFlashcardAction, isLoading: postFlashcardLoad } =
    usePostFlashcards(flashCardSuccessAction);

  const { mutate: postRecapAction, isLoading: postRecapLoad } =
    usePostRecaps(recapSuccessAction);

  const { mutate: postDiscussAction, isLoading: postDiscussLoad } =
    usePostDiscuss(discussSuccessAction);

  const handleCreateQuiz = (value: any) => {
    const lecture = getLectData?.lectures?.find((d: any) =>
      isEqual(d?._id, paramId)
    );
    const payload = {
      ...value,
      title: value?.quiz_title,
      file_url: lecture?.contentUrl,
      file_type: lecture?.contentType,
      file_name: lecture?.lecture_title,
      lecture_id: paramId,
    };
    postQuizAction(payload);
  };

  const handleCreateFlashcard = (value: any) => {
    const lecture = getLectData?.lectures?.find((d: any) =>
      isEqual(d?._id, paramId)
    );
    const payload = {
      ...value,
      title: value?.flashcard_title,
      file_url: lecture?.contentUrl,
      file_type: lecture?.contentType,
      file_name: lecture?.lecture_title,
      lecture_id: paramId,
    };
    postFlashcardAction(payload);
  };

  const handleCreateRecap = (value: any) => {
    const lecture = getLectData?.lectures?.find((d: any) =>
      isEqual(d?._id, paramId)
    );
    const payload = {
      ...value,
      title: value?.name,
      file_url: lecture?.contentUrl,
      file_type: lecture?.contentType,
      file_name: lecture?.lecture_title,
      lecture_id: paramId,
    };
    postRecapAction(payload);
  };

  const handleCreateDiscuss = (value: any) => {
    const lecture = getLectData?.lectures?.find((d: any) =>
      isEqual(d?._id, paramId)
    );
    const payload = {
      ...value,
      title: value?.name,
      file_url: lecture?.contentUrl,
      file_type: lecture?.contentType,
      file_name: lecture?.lecture_title,
      lecture_id: paramId,
    };
    postDiscussAction(payload);
  };

  const isActionLoad =
    postLectLoad || postQuizLoad || postFlashcardLoad || postRecapLoad || postDiscussLoad;
  const isFetchLoad =
    getLectLoad ||
    getAllQuizLoad ||
    getAllFlashcardLoad ||
    getAllRecapLoad ||
    getAllDiscussLoad;

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
              <Form.Item hidden label="Select no of Questions">
                <div className="grid grid-cols-3 gap-3">
                  {Array.from(Array(3).keys()).map((idx) => (
                    <Button className="!rounded-xl" size="large">{`${
                      (idx + 1) * 10
                    } Questions`}</Button>
                  ))}
                </div>
              </Form.Item>
              <Form.Item hidden label="Quiz Duration">
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
          key: "flashcards",
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
                loading={isActionLoad}
                htmlType="submit"
                type="primary"
                size="large"
                shape="round"
              >
                Save FlashCards
              </Button>
            </Form>
          ),
        },
        {
          key: "recaps",
          component: (
            <Form onFinish={handleCreateRecap} layout="vertical">
              <Form.Item label="Name of Recaps" name="name">
                <Input
                  placeholder="Enter recaps name"
                  className="!rounded-xl"
                  size="large"
                />
              </Form.Item>
              <Button
                className="bg-primary !w-full"
                loading={isActionLoad}
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
        {
          key: "discussion",
          component: (
            <Form onFinish={handleCreateDiscuss} layout="vertical">
              <Form.Item label="Name of Discussion" name="name">
                <Input
                  placeholder="Enter discussion name"
                  className="!rounded-xl"
                  size="large"
                />
              </Form.Item>
              <Button
                className="bg-primary !w-full"
                loading={isActionLoad}
                htmlType="submit"
                type="primary"
                size="large"
                shape="round"
              >
                Save Discussion
              </Button>
            </Form>
          ),
        },
      ]?.find((d) => isEqual(d.key, activeAction))?.component,
    [
      paramId,
      getLectData,
      activeAction,
      isActionLoad,
      getAllQuizData,
      getAllRecapData,
      getAllFlashcardData,
    ]
  );

  const SectionContent = useMemo(
    () =>
      [
        {
          key: "quiz",
          component: <QuizSection />,
        },
        {
          key: "flashcards",
          component: <FlashcardSection />,
        },
        {
          key: "recaps",
          component: <RecapSection />,
        },
        {
          key: "discuss",
          component: <DiscussSection />,
        },
        {
          key: "quiz-questions",
          component: <QuizQuestionsSection />,
        },
      ].find((d) => isEqual(d.key, activeSection))?.component,
    [activeSection]
  );

  // const [blob, setBlob] = useState<Blob>();
  const handleUpload = async () => {
    setLoading(true);
    console.log(upldFile);
    if (!upldFile) {
      console.error("No file selected");
      setLoading(false);
      return;
    }

    // Configure AWS with your credentials
    AWS.config.update({
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      region: awsConfig.region,
    });

    // Create an S3 service object
    // Initialize AWS S3
    const s3 = new AWS.S3({
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      region: awsConfig.region,
    });
    // var audioBlob: Blob | null | undefined = null || undefined;

    // if (upldFile.file) {
    //   const reader = new FileReader();

    //   reader.onload = (e: any) => {
    //     var blob = new Blob([e?.target?.result], {
    //       type: upldFile.file.type,
    //     });
    //     audioBlob = blob;
    //     // setBlob(blob);
    //   };

    //   reader.readAsArrayBuffer(upldFile.file);
    // }

    // Specify the bucket and key (object key) for the upload
    const uploadParams = {
      Bucket: "nurovantfrontend",
      Key: `${upldFile.file.name.split(" ").join("")}`, // You can customize the key based on your requirement
      Body: audioBlob as Body,
      ContentType: upldFile.file.type,
    };

    // Upload the file
    if (upldFile?.file?.type === "application/pdf") {
      const params = {
        Bucket: "nurovantfrontend",
        Key: `${upldFile.file.name.split(" ").join("")}`,
      };
      try {
        // Initiate the multipart upload
        const uploadData = await s3.createMultipartUpload(params).promise();

        // Set the part size (5 MB in this example)
        const partSize = 5 * 1024 * 1024;

        // Calculate the number of parts
        const numParts = Math.ceil(upldFile?.file.size / partSize);

        // Upload each part
        const uploadPromises = [];
        for (let i = 0; i < numParts; i++) {
          const start = i * partSize;
          const end = Math.min(start + partSize, upldFile?.file.size);

          const part = await s3
            .uploadPart({
              Bucket: "nurovantfrontend",
              Key: `${upldFile.file.name.split(" ").join("")}`,
              PartNumber: i + 1,
              UploadId: uploadData.UploadId!,
              Body: upldFile?.file.slice(start, end),
            })
            .promise();

          uploadPromises.push({ PartNumber: i + 1, ETag: part.ETag });
        }

        // Complete the multipart upload
        const finalUp = await s3
          .completeMultipartUpload({
            Bucket: "nurovantfrontend",
            Key: `${upldFile.file.name.split(" ").join("")}`,
            UploadId: uploadData.UploadId!,
            MultipartUpload: {
              Parts: uploadPromises,
            },
          })
          .promise();

        console.log("finalUpload: ", finalUp);

        postLectAction({
          file_url: finalUp?.Location,
          file_type: "pdf",
          file_name: `${user?._id}-uploadPdf-${moment().format("DD-MM-YYYY")}`,
          lecture_name: finalUp?.Key,
          upload_type: "audio upload",
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
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
              file_name: `${user?._id}-uploadAudio-${moment().format(
                "DD-MM-YYYY"
              )}`,
              lecture_name: data?.Key,
              upload_type: "audio upload",
            });

            // Handle success, update UI, etc.
          }
        }
      );
    }
  };

  if (SectionContent) return SectionContent;
  return (
    <Spin spinning={isFetchLoad}>
      <div className="w-full h-full md:py-5 space-y-5">
        <div className="flex justify-end md:justify-between items-center px-5 md:px-10">
          <div className="hidden md:block">
            <p className="text-3xl font-bold text-secondary">
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

        <div
          hidden={!getLectData?.lectures?.length}
          className="w-full space-y-5"
        >
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3 sm:px-5 md:px-10">
            <Tabs
              activeKey={activeTab}
              defaultActiveKey={activeTab}
              items={tabs}
              onChange={handleTab}
              className="w-full md:w-auto !p-0 !m-0"
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
                  "MP3, M4A, WAV, PDF"
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
              // onClick={handleUploadTest}
              loading={loading}
              onClick={() => {
                handleUpload();
              }}
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
              <p className="text-sm font-normal text-secondary capitalize">{`Please fill the information below to personalize your ${activeAction}.`}</p>
            </div>
            {CreateContent}
          </div>
        </Modal>

        {/* invitation modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <InviteModal
          isOpen={isInvite}
          onClose={onInvClose}
          type={inviteType!}
          value={paramId!}
        />
      </div>
    </Spin>
  );
}

export default Home;
