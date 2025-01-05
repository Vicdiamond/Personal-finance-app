interface ButtonProps {
  children: any;
  type: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

function Button({ children, type, onClick, className, disabled }: ButtonProps) {
  let style;
  if (type === "primary")
    style = "bg-primaryBeige-100 text-primaryGrey-900 w-full";
  if (type === "secondary") style = "bg-primaryGrey-900 text-white ";

  if (type === "danger") style = "bg-secondary-red text-white w-full";
  return (
    <button
      className={`p-4   rounded-lg text-textPreset4 font-bold  ${style} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
