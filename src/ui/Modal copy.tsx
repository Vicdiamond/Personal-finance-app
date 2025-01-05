import React, {
  cloneElement,
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";

type ModalContextType = {
  open: (name: string) => void;
  close: () => void;
  openName: string;
};
const ModalContext = createContext<ModalContextType | undefined>(undefined);

function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState("");

  const open = (name: string) => setOpenName(name);
  const close = () => setOpenName("");
  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: opensWindowName,
}: {
  children: ReactElement<{ onClick: () => void }>;
  opens: string;
}) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Open must be used within a ModalProvider");
  }
  const { open } = context;

  if (!React.isValidElement(children)) {
    throw new Error("Open component expects a valid React element as children");
  }

  return cloneElement(children, {
    onClick: () => {
      console.log("opensWindowName");
      //   open(opensWindowName), console.log("working");
    },
  });
}

function Window({ name, children }: { name: string; children: ReactElement }) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Open must be used within a ModalProvider");
  }

  const { openName, close } = context;

  //   console.log(name, openName);

  if (name !== openName) return null;

  return (
    <div
      className="fixed top-0 left-0  w-full h-screen bg-[rgba(0,0,0,0.3)] backdrop-blur-sm z-[1000] transition-all duration-500
"
    >
      <button onClick={close}>
        <img src="/images/icon-close-modal.svg" alt="close-modal" />
      </button>
      {/* <div>{cloneElement(children, { onCloseModal: close })}</div>; */}
      <div>{children}</div>
    </div>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
