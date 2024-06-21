import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist({
//   key: "createLectureKey",
//   storage: localStorage,
// });

export default atom({
  key: "createLectureKey",
  default: {
    isOpen: false,
    isRecording: false,
    elapsedTime: 0,
    isUploading: false,
    progressBar: 0,
  },
  //   effects_UNSTABLE: [persistAtom],
});
