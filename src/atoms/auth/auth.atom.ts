import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "authentication",
  storage: localStorage,
});

export default atom({
  key: "authentication",
  default: {
    isLoggedIn: false,
    user: null,
    onBoarded: false,
  },
  effects_UNSTABLE: [persistAtom],
});
