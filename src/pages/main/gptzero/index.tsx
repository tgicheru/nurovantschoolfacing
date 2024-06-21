import React, { useEffect, useState } from "react";
import { CustomButton } from "../../../components";
import { Button, Drawer, Upload, UploadProps } from "antd";
import { LuInbox } from "react-icons/lu";
import { FiUploadCloud } from "react-icons/fi";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { useAWSUpload } from "../../../hooks/otherhooks";

function GptZeroPage() {
  const { width } = useWindowSize();
  const [open, setOpen] = useState(false);
  const [upldFile, setUpldFile] = useState<any>({});
  const [upldFileData, setUpldFileData] = useState<any>({});
  const [isMobile, setIsMobile] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (width) {
      if (width < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  }, [width]);

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    directory: false,
    method: undefined,
    className: "!w-full",
    showUploadList: false,
    onChange({ file }: { file: Blob | any }) {
      setUpldFile({
        file: file?.originFileObj,
        fileobj: file,
      });
      console.log(file);

      if (file?.originFileObj) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          // Create a Blob from the loaded data
          // if (e.target?.result instanceof ArrayBuffer) {
          //   const audioBlob = new Blob([e.target.result], { type: file.type });
          //   setAudioBlob(audioBlob);
          // }
          // Do something with the Blob, such as sending it to a server or processing it
          // console.log(audioBlob);
        };

        // Read the content of the file as a data URL
        reader.readAsArrayBuffer(file?.originFileObj);
      }
    },
  };

  const { mutate: uploadFileAction } = useAWSUpload(
    (res: any) => {
      setUpldFileData(res);
      setIsLoading(false);
      onClose();
    },
    () => setIsLoading(false),
    "content"
  );

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleUpldFileClr = () => setUpldFile({});

  return (
    <div className="md:mx-10 py-6 my-6 px-8 rounded-[8px] flex items-center justify-center relative bg-white h-screen md:h-[429px] font-montserrat">
      <h1 className="text-[18px] leading-[27px] font-semibold absolute top-6 left-8">
        Gpt Zero
      </h1>
    </div>
  );
}

export default GptZeroPage;
