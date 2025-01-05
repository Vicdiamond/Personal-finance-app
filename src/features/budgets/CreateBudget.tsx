import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { categoryOptions } from "../../data/data";
import { BudgetTypes } from "../../types/types";
import Button from "../../ui/Button";
import ColorDropdown from "../../ui/ColorDropdown";
import SelectInput from "../../ui/SelectInput";
import useBudgets from "./useBudgets";
import toast from "react-hot-toast";
import { capitalizeWords, generateRandomId } from "../../utils/helpers";
import useCreateBudget from "./useCreateBudget";
import SpinnerMini from "../../ui/SpinnerMini";
import useEditBudget from "./useEditBudget";

interface CreateBudgetProps {
  editingBudget?: BudgetTypes;
  onCloseModal?: () => void;
}

function CreateBudget({ editingBudget, onCloseModal }: CreateBudgetProps) {
  const { budgets } = useBudgets();
  const { register, handleSubmit, setValue, formState } = useForm({
    defaultValues: {
      category: editingBudget?.category || "",
      maximum: editingBudget?.maximum || 0,
      theme: editingBudget?.theme || "",
    },
  });
  const { createBudget, isCreating } = useCreateBudget();
  const { editBudget, isEditing } = useEditBudget();
  const isSubmitting = isCreating || isEditing;

  const usedBudgetColors = budgets.map((budget: BudgetTypes) =>
    budget.theme.toLowerCase()
  );
  const isEditingBudget = editingBudget !== undefined;
  const budgetCategories = budgets.map((budget: BudgetTypes) =>
    budget.category.toLowerCase()
  );
  const errors = formState.errors;

  function onSubmit(data: any) {
    if (
      budgetCategories.includes(data.category.toLowerCase()) &&
      editingBudget?.category.toLowerCase() !== data.category.toLowerCase()
    ) {
      return toast.error("Budget category already exists");
    }

    const newData = {
      ...data,
      id: editingBudget?.id || generateRandomId(),
      category: capitalizeWords(data.category),
      maximum: Number(data.maximum),
    };

    if (isEditingBudget) {
      editBudget(newData, {
        onSuccess: () => {
          toast.success("Budget updated successfully");
          onCloseModal?.();
        },
      });
    } else {
      createBudget(newData, {
        onSuccess: () => {
          toast.success("Budget created successfully");
          onCloseModal?.();
        },
      });
    }
  }

  return (
    <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
      <p>
        {isEditingBudget
          ? "As your budgets change, feel free to update your spending limits."
          : "Choose a category to set a spending budget. These categories can help you monitor spending."}
      </p>

      <div className="mt-5">
        <p>Budget Category</p>
        <SelectInput
          defaultValue={editingBudget?.category.toLowerCase()}
          options={categoryOptions.slice(1, categoryOptions.length)}
          onGetValue={(category: string) => setValue("category", category)}
        />
      </div>
      <div className="mt-4">
        <p>Maximum Spending</p>
        <input
          type="number"
          className={` border rounded-lg py-3  text-sm focus:outline-none focus:ring-2  w-full  px-5 outline-none mt-1 transition-colors duration-200 ${
            errors.maximum?.message
              ? "border-secondary-red focus:ring-secondary-red "
              : "border-primaryGrey-500 focus:ring-primaryGrey-500 "
          } `}
          placeholder="$   e.g. 2000"
          {...register("maximum", {
            required: "Budget is required",
            validate: (value) =>
              Number(value) > 0 || "Budget must be greater than 0",
          })}
        />
        {errors.maximum && (
          <motion.p
            className="text-secondary-red text-textPreset5 font-normal"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {errors.maximum.message}
          </motion.p>
        )}
      </div>
      <div className="mt-4">
        <p>Color Tag</p>

        <ColorDropdown
          usedColors={usedBudgetColors}
          defaultColor={editingBudget?.theme}
          getColor={(color: string) => setValue("theme", color)}
        />
      </div>

      <Button type="secondary" className="w-full mt-5" disabled={isSubmitting}>
        {isSubmitting ? (
          <SpinnerMini />
        ) : isEditingBudget ? (
          "Save Changes"
        ) : (
          "Add Budget"
        )}
      </Button>
    </form>
  );
}

export default CreateBudget;
