import AWS from "aws-sdk";
import Stripe from "stripe";
import { message, notification } from "antd";
import { useMutation } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import authAtom from "../atoms/auth/auth.atom";
import createLecturesAtom from "../atoms/other/createLectures.atom";
import { removeSpacesFromPdfName } from "../context/utils";

export const fileTypes = (key: string, idx?: number) => {
  const ext = key?.split("/")?.[idx || 1];
  const types = {
    jpeg: "image",
    mpeg: "audio",
    png: "image",
    jpg: "image",
    svg: "image",
  };
  return types?.[ext as keyof typeof types] || ext || key;
};

// export function useAWSUpload(
//   successAction?: any,
//   errorAction?: any,
//   type?: "profile" | "content"
// ) {
//   // Upload bucket type object
//   const buckets = {
//     content: process.env["REACT_APP_S3_BUCKET"]!,
//     profile: process.env["REACT_APP_S3_BUCKET_PROFILE"]!,
//   };
//   // Configure AWS with your credentials
//   AWS.config.update({
//     accessKeyId: awsConfig.accessKeyId,
//     secretAccessKey: awsConfig.secretAccessKey,
//     region: awsConfig.region,
//   });
//   // Create an S3 service object
//   const s3 = new AWS.S3();
//   const reader = new FileReader();
//   return useMutation(
//     async (payload: any) => {
//       reader.onload = async (e: any) => {
//         // Create a Blob from the loaded data
//         const fileBlob = new Blob([e.target.result], { type: payload?.type });
//         // Do something with the Blob, such as sending it to a server or processing it
//         // Specify the bucket and key (object key) for the upload
//         const uploadParams = {
//           Key: `${new Date()
//             .toLocaleTimeString([], { hour12: false })
//             .split(":")
//             .join("_")}--${(payload?.name || " ")?.replaceAll(" ", "")}`, // You can customize the key based on your requirement
//           Bucket: buckets?.[(type || "content") as keyof typeof buckets],
//           Body: fileBlob as unknown as Body,
//           ContentType: payload?.type,
//         };
//         // Upload the file
//         await s3.upload(
//           uploadParams,
//           (
//             err: Error | null,
//             data: AWS.S3.ManagedUpload.SendData | undefined
//           ) => {
//             if (err)
//               return () => {
//                 message.error("File upload failed!");
//                 errorAction?.();
//               };
//             successAction?.(data);
//           }
//         );
//       };

//       // Read the content of the file as a data URL
//       await reader.readAsArrayBuffer(payload);
//     },
//     {
//       // onError: (err: any) => notification.error({
//       //   description: err?.message || "File upload failed.",
//       //   message: "Error!",
//       // })
//     }
//   );
// }

export function useAWSUpload(
  successAction?: any,
  errorAction?: any,
  type?: "profile" | "content"
) {
  // Upload bucket type object
  const buckets = {
    content: process.env["REACT_APP_S3_BUCKET"]!,
    profile: process.env["REACT_APP_S3_BUCKET_PROFILE"]!,
  };

  const setLectureState = useSetRecoilState(createLecturesAtom);
  const { user } = useRecoilValue(authAtom);

  // Configure AWS with your credentials
  AWS.config.update({
    accessKeyId: process.env["REACT_APP_AWS_ACCESS_KEY_ID"],
    secretAccessKey: process.env["REACT_APP_AWS_SECRET_ACCESS_KEY"],
    region: process.env["REACT_APP_AWS_REGION"],
    apiVersion: "latest",
  });
  // Create an S3 service object
  const s3 = new AWS.S3();
  const handleFormat = (value: string) => value?.replaceAll(" ", "_")?.replaceAll("-", "_")?.replaceAll(":", "_")
  return useMutation(
    async (payload: any) => {
      const uploadParams = {
        Key: handleFormat(`${new Date().toISOString().replaceAll(".","_")}_${user?.info?._id || "user"}_${payload.name || `document.${payload?.type?.split("/")?.[1] || "wav"}`}`), 
        Bucket: buckets?.[(type || "content") as keyof typeof buckets],
        Body: payload as unknown as Body,
        ContentType: payload?.type,
      };
      return new Promise((resolve, reject) => {
        const upload = s3.upload(uploadParams);

        // Track progress of the chunk upload
        upload.on("httpUploadProgress", (progress) => {
          const uploadedBytes = progress.loaded;
          const totalBytes = progress.total;
          const percentProgress = Math.round(((uploadedBytes / totalBytes) * 100));

          // console.log(`Uploaded ${percentProgress}%`);
          setLectureState((prev) => ({...prev,
            progressBar: percentProgress,
          }));
        });

        upload.send((err, data) => {
          if (err) {
            reject(err);
            message.error("File upload failed!");
            console.error(err);
            errorAction?.();
          } else {
            console.log("AWS DATA", data);
            resolve(data);
            successAction?.(data);
          }
        });
      });
    },
  );
}

