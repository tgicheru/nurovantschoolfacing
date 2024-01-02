import { useSetRecoilState, useRecoilValue } from "recoil";
import modalAtom from "../atoms/modal/modal.atom";
import { ReactNode, FC } from "react";
import { AnalysisModal, QuizModal, SuccessModal, WelcomeModal } from "./modals";

interface Props {
  children?: ReactNode;
}

export const ModalContainer: FC<Props> = ({ children }) => {
  const { showModal, modalType } = useRecoilValue(modalAtom);
  const setModal = useSetRecoilState(modalAtom);

  let display: ReactNode;

  if (modalType === "Welcome") {
    display = <WelcomeModal />;
  }

  if (modalType === "Success") {
    display = <SuccessModal />;
  }

  if (modalType === "Analysis") {
    display = <AnalysisModal />;
  }

  if (modalType === "Quiz") {
    display = <QuizModal />;
  }

  return (
    <div>
      {showModal && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 items-center flex px-4 md:px-0 ${
            // modalType === "vote modal"
            //   ? "z-50 ml-auto flex justify-end items-end"
            //   : modalType === "vote category modal"
            //   ? "z-50 justify-center items-center"
            "z-[1000] justify-center items-center"
          }`}
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(0px)",
          }}
          onClick={() => {
            setModal({
              showModal: false,
              modalType: "",
            });
          }}
        >
          <div className="w-full md:w-max" onClick={(e) => e.stopPropagation()}>
            {display}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
