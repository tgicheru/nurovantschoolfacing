/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import React, { useMemo, useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Form,
  Image,
  Input,
  Menu,
  Modal,
  Select,
  Spin,
  Tabs,
  Tag,
  Tooltip,
  Upload,
  UploadProps,
  message,
} from "antd";
import { FaPlus } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { TbCards } from "react-icons/tb";
import { PiCoins, PiRepeatFill } from "react-icons/pi";
import { IoIosVideocam } from "react-icons/io";
import { LuAlarmClock, LuUploadCloud } from "react-icons/lu";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import EmptyState from "../../../assets/EmptyState.svg";
import CustomPagination from "../../../components/CustomPagination";
import CustomTable from "../../../components/CustomTable";
import { ColumnsType } from "antd/es/table";
import { BiTestTube } from "react-icons/bi";
import { isEqual } from "../../../context/utils";
import { AiOutlineMessage } from "react-icons/ai";
import { IoArrowBack, IoMailOutline } from "react-icons/io5";
import QuizSection from "./sections/quiz";
import FlashcardSection from "./sections/flashcard";
import modalAtom from "../../../atoms/modal/modal.atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import InviteModal from "../../../components/modals/InviteModal";
import AWS from "aws-sdk";
import authAtom from "../../../atoms/auth/auth.atom";
import {
  useDeleteLecture,
  useGetLectures,
  usePostLecture,
} from "../../../hooks/lecture/lecture";
import {
  useDeleteQuiz,
  useGetAllQuiz,
  usePostQuiz,
} from "../../../hooks/quiz/quiz";
import {
  useDeleteFlashcard,
  useGetAllFlashcards,
  usePostFlashcards,
} from "../../../hooks/flashcards/flashcards";
import QuizQuestionsSection from "./sections/quizQuestions";
import {
  useDeleteRecap,
  useGetAllRecaps,
  usePostRecaps,
} from "../../../hooks/recap/recap";
import RecapSection from "./sections/recap";
import {
  useDeleteDiscuss,
  useGetAllDiscuss,
  usePostDiscuss,
} from "../../../hooks/discuss/discuss";
import DiscussSection from "./sections/discuss";
import { ImSpinner } from "react-icons/im";
import { ReactMic } from "react-mic";
import Logo from "../../../assets/newLogo.svg";
import { extractAvatar } from "../../../constants";
import { FaChevronDown } from "react-icons/fa6";
import { BorderHOC, ContentHeader, CustomButton } from "../../../components";
import { TbFilterSearch } from "react-icons/tb";
import { RiSearch2Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { GoRows } from "react-icons/go";
import DefaultBanner from "../../../assets/default_banner.png";
import { PiDotsThreeOutlineDuotone, PiBookOpenText } from "react-icons/pi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import DummyCoursePic from "../../../assets/dummyCourse.svg";
import { MdOutlineArrowBackIos } from "react-icons/md";

function Home() {
  const width = window.innerWidth;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [param, setParam] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(param.get("tab") || "lecture");
  const [isGenerate, setIsGenerate] = useState(false);
  const [upldFile, setUpldFile] = useState<any>({});
  const [isRecord, setIsRecord] = useState(false);
  const [isInvite, setIsInvite] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isLoadOpen, setIsLoadOpen] = useState(false);

  const onLoadClose = () => setIsLoadOpen(false);
  const onLoadOpen = () => setIsLoadOpen(true);
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
  const onClose = () => {
    setIsOpen(false);
    setSteps(0);
  };
  const inviteType = param.get("type");
  const onCreOpen = () => {
    setIsCreate(true);
    onGenClose();
  };

  const activeAction = param.get("action");
  const onOpen = () => setIsOpen(true);
  const paramId = param.get("id");

  const [loading, setLoading] = useState(false);
  const [upldData, setUpldData] = useState<any>({});

  // Live recording section
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [voice, setVoice] = React.useState(false);
  const [recordBlobLink, setRecordBlobLink] = React.useState<null | boolean>(
    null
  );

  const onStop = async (recordedBlob: any) => {
    onLoadOpen();
    console.log("recordedBlob is: ", recordedBlob);
    setRecordBlobLink(recordedBlob.blobURL);
    // Convert blob URL to blob data
    const blob = await fetch(recordedBlob.blobURL).then((res) => res.blob());
    console.log("blob", blob);

    AWS.config.update({
      accessKeyId: process.env["REACT_APP_AWS_ACCESS_KEY_ID"],
      secretAccessKey: process.env["REACT_APP_AWS_SECRET_ACCESS_KEY"],
      // region: process.env["REACT_APP_AWS_REGION"],
      region: "us-east-1",
    });

    // Specify the bucket and key (object key) for the upload
    const uploadParams = {
      // Bucket: process.env["REACT_APP_S3_BUCKET"]!,
      Bucket: "nurovantfrontend",
      Key: `${new Date()
        .toLocaleTimeString([], { hour12: false })
        .split(":")
        .join("_")}--recording${blob.size}.wav`, // You can customize the key based on your requirement
      Body: blob,
      ContentType: blob.type,
    };

    const s3 = new AWS.S3();

    // Upload the file
    // Upload the file
    s3.upload(
      uploadParams,
      (err: Error | null, data: AWS.S3.ManagedUpload.SendData | undefined) => {
        setLoading(false);
        setIsRunning(false);
        setIsRecording(false);
        if (err) return message.error("Error uploading file");
        onLoadClose();
        handleAction("lecture", "record");
        setUpldData(data);
        onRecClose();
        onCreOpen();
        onClose();
      }
    );
  };

  const startHandle = () => {
    setElapsedTime(0);
    setIsRunning(true);
    setIsRecording(true);
    setVoice(true);
  };
  const stopHandle = () => {
    setIsRunning(false);
    setIsRecording(false);
    setVoice(false);
  };

  const clearHandle = () => {
    setIsRunning(false);
    setIsRecording(false);
    setVoice(false);
    setRecordBlobLink(false);
    setElapsedTime(0);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRecording) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    const realTime = Number(selectedOption) * 60;

    if (selectedOption !== 0 && elapsedTime === realTime) {
      // handleStopRecording();
      stopHandle();
    }

    return () => clearInterval(timer);
  }, [isRecording, elapsedTime]);

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
          onLoadOpen();
          const blob = new Blob(recordedChunks, { type: "audio/wav" });
          // Do something with the recorded blob, like saving it or playing it
          console.log(blob, blob.size);
          // Configure AWS with your credentials
          AWS.config.update({
            accessKeyId: process.env["REACT_APP_AWS_ACCESS_KEY_ID"],
            secretAccessKey: process.env["REACT_APP_AWS_SECRET_ACCESS_KEY"],
            // region: process.env["REACT_APP_AWS_REGION"],
            region: "us-east-1",
          });

          // Specify the bucket and key (object key) for the upload
          const uploadParams = {
            // Bucket: process.env["REACT_APP_S3_BUCKET"]!,
            Bucket: "nurovantfrontend",
            Key: `${new Date()
              .toLocaleTimeString([], { hour12: false })
              .split(":")
              .join("_")}--recording-${blob.size}.wav`, // You can customize the key based on your requirement
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
                onLoadClose();
              } else {
                console.log("File uploaded successfully", data);

                postLectAction({
                  file_url: data?.Location,
                  file_type: "audio",
                  file_name: data?.Key,
                  lecture_name: `${new Date()
                    .toLocaleTimeString([], { hour12: false })
                    .split(":")
                    .join("_")}--recording-${blob.size}`,
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

  const [selectedOption, setSelectedOption] = useState(0);

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
    isLoading: getLectLoad,
  } = useGetLectures({ limit, page });

  const {
    data: getAllQuizData,
    refetch: getAllQuizFetch,
    isLoading: getAllQuizLoad,
  } = useGetAllQuiz({ limit, page });

  const {
    data: getAllFlashcardData,
    refetch: getAllFlashcardFetch,
    isLoading: getAllFlashcardLoad,
  } = useGetAllFlashcards({ limit, page });

  const {
    data: getAllRecapData,
    refetch: getAllRecapFetch,
    isLoading: getAllRecapLoad,
  } = useGetAllRecaps({ limit, page });

  const {
    data: getAllDiscussData,
    refetch: getAllDiscussFetch,
    isLoading: getAllDiscussLoad,
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
  const { mutate: deleteLectAction, isLoading: deleteLecLoad } =
    useDeleteLecture(handleRefetch);

  const { mutate: deleteQuiztAction, isLoading: deleteQuizLoad } =
    useDeleteQuiz(handleRefetch);

  const { mutate: deleteFlashtAction, isLoading: deleteFlashLoad } =
    useDeleteFlashcard(handleRefetch);

  const { mutate: deleteRectAction, isLoading: deleteRecLoad } =
    useDeleteRecap(handleRefetch);

  const { mutate: deleteDisctAction, isLoading: deleteDiscLoad } =
    useDeleteDiscuss(handleRefetch);

  const deleteLoad =
    deleteLecLoad ||
    deleteQuizLoad ||
    deleteFlashLoad ||
    deleteRecLoad ||
    deleteDiscLoad;

  const handleAction = (action: string, id: string) => {
    setParam({ action, id });
    onGenOpen();
  };

  const handleDelete = (
    type: "lecture" | "quiz" | "flashcard" | "recap" | "discuss",
    id: string
  ) => {
    const actions = {
      flashcard: () => deleteFlashtAction(id),
      discuss: () => deleteDisctAction(id),
      lecture: () => deleteLectAction(id),
      quiz: () => deleteQuiztAction(id),
      recap: () => deleteRectAction(id),
    };
    const action = () => {
      actions?.[type]?.();
      Modal.destroyAll();
    };
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
  };

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
          <Tooltip title={d?.quiz && "Quiz already generated"}>
            <Button
              onClick={() => handleAction("quiz", d?._id)}
              className="text-primary"
              icon={<BiTestTube />}
              disabled={d?.quiz}
              type="text"
            >
              Quiz
            </Button>
          </Tooltip>
          <Tooltip title={d?.flashcards && "Flashcards already generated"}>
            <Button
              onClick={() => handleAction("flashcards", d?._id)}
              className="text-primary"
              disabled={d?.flashcards}
              icon={<TbCards />}
              type="text"
            >
              Flashcards
            </Button>
          </Tooltip>
          <Tooltip title={d?.recaps && "Recaps already generated"}>
            <Button
              onClick={() => handleAction("recaps", d?._id)}
              className="text-primary"
              icon={<PiRepeatFill />}
              disabled={d?.recaps}
              type="text"
            >
              Recaps
            </Button>
          </Tooltip>
          <Tooltip title={d?.discussions && "Discussion already generated"}>
            <Button
              onClick={() => handleAction("discussion", d?._id)}
              className="text-primary"
              icon={<AiOutlineMessage />}
              disabled={d?.discussions}
              type="text"
            >
              Discuss
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      dataIndex: "_id",
      render: (d) => (
        <Button
          onClick={() => handleDelete("lecture", d)}
          icon={<GoTrash className="text-lg" />}
          loading={deleteLoad}
          type="text"
        />
      ),
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
      render: (d) => (
        <Button
          onClick={() => handleDelete("quiz", d)}
          icon={<GoTrash className="text-lg" />}
          loading={deleteLoad}
          type="text"
        />
      ),
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
      render: (d) => (
        <Button
          onClick={() => handleDelete("flashcard", d)}
          icon={<GoTrash className="text-lg" />}
          loading={deleteLoad}
          type="text"
        />
      ),
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
      render: (d) => (
        <Button
          onClick={() => handleDelete("recap", d)}
          icon={<GoTrash className="text-lg" />}
          loading={deleteLoad}
          type="text"
        />
      ),
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
      render: (d) => (
        <Button
          onClick={() => handleDelete("discuss", d)}
          icon={<GoTrash className="text-lg" />}
          loading={deleteLoad}
          type="text"
        />
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
            <p>Flashcards</p>
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
    handleUpldFileClr();
    setLoading(false);
    onClose();
    onRecClose();
    onCreClose();
    handleRefetch();
    onLoadClose();
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

  const handleCreateLecture = (value: any) => {
    const payload = {
      ...value,
      upload_type: "upload",
      file_name: upldData?.Key,
      file_url: upldData?.Location,
    };
    if (isEqual(paramId, "record"))
      return postLectAction({
        ...payload,
        file_type: "audio",
        upload_type: "record",
      });
    if (
      upldFile?.file?.type === "application/pdf" ||
      upldFile?.file?.type === "text/plain" ||
      upldFile?.file?.type ===
        "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
      upldFile?.file?.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return postLectAction({
        ...payload,
        file_type: "doc",
        // file_name: `${user?._id}-uploadPdf-${moment().format("DD-MM-YYYY")}`,
      });
    }
    postLectAction({
      ...payload,
      file_type: "audio",
      // file_name: `${user?._id}-uploadAudio-${moment().format("DD-MM-YYYY")}`,
    });

    console.log(payload);
  };

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
    postLectLoad ||
    postQuizLoad ||
    postFlashcardLoad ||
    postRecapLoad ||
    postDiscussLoad;
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
          key: "lecture",
          component: (
            <Form onFinish={handleCreateLecture} layout="vertical">
              <Form.Item label="Name of Lecture" name="lecture_name">
                <Input
                  className="!rounded-xl"
                  placeholder="Enter lecture name"
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
                Save Lecture
              </Button>
            </Form>
          ),
        },
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
              <Form.Item label="Name of Flashcards" name="flashcard_title">
                <Input
                  className="!rounded-xl"
                  placeholder="Enter flashcards name"
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
                Save Flashcards
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

  function removeSpacesFromPdfName(pdfName: string) {
    const trimmedName = pdfName.trim();
    return trimmedName.replace(/[^a-zA-Z0-9.]/g, "");
  }

  // const [blob, setBlob] = useState<Blob>();
  const handleUpload = async () => {
    setLoading(true);
    onLoadOpen();
    console.log(upldFile);
    if (!upldFile) {
      console.error("No file selected");
      setLoading(false);
      return;
    }

    // Configure AWS with your credentials
    AWS.config.update({
      accessKeyId: process.env["REACT_APP_AWS_ACCESS_KEY_ID"],
      secretAccessKey: process.env["REACT_APP_AWS_SECRET_ACCESS_KEY"],
      region: process.env["REACT_APP_AWS_REGION"],
    });

    // Create an S3 service object
    // Initialize AWS S3
    const s3 = new AWS.S3({
      accessKeyId: process.env["REACT_APP_AWS_ACCESS_KEY_ID"],
      secretAccessKey: process.env["REACT_APP_AWS_SECRET_ACCESS_KEY"],
      // region: process.env["REACT_APP_AWS_REGION"],
      region: "us-east-1",
    });

    // Specify the bucket and key (object key) for the upload
    const uploadParams = {
      // Bucket: process.env["REACT_APP_S3_BUCKET"]!,
      Bucket: "nurovantfrontend",
      Key: `${new Date()
        .toLocaleTimeString([], { hour12: false })
        .split(":")
        .join("_")}--${removeSpacesFromPdfName(upldFile.file.name)}`, // You can customize the key based on your requirement
      Body: audioBlob as Body,
      ContentType: upldFile.file.type,
    };

    s3.upload(
      uploadParams,
      (err: Error | null, data: AWS.S3.ManagedUpload.SendData | undefined) => {
        setLoading(false);
        console.log(data);
        if (err) {
          console.log("error", err);
          setLoading(false);
          onLoadClose();
          return message.error("Error uploading file");
        }
        handleAction("lecture", "id");
        setUpldData(data);
        onLoadClose();
        onCreOpen();
        onClose();
      }
    );
  };

  const [isGridView, setIsGridView] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [courses, setCourses] = useState<any[]>([]);

  const [steps, setSteps] = useState(0);

  if (SectionContent) return SectionContent;
  // console.log(user);
  return (
    <Spin spinning={isFetchLoad}>
      <div className="w-full h-full min-h-screen md:pb-5 space-y-5 my-6">
        <ContentHeader
          headerText={`Courses 📚`}
          subText={`Organize and manage your lecture materials.`}
        />

        <BorderHOC className="" rounded="rounded-[10px]">
          <div className="w-full px-[15px] pt-[15px]">
            <div className="w-full pb-[10px]">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <h1 className="text-neutral-900 text-[24px] leading-[32px] font-bold">
                    {courses.length}
                  </h1>
                  <p className="text-sm font-semibold text-neutral-600">
                    Course
                  </p>
                </div>
                <div className="flex items-center gap-[10px] h-[40px]">
                  <div
                    className="h-full flex items-center py-[8px] gap-[7px] px-3 cursor-pointer"
                    onClick={() => {}}
                  >
                    <TbFilterSearch className="text-neutral-900 text-[24px]" />
                    <p className="text-sm font-bold text-neutral-900">Filter</p>
                  </div>
                  <BorderHOC className="h-full !w-[1px]" />
                  <div className="w-[40px] flex items-center justify-center h-full">
                    <RiSearch2Line className="text-[24px]" />
                  </div>
                  <BorderHOC className="h-full !w-[1px]" />
                  <div className="flex items-center gap-[5px] h-full">
                    <div
                      className={`w-[40px] flex items-center justify-center h-full rounded-[1000px] cursor-pointer ${
                        courses.length && isGridView && "bg-[#E7E7E7]"
                      }`}
                      onClick={() => {
                        setIsGridView(true);
                      }}
                    >
                      <RxDashboard className="text-[24px]" />
                    </div>
                    <div
                      className={`w-[40px] flex items-center justify-center h-full rounded-[1000px] cursor-pointer ${
                        courses.length && isGridView === false && "bg-[#E7E7E7]"
                      }`}
                      onClick={() => {
                        setIsGridView(false);
                      }}
                    >
                      <GoRows className="text-[24px]" />
                    </div>
                  </div>
                  <BorderHOC className="h-full !w-[1px]" />
                  <Button
                    onClick={onOpen}
                    className="bg-primary !rounded-[1000px]"
                    type="primary"
                    size="large"
                    icon={<FaPlus />}
                  >
                    Create course
                  </Button>
                </div>
              </div>
              <BorderHOC className="mt-[10px]" />
            </div>

            {courses.length ? (
              <div className="w-full flex flex-col">
                {isGridView ? (
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {courses.map((course, idx) => (
                      <div
                        className="w-full cursor-pointer"
                        key={idx}
                        onClick={() => {
                          navigate("/courses/details");
                        }}
                      >
                        <BorderHOC className="" rounded="rounded-[10px]">
                          <div className="space-y-4 p-4 w-full">
                            <div className="w-full rounded-[10px] overflow-hidden">
                              <img
                                src={course.image}
                                onLoadStart={() => {
                                  setIsLoadingImage(true);
                                }}
                                onLoad={() => {
                                  setIsLoadingImage(false);
                                }}
                                onError={(error) => {
                                  error.currentTarget.src = DefaultBanner;
                                  setIsLoadingImage(false);
                                }}
                                alt="business logo"
                                className={`h-[93px] w-full object-cover ${
                                  isLoadingImage ? "blur-sm" : ""
                                }`}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex flex-col gap-[5px]">
                                <h2 className="text-sm text-neutral-900 font-bold">
                                  {course.title}
                                </h2>
                                <p className="text-[12px] leading-[18px] text-neutral-600">
                                  {course.createdAt}
                                </p>
                              </div>

                              <button className="flex items-center justify-center">
                                <PiDotsThreeOutlineDuotone className="text-[20px]" />
                              </button>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="font-bold text-sm text-neutral-900">
                                  Institution
                                </p>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  {course.institution}
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-sm text-neutral-900">
                                  State
                                </p>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  {course.state}
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-sm text-neutral-900">
                                  Grade
                                </p>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  {course.grade}
                                </p>
                              </div>
                            </div>
                          </div>
                        </BorderHOC>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col w-full gap-3 p-4">
                    {courses.map((course, idx) => (
                      <div
                        className="w-full cursor-pointer"
                        key={idx}
                        onClick={() => {
                          navigate("/courses/details");
                        }}
                      >
                        <BorderHOC className="w-full" rounded="rounded-[10px]">
                          <div className="flex items-center gap-4 px-4 py-[10px]">
                            <div className="w-[98px] rounded-[10px] overflow-hidden">
                              <img
                                src={course.image}
                                onLoadStart={() => {
                                  setIsLoadingImage(true);
                                }}
                                onLoad={() => {
                                  setIsLoadingImage(false);
                                }}
                                onError={(error) => {
                                  error.currentTarget.src = DefaultBanner;
                                  setIsLoadingImage(false);
                                }}
                                alt="business logo"
                                className={`h-[53px] w-full object-cover ${
                                  isLoadingImage ? "blur-sm" : ""
                                }`}
                              />
                            </div>
                            <div className="flex items-center justify-around flex-1 gap-4">
                              <div className="flex flex-col gap-[5px]">
                                <h2 className="text-sm text-neutral-900 font-bold whitespace-nowrap">
                                  {course.title}
                                </h2>
                                <p className="text-[12px] leading-[18px] text-neutral-600 whitespace-nowrap">
                                  {course.createdAt}
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-sm text-neutral-900">
                                  Students
                                </p>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  -- --
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-sm text-neutral-900">
                                  Grade
                                </p>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  {course.grade}
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-sm text-neutral-900">
                                  State
                                </p>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  {course.state}
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-sm text-neutral-900">
                                  Institution
                                </p>
                                <p className="text-neutral-600 text-[12px] leading-[18px] font-medium">
                                  {course.institution}
                                </p>
                              </div>
                            </div>
                          </div>
                        </BorderHOC>
                      </div>
                    ))}
                  </div>
                )}
                <BorderHOC className="mt-[10px]" />
                <div className="flex items-center h-[60px] justify-between text-sm text-gray-600">
                  <p className="text-sm text-neutral-900">Page 1 of 10</p>
                  <div className="flex items-center gap-4">
                    <button className="">
                      <BorderHOC className="w-full" rounded="rounded-[1000px]">
                        <div className="py-[10px] w-[106px] flex items-center justify-center">
                          <span className="text-[#344054] text-sm">
                            Previous
                          </span>
                        </div>
                      </BorderHOC>
                    </button>

                    <button className="">
                      <BorderHOC className="w-full" rounded="rounded-[1000px]">
                        <div className="py-[10px] w-[80px] flex items-center justify-center">
                          <span className="text-[#344054] text-sm">Next</span>
                        </div>
                      </BorderHOC>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center py-[72px]">
                <div className="flex items-center justify-center flex-col gap-[15px] max-w-[198px]">
                  <div className="flex flex-col items-center justify-center">
                    <img src={EmptyState} alt="empty courses" />
                    <span className="text-base font-bold text-neutral-900 text-center">
                      You don’t have any course created yet
                    </span>
                  </div>

                  <Button
                    onClick={onOpen}
                    className="bg-primary !rounded-[1000px]"
                    type="primary"
                    size="large"
                    icon={<FaPlus />}
                  >
                    Create course
                  </Button>
                </div>
              </div>
            )}
          </div>
        </BorderHOC>

        {/* <div className="px-5 md:px-10 flex justify-end items-center">
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
          className="w-full space-y-5 px-4 md:px-10 bg-white"
        >
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3">
            <Tabs
              activeKey={activeTab}
              defaultActiveKey={activeTab}
              items={tabs}
              onChange={handleTab}
              className="w-full md:w-auto !p-0 !m-0"
            />
            <CustomPagination
              hidden
              total={75}
              pageSize={limit}
              sizeChanger
              current={page}
              size="small"
              onChange={setPage}
            />
          </div>
          <div className="pb-[50px] md:pb-0">
            <CustomTable data={data} column={column} pagination={false} />
          </div>
        </div>

        <div hidden={Boolean(getLectData?.lectures?.length)}>
          <div className="h-full flex flex-col justify-center items-center bg-white rounded-[16px] pb-7 mx-4 md:mx-8 ">
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
        </div> */}

        {/* Create Course Drawer >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <Drawer
          open={isOpen}
          onClose={onClose}
          width={width <= 500 ? width : 512}
          styles={{
            header: {
              borderRadius: 20,
            },
          }}
          footer={false}
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: 20,
            marginRight: 20,
            boxShadow: "none",
            // boxShadow: undefined,
          }}
          maskClosable={true}
          // mask={false}
          maskClassName="!bg-[rgba(0,0,0,0.3)]"
          closeIcon={false}
          className=""
          // classNames={}
          rootClassName="!pr-[20px] !pt-[20px] !shadow-none "
        >
          <div className="w-full flex justify-between pb-6">
            <div className="flex gap-3">
              {steps !== 0 && (
                <button
                  onClick={() => {
                    setSteps((prev) => prev - 1);
                  }}
                  className="flex items-start pt-1"
                >
                  <MdOutlineArrowBackIos className="text-[20px] text-neutral-900" />
                </button>
              )}

              <div className="flex flex-col gap-[5px]">
                <h3 className="text-[24px] leading-[32px] font-bold text-neutral-900">
                  {steps === 2 ? "One more thing!" : "Create Course"}
                </h3>
                <p className="text-sm font-semibold text-neutral-600 max-w-[293px">
                  {steps === 1
                    ? `Add the necessary details to your course.`
                    : steps === 2
                    ? `Set clear goals to guide and measure student 
progress effectively`
                    : `Let's get you all set up by creating your first class.`}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="flex items-start pt-1">
              <IoCloseCircleOutline className="text-[24px] text-neutral-900" />
            </button>
          </div>
          <BorderHOC className="" />
          {steps === 0 && (
            <div className="w-full pt-[50px] flex flex-col gap-5">
              <BorderHOC rounded="rounded-[10px]">
                <div
                  className="px-5 py-[19px] gap-[9px] cursor-pointer"
                  onClick={() => {
                    setSteps(1);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[30px] h-[30px] rounded-[7px] bg-[#17B26A] flex items-center justify-center">
                      <PiBookOpenText className="text-[18px] text-white transform scale-x-[-1]" />
                    </div>
                    <h5 className="text-base font-bold text-neutral-900">
                      Create a new course
                    </h5>
                  </div>
                  <p className="text-sm font-semibold text-neutral-600 mt-2">
                    Create a course and add lectures for your students
                  </p>
                </div>
              </BorderHOC>

              <BorderHOC rounded="rounded-[10px]">
                <div className="px-5 py-[19px] gap-[9px] cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-[30px] h-[30px] rounded-[7px] bg-[#F79009] flex items-center justify-center">
                      <FiUploadCloud className="text-white" />
                    </div>
                    <h5 className="text-base font-bold text-neutral-900">
                      Import from LMS
                    </h5>
                  </div>
                  <p className="text-sm font-semibold text-neutral-600 mt-2">
                    Create a course by uploading your LMS
                  </p>
                </div>
              </BorderHOC>
            </div>
          )}

          {steps === 1 && (
            <div className="w-full pt-[50px] flex flex-col gap-5">
              <div className="w-full flex gap-5">
                <div className="flex flex-col gap-[6px] w-full">
                  <h4 className="text-sm font-bold text-neutral-900">
                    Courses Image
                  </h4>
                  <div className="w-full h-[95px] rounded-[10px] bg-[#F5F5F5] bg-opacity-90 flex items-center justify-center">
                    <img src={DummyCoursePic} alt={"dummy picture"} />
                  </div>
                </div>

                <div className="w-[135px] h-full flex items-end justify-end mt-auto">
                  <button className="w-full mt-auto">
                    <BorderHOC rounded="rounded-[1000px]">
                      <div className="flex items-center gap-[10px] justify-center px-2 w-full h-[40px]">
                        <FiUploadCloud className="" />
                        <span className="text-[12px] leading-[18px] font-bold text-neutral-900 whitespace-nowrap">
                          Upload image
                        </span>
                      </div>
                    </BorderHOC>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-[6px] w-full">
                <h4 className="text-sm font-bold text-neutral-900">
                  Courses Name
                </h4>
                <input
                  type="email"
                  placeholder="Enter email address here"
                  className="px-5 py-[14px] placeholder:text-[#CECFD0] text-sm font-bold bg-[#F5f5f5] bg-opacity-90 rounded-[10px]"
                />
              </div>

              <div className="flex flex-col gap-[6px] w-full">
                <h4 className="text-sm font-bold text-neutral-900">
                  Upload Curriculum
                </h4>
                <Upload.Dragger {...uploadProps} className="w-full">
                  <p className="ant-upload-drag-icon">
                    <LuUploadCloud className="text-black text-2xl bg-light mx-auto" />
                  </p>
                  <p className="ant-upload-text">
                    {upldFile?.file ? (
                      "Your file has been uploaded"
                    ) : (
                      <>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
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
              </div>
              <Button
                // disabled={!upldFile?.file}
                // onClick={handleUploadTest}
                loading={loading}
                onClick={() => {
                  // handleUpload();
                  setSteps(2);
                }}
                className="bg-primary !w-full !h-[48px]"
                type="primary"
                size="large"
                shape="round"
              >
                Continue
              </Button>
            </div>
          )}

          {steps === 2 && (
            <div className="w-full pt-[50px] flex flex-col gap-5">
              <h4 className="text-base font-bold text-neutral-900">
                Learning Standard
              </h4>

              <div className="w-full flex gap-5 items-center">
                <div className="flex flex-col gap-[6px] w-full">
                  <h4 className="text-sm font-bold text-neutral-900">State</h4>
                  <Select
                    placeholder="Select state"
                    className=" placeholder:text-[#CECFD0] text-sm font-bold bg-[#F5f5f5] bg-opacity-90 rounded-[10px] !border-none h-[48px]"
                    options={[
                      { label: "Lagos", value: "lagos" },
                      { label: "Abuja", value: "abuja" },
                    ]}
                  />
                </div>

                <div className="flex flex-col gap-[6px] w-full">
                  <h4 className="text-sm font-bold text-neutral-900">Grade</h4>
                  <Select
                    placeholder="Select Grade"
                    className=" placeholder:text-[#CECFD0] text-sm font-bold bg-[#F5f5f5] bg-opacity-90 rounded-[10px] !border-none !outline-none !focus:outline-none h-[48px]"
                    options={[
                      { label: "Lagos", value: "lagos" },
                      { label: "Abuja", value: "abuja" },
                    ]}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[6px] w-full">
                <h4 className="text-sm font-bold text-neutral-900">
                  Institution
                </h4>
                <Select
                  placeholder="Select institution"
                  className=" placeholder:text-[#CECFD0] text-sm font-bold bg-[#F5f5f5] bg-opacity-90 rounded-[10px] !border-none !outline-none !focus:outline-none h-[48px]"
                  options={[
                    { label: "Lagos", value: "lagos" },
                    { label: "Abuja", value: "abuja" },
                  ]}
                />
              </div>

              <Divider className="border-light">Or</Divider>

              <div className="flex flex-col gap-[6px] w-full">
                <h4 className="text-sm font-bold text-neutral-900">
                  Upload Learning Standard
                </h4>
                <Upload.Dragger {...uploadProps} className="w-full">
                  <p className="ant-upload-drag-icon">
                    <LuUploadCloud className="text-black text-2xl bg-light mx-auto" />
                  </p>
                  <p className="ant-upload-text">
                    {upldFile?.file ? (
                      "Your file has been uploaded"
                    ) : (
                      <>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
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
              </div>
              <Button
                // disabled={!upldFile?.file}
                // onClick={handleUploadTest}
                loading={loading}
                onClick={() => {
                  // handleUpload();
                  setCourses((prev) => [
                    ...prev,
                    {
                      title: "Understanding Mathematics",
                      createdAt: "Created 11 Nov, 2024 • 12:09PM",
                      institution: "St. Calton High School",
                      state: "Alabama",
                      grade: "3-5 (Middle School)",
                      image: DefaultBanner,
                    },
                  ]);
                  onClose();
                }}
                className="bg-primary !w-full !h-[48px]"
                type="primary"
                size="large"
                shape="round"
              >
                Create Course
              </Button>
            </div>
          )}
        </Drawer>

        {/* upload document modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        {/* <Modal
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
            <p className="text-sm font-medium text-[#838382]">
              Note: Each generation costs 2 credits
            </p>
          </div>
        </Modal> */}

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
            {isRecording === false && (
              <div className="w-full flex items-center justify-center gap-1">
                <select value={selectedOption} onChange={handleSelectChange}>
                  <option value={0} disabled>
                    Select an option
                  </option>
                  {options}
                </select>

                <span className="text-[14px] leading-[20px]">Mins</span>
              </div>
            )}

            <ReactMic
              record={voice}
              className="sound-wave w-full "
              onStop={onStop}
              strokeColor="#000000"
              // backgroundColor="#FF4081"
            />

            {isRecording && (
              <div className="w-full flex flex-col gap-4 md:gap-[32px] items-center justify-center">
                <div className="flex items-center justify-center flex-col gap-3">
                  <span className="text-[50px] leading-[50px] font-bold">
                    {formatTime(elapsedTime)}
                  </span>
                  {selectedOption > 0 && (
                    <div className="flex items-center gap-1 font-medium text-[12px] leading-[18px]">
                      <span className="text-[#b3b3b3] flex items-center gap-1">
                        <LuAlarmClock size={20} color="#4970FC" />
                        <span>Timer:</span>
                      </span>
                      <span className="text-[#7b7e8c]">
                        {selectedOption} mins
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
            <Button
              // disabled={!upldFile?.file}
              onClick={isRecording ? stopHandle : startHandle}
              className="bg-primary !w-full md:!w-[70%]"
              loading={postLectLoad}
              type="primary"
              size="large"
              shape="round"
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
          </div>
        </Modal>

        {/* loading modal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <Modal
          styles={{
            content: {
              background: "none",
              padding: 0,
            },
          }}
          onCancel={onLoadClose}
          open={isLoadOpen}
          closeIcon={false}
          footer={false}
        >
          <div className="w-full h-full text-center p-5 md:p-10 bg-white rounded-2xl flex flex-col justify-center gap-5 items-center">
            <ImSpinner className="text-[100px] animate-spin text-primary" />
            <p className="text-[30px] font-extrabold text-dark">
              Analyzing your <br /> content
            </p>
            <p className="text-sm font-medium text-[#646462]">
              Please hold on while we analyze your content{" "}
            </p>
            {/* <Button
              className="text-primary text-lg font-extrabold"
              onClick={() => {
                onLoadClose();
              }}
              size="large"
              type="text"
              block
            >
              Done
            </Button> */}
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
            <div className="flex justify-center items-center gap-2">
              <p className="text-sm font-medium text-[#838382]">
                Available Credit
              </p>
              <p className="text-base font-medium flex items-center gap-2 text-[#646462]">
                <PiCoins />
                <span>{user?.current_credit}</span>
              </p>
            </div>
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
