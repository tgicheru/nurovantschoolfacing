import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "menu",
  storage: localStorage,
});

export default atom({
  key: "menu",
  default: true,
  effects_UNSTABLE: [persistAtom],
});
