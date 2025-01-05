import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";
import { motion } from "motion/react";

type ModalContextType = {
  open: (name: string) => void;
  close: () => void;
  openName: string;
};
const ModalContext = createContext<ModalContextType | undefined>(undefined);

function Modal({ children }: { children: React.ReactElement }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: opensWindowName,
}: {
  children: React.ReactElement;
  opens: string;
}) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("context was used outside of it provider");

  const { open } = context;

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

interface WindowPropTypes {
  children: React.ReactElement;
  name: string;
  title: string;
}

function Window({ children, name, title }: WindowPropTypes) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("context was used outside of it provider");

  const { openName, close } = context;

  const ref = useOutsideClick(name, openName, close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed top-0 left-0  w-full h-screen bg-[rgba(0,0,0,0.3)] backdrop-blur-sm z-[1000] transition-all duration-500 flex justify-center items-center">
      <motion.div
        className=" bg-white rounded-lg shadow-lg py-6 px-5 xl:p-8 transition-all duration-500
      text-textPreset4 text-primaryGrey-500 font-normal w-full max-w-[335px] xl:max-w-[560px]"
        ref={ref}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{
          duration: 0.1,
          ease: "easeInOut", // Replaced "" with "linear"
        }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-textPreset2 xl:text-textPreset1 text-nowrap text-primaryGrey-900 font-bold">
            {title}
          </h1>
          <button onClick={close}>
            <img src="assets/images/icon-close-modal.svg" alt="close-modal" />
          </button>
        </div>
        {cloneElement(children, { onCloseModal: close })}
      </motion.div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

// if (ref.current && !ref.current?.contains(event.target as Node)) {
//   close(); // Close the menu when clicking outside
// }
