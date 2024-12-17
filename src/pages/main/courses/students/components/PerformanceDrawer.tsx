import { Drawer } from "antd";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BorderHOC } from "../../../../../components";
import PerformanceImage from "../../../../../assets/performance.svg";
import PercentageImage from "../../../../../assets/percentage.svg";

export default function PerformanceDrawer({ onClose, isOpen }: any) {
  const width = window.innerWidth;

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      width={width <= 500 ? width : 512}
      styles={{
        header: {
          borderRadius: 20,
        },
      }}
      footer={false}
      style={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 20,
        marginRight: 20,
        boxShadow: "none",
        // boxShadow: undefined,
      }}
      maskClosable={true}
      // mask={false}
      maskClassName="!bg-[rgba(0,0,0,0.3)]"
      closeIcon={false}
      className=""
      // classNames={}
      rootClassName="!pr-[20px] !pt-[20px] !shadow-none "
    >
      <div className="w-full flex justify-between pb-6">
        <div className="flex gap-3">
          <div className="flex flex-col gap-[5px]">
            <h3 className="text-[24px] leading-[32px] font-bold text-neutral-900">
              Student&apos;s performance
            </h3>
            <p className="text-sm font-semibold text-neutral-600 max-w-[293px">
              Below is a detailed analysis of student progress based on the
              provided performance charts. The report highlights areas of
              achievement and topics where students consistently struggle across
              different lectures.
            </p>
          </div>
        </div>
        <button onClick={onClose} className="flex items-start pt-1">
          <IoCloseCircleOutline className="text-[24px] text-neutral-900" />
        </button>
      </div>
      <BorderHOC className="" />
      <div className="w-full flex flex-col gap-[16px]">
        <h3 className="text-base font-bold text-neutral-900">
          Students performance overtime
        </h3>
        <img src={PerformanceImage} alt="performance" className="w-full" />
        <h3 className="text-base font-bold text-neutral-900">
          Students performance on Algebra 101
        </h3>
        <BorderHOC className="" />
        <div className="w-full flex gap-[25px]">
          <div className="w-[174px] flex flex-col gap-[25px]">
            <h4 className="text-sm font-bold text-neutral-900">
              Percentage performance
            </h4>
            <img src={PercentageImage} className="w-full" alt="percentage" />
          </div>
        </div>
      </div>
    </Drawer>
  );
}
