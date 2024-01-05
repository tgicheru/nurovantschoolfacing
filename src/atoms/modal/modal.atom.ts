import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export type ModalType =
  | "Welcome"
  | "Success"
  | "Quiz"
  | "Analysis"
  | "LiveLecture"
  | "Flashcard"
  | "Recap"
  | "";

export interface ModalState {
  showModal: boolean;
  modalType: ModalType;
}

const { persistAtom } = recoilPersist({
  key: "modal",
  storage: localStorage,
});

export default atom<ModalState>({
  key: "modal",
  default: {
    showModal: false,
    modalType: "",
  },
  effects_UNSTABLE: [persistAtom],
});
