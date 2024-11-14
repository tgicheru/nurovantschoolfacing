import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "onboarding",
  storage: sessionStorage,
});

export const onboardingAtom = atom({
  key: "onboarding",
  default: {role: "teacher"},
  effects_UNSTABLE: [persistAtom],
});
