import { Link } from "react-router-dom";

interface SummariesHeaderProps {
  title: string;
  buttonText: string;
  to: string;
}

const SummariesHeader: React.FC<SummariesHeaderProps> = ({
  title,
  buttonText,
  to,
}) => {
  return (
    <div className="flex items-center justify-between ">
      <h2 className="text-textPreset2 font-bold text-primaryGrey-900">
        {title}
      </h2>

      <Link to={to}>
        <button className="text-textPreset4 text-primaryBeige-500 font-normal flex items-center gap-3">
          {buttonText}
          <span>
            <img src="assets/images/icon-caret-right.svg" alt="" />
          </span>
        </button>
      </Link>
    </div>
  );
};

export default SummariesHeader;
