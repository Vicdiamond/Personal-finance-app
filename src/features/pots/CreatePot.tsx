import { useForm } from "react-hook-form";
import { motion } from "motion/react";

import useCreatePot from "./useCreatePot";
import useEditPot from "./useEditPot";
import usePots from "./usePots";

import { PotTypes } from "../../types/types";

import { capitalizeWords, generateRandomId } from "../../utils/helpers";

import Button from "../../ui/Button";
import ColorDropdown from "../../ui/ColorDropdown";
import SpinnerMini from "../../ui/SpinnerMini";
import toast from "react-hot-toast";

interface PotProps {
  editingPot?: PotTypes;
  onCloseModal?: () => void;
}

function CreatePot({ editingPot, onCloseModal }: PotProps) {
  const { pots } = usePots();
  const { editPot, isEditing } = useEditPot();
  const { createPot, isCreating } = useCreatePot();

  const { register, handleSubmit, setValue, formState } = useForm({
    defaultValues: {
      name: editingPot?.name || "",
      target: editingPot?.target || "",
      theme: editingPot?.theme || "",
    },
  });
  const { errors } = formState;

  const potNames = pots.map((pot: PotTypes) => pot.name.toLowerCase());
  const potColors = pots.map((pot: PotTypes) => pot.theme.toLowerCase());
  const isEditingSession = editingPot !== undefined;
  const isSubmitting = isEditing || isCreating;
  const errorsAnimate = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  };

  function onSubmit(data: any) {
    if (potNames.includes(data.name.toLowerCase())) {
      return toast.error("Pot name already exists");
    }
    const newData = {
      name: capitalizeWords(data.name),
      target: Number(data.target),
      total: editingPot?.total || 0,
      theme: data.theme,
      id: editingPot?.id || generateRandomId(),
    };

    if (isEditingSession) {
      editPot(newData, {
        onSuccess: () => {
          onCloseModal?.();
        },
      });
    }

    if (!isEditingSession) {
      createPot(newData, {
        onSuccess: () => {
          onCloseModal?.();
        },
      });
    }
  }

  return (
    <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
      <p>
        {isEditingSession
          ? "If your saving targets change, feel free to update your pots."
          : " Create a pot to set savings targets. These can help keep you on track as you save for special purchases."}
      </p>

      <div className="mt-5 ">
        <p>Pot Name</p>
        <input
          type="text"
          className=" border border-primaryGrey-500 rounded-lg py-3  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full  px-5 outline-none mt-1"
          placeholder="e.g. Rainy Days"
          {...register("name", { required: "Pot name is required" })}
        />
        {errors.name?.message && (
          <motion.p
            className="text-secondary-red text-textPreset5 font-bold"
            {...errorsAnimate}
          >
            {errors.name.message}
          </motion.p>
        )}
      </div>

      <div className="mt-4">
        <p>Target</p>
        <input
          type="number"
          className=" border border-primaryGrey-500 rounded-lg py-3  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full  px-5 outline-none mt-1"
          placeholder="$   e.g. 2000"
          {...register("target", { required: "Target is required" })}
        />
        {errors.target?.message && (
          <motion.p
            className="text-secondary-red text-textPreset5 font-bold"
            {...errorsAnimate}
          >
            {errors.target.message}
          </motion.p>
        )}
      </div>

      <div className="mt-4">
        <p>Theme</p>
        <ColorDropdown
          usedColors={potColors}
          defaultColor={editingPot?.theme}
          getColor={(color: string) => setValue("theme", color)}
        />
      </div>

      <Button type="secondary" className="w-full mt-5 " disabled={isEditing}>
        {isSubmitting ? (
          <SpinnerMini />
        ) : isEditingSession ? (
          "Save Changes"
        ) : (
          "Add Pot"
        )}
      </Button>
    </form>
  );
}

export default CreatePot;