export function useAWSUploadALS(
  successAction?: any,
  errorAction?: any,
  type?: "profile" | "content"
) {
  // Upload bucket type object
  const buckets = {
    content: process.env["REACT_APP_S3_BUCKET_ALS"]!,
    profile: process.env["REACT_APP_S3_BUCKET_PROFILE"]!,
  };

  const setLectureState = useSetRecoilState(createLecturesAtom);
  const { user } = useRecoilValue(authAtom);

  // Configure AWS with your credentials
  AWS.config.update({
    accessKeyId: process.env["REACT_APP_AWS_ACCESS_KEY_ID"],
    secretAccessKey: process.env["REACT_APP_AWS_SECRET_ACCESS_KEY"],
    region: process.env["REACT_APP_AWS_REGION"],
    apiVersion: "latest",
  });
  // Create an S3 service object
  const s3 = new AWS.S3();
  const handleFormat = (value: string) => value?.replaceAll(" ", "_")?.replaceAll("-", "_")?.replaceAll(":", "_")
  return useMutation(
    async (payload: any) => {
      const uploadParams = {
        Key: handleFormat(`${new Date().toISOString().replaceAll(".","_")}_${user?.info?._id || "user"}_${payload.name || `document.${payload?.type?.split("/")?.[1] || "wav"}`}`), 
        Bucket: buckets?.[(type || "content") as keyof typeof buckets],
        Body: payload as unknown as Body,
        ContentType: payload?.type,
      };
      return new Promise((resolve, reject) => {
        const upload = s3.upload(uploadParams);

        // Track progress of the chunk upload
        upload.on("httpUploadProgress", (progress) => {
          const uploadedBytes = progress.loaded;
          const totalBytes = progress.total;
          const percentProgress = Math.round(((uploadedBytes / totalBytes) * 100));

          // console.log(`Uploaded ${percentProgress}%`);
          setLectureState((prev) => ({...prev,
            progressBar: percentProgress,
          }));
        });

        upload.send((err, data) => {
          if (err) {
            reject(err);
            message.error("File upload failed!");
            console.error(err);
            errorAction?.();
          } else {
            console.log("AWS DATA", data);
            resolve(data);
            successAction?.(data);
          }
        });
      });
    },
  );
}

export function useStripePay(successAction?: any) {
  const stripe = new Stripe(process.env.REACT_APP_STRIPE_PRIVATE_KEY!);
  return useMutation(
    async (amount: any) =>
      stripe.paymentIntents.create({
        currency: "usd",
        amount: amount * 100,
        payment_method_types: ["card"],
      }),
    {
      onSuccess: (response: any) => {
        successAction?.(response);
        // notification.success({
        //   message: "Success!",
        //   description: response?.message || "action successful.",
        // });
      },
      onError: (error: any) =>
        notification.error({
          message: "Error!",
          description: error?.message
            ? Object.entries(error?.errors || { key: [error?.message] })
                ?.map(([, value]) => (value as any)?.join(", "))
                ?.join(", ")
            : "something went wrong please check internet connection.",
        }),
    }
  );
}
