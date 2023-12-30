import { CustomButtonState } from "../types";

export const CustomButton = ({
  text,
  style,
  type = "button",
  className,
  onClick,
  variant = "bg",
  disabled = false,
  loading,
  width = "w-[327px]",
  height = "h-[56px]",
}: CustomButtonState) => {
  return (
    <button
      className={`text-[18px] tracking-[-0.3px] font-bold py-2 px-4 rounded-[24px] ${width} ${height} ${className} ${
        variant === "bg"
          ? "bg-primary text-white"
          : "border border-primary text-primary"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};
