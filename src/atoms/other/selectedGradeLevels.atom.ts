import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "selectedGrade",
  storage: sessionStorage,
});

export default atom({
  key: "selectedGrade",
  default: {
    selectedLevels: ["on"],
  },
  effects_UNSTABLE: [persistAtom],
});
