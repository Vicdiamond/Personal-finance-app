import { NavLink } from "react-router-dom";
import { navLinks } from "../data/data";
import { motion } from "motion/react";

interface ListButtonProps {
  to: string;
  src: string;
  activeSrc: string;
  name: string;
  isMinimized: boolean;
}

interface SidebarProps {
  isMinimized: boolean;
  setIsMinimized: () => void;
}

function Sidebar({ isMinimized, setIsMinimized }: SidebarProps) {
  return (
    <motion.aside
      className={`bg-primaryGrey-900 text-white order-2 xl:order-1 pt-3 xl:pt-10 xl:pb-14 xl:flex xl:flex-col items-start px-4 md:px-10 xl:px-0 xl:pr-10 rounded-t-lg xl:rounded-r-lg xl:rounded-tl-none`}
      animate={{
        width: isMinimized
          ? window.innerWidth >= 1280
            ? "120px"
            : "100%"
          : window.innerWidth >= 1280
          ? "300px"
          : "100%",
      }}
      transition={{ duration: 0.5, ease: "easeInOut", type: "tween" }}
    >
      {!isMinimized ? (
        <img
          className="hidden xl:block ml-8 mb-16"
          src="/assets/images/logo-large.svg"
          alt="logo"
        />
      ) : (
        <img
          className="hidden xl:block ml-8 mb-16"
          src="/assets/images/logo-small.svg"
          alt="logo"
        />
      )}
      <ul className="flex items-center justify-between xl:flex-col xl:items-start xl:w-full">
        {navLinks.map((link) => (
          <ListButton
            to={link.to}
            src={link.src}
            activeSrc={link.activeSrc}
            name={link.name}
            key={link.name}
            isMinimized={isMinimized}
          />
        ))}
      </ul>
      <button
        className="hidden xl:flex mt-auto ml-8 gap-4 items-center"
        onClick={setIsMinimized}
      >
        {isMinimized ? (
          <img src="/assets/images/icon-maximize-menu.png" />
        ) : (
          <>
            <img src="/assets/images/icon-minimize-menu.svg" />
            <span>Minimize Menu</span>
          </>
        )}
      </button>
    </motion.aside>
  );
}

const ListButton: React.FC<ListButtonProps> = ({
  to,
  src,
  name,
  activeSrc,
  isMinimized,
}) => {
  const base =
    "px-5 pt-2 items-center  justify-center pb-1 xl:px-0  xl:py-4 text-primaryGrey-300 transisition-colors duration-300  xl:w-full max-w-[276px] rounded-t-lg xl:rounded-r-lg xl:rounded-tl-none";
  const isActiveStyles =
    "border-b-4 xl:border-l-4 xl:border-b-0 border-secondary-green  bg-primaryBeige-100 text-primaryGrey-900";

  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        const active = isActive && isActiveStyles;
        return `${base} ${active}`;
      }}
    >
      {({ isActive }) => (
        <button className="flex flex-col items-center xl:flex-row xl:ml-8 xl:gap-4 xl:w-full  delay xl:pr-10">
          <img
            src={isActive ? activeSrc : src}
            alt="icon"
            className="w-6 h-6"
          />

          {!isMinimized && (
            <motion.p
              className="hidden md:block text-textPreset5Bold   xl:text-textPreset3 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", type: "tween" }}
            >
              {name}
            </motion.p>
          )}
        </button>
      )}
    </NavLink>
  );
};

export default Sidebar;
