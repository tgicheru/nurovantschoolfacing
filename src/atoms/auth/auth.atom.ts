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
    token: null,
    onBoarded: false,
    role: null, // 'admin', 'teacher', 'student'
    isAdmin: false,
  },
  effects_UNSTABLE: [persistAtom],
});
