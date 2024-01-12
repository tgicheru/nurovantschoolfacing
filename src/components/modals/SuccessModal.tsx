import { useRecoilState, useRecoilValue } from "recoil";
import WelcomeLogo from "../../assets/WelcomeLogo.svg";
import modalAtom from "../../atoms/modal/modal.atom";
import { Link } from "react-router-dom";

export const SuccessModal = () => {
  const [{ message, action, path }, setModal] = useRecoilState(modalAtom)
  const handleClose = () => setModal({ showModal: false, modalType: "Success" });
  return (
    <div className="flex flex-col gap-2 items-center bg-white w-full md:w-[530px] rounded-[8px] p-[24px] md:p-[32px] text-black font-montserrat">
      <img src={WelcomeLogo} alt="welcome logo" />

      <h1 className="text-[32px] leading-[44px] tracking-[-0.64px] font-bold text-[#1b1b1b]">
        Success
      </h1>
      <p className="text-[14px] leading-[24px]">
        {message || "Operation successful!"}
      </p>
      <div className="w-full flex items-center justify-center p-2">
        <Link to={path!} onClick={handleClose} className="cursor-pointer text-primary font-medium text-[18px] tracking-[-0.3px]">
          {action || "View"}
        </Link>
      </div>
    </div>
  );
};
