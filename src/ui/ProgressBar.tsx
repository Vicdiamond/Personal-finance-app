interface ProgressBarProps {
  value: number;
  type: string;
  max?: number;
  color?: string;
}

function ProgressBar({ value, type, max = 100, color }: ProgressBarProps) {
  let height;
  if (type === "pot") {
    height = "h-2";
  }
  if (type === "budget") {
    height = "h-8";
  }

  return (
    <progress
      value={value}
      max={max}
      className={`w-full    rounded-full  mt-4 ${height} progress-bar-${color}`}
    />
  );
}

export default ProgressBar;
