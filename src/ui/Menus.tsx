import React, {
  useContext,
  useState,
  cloneElement,
  createContext,
} from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import Modal from "./Modal";
import { motion } from "motion/react";

interface ModalContextType {
  id: string;
  close: () => void;
  open: (id: string) => void;
}

const MenusContext = createContext<ModalContextType | undefined>(undefined);

function Menus({ children }: { children: React.ReactElement }) {
  const [id, setId] = useState("");

  const close = () => setId("");
  const open = (newId: string) => setId(newId);

  return (
    <MenusContext.Provider value={{ close, open, id }}>
      {children}
    </MenusContext.Provider>
  );
}

function Open({ children, id }: { children: React.ReactElement; id: string }) {
  const context = useContext(MenusContext);
  if (!context) throw new Error("context was used outside of its provider");

  const { open } = context;

  return cloneElement(children, { onClick: () => open(id) });
}

interface WindowProps {
  id: string;
  type: string;
  onEdit?: () => void;
  onDelete?: () => void;
  total?: number;
}

function Window({ id, type, total }: WindowProps) {
  const context = useContext(MenusContext);
  if (!context) throw new Error("context was used outside of its provider");

  const { id: openId, close } = context;

  const ref = useOutsideClick(id, openId, close);

  if (id !== openId) return null;

  const showDeletePot = total === 0;

  return (
    <motion.ul
      ref={ref}
      className="absolute bg-white max-w-[134px] top-5 right-0 shadow-[0px_4px_10px_rgba(0,0,0,0.25)] rounded-md list-none flex items-center flex-col flex-1 divide-y w-full px-5"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Modal.Open opens={`Edit-${type}`}>
        <li
          className="py-3 text-textPreset4 font-normal text-primaryGrey-900 text-start w-full "
          role="button"
        >
          Edit {type}
        </li>
      </Modal.Open>

      {type === "Pot" ? (
        showDeletePot && (
          <Modal.Open opens={`Delete-${type}`}>
            <li
              className="py-3 text-textPreset4 font-normal text-secondary-red w-full text-start "
              role="button"
            >
              Delete {type}
            </li>
          </Modal.Open>
        )
      ) : (
        <Modal.Open opens={`Delete-${type}`}>
          <li
            className="py-3 text-textPreset4 font-normal text-secondary-red w-full text-start "
            role="button"
          >
            Delete {type}
          </li>
        </Modal.Open>
      )}
    </motion.ul>
  );
}

Menus.Window = Window;
Menus.Open = Open;
export default Menus;
