export type CustomButtonState = {
  onClick: () => void;
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  variant?: "bg" | "outline" | "text";
  width?: string;
  height?: string;
};

export type Size = {
  width: number | undefined;
  height: number | undefined;
};
