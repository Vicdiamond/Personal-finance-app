import Button from "../../ui/Button";

interface DeleteBudgetProps {
  onCloseModal: () => void;
  onConfirm: () => void;
  disabled?: boolean;
}

function DeleteBudget({
  onCloseModal,
  onConfirm,
  disabled,
}: DeleteBudgetProps) {
  function handleConfirm() {
    onConfirm();
    onCloseModal();
  }
  return (
    <div className="mt-4">
      <p className="text-textPreset4 font-[400] text-primaryGrey-500">
        Are you sure you want to delete this budget? This action cannot be
        reversed, and all the data inside it will be removed forever.
      </p>
      <Button
        type="danger"
        className={`mt-5 ${disabled ? "cursor-not-allowed" : ""}`}
        onClick={handleConfirm}
        disabled={disabled}
      >
        Yes, Confirm Deletion
      </Button>
      <Button
        type="primary"
        className={`mt-2 text-primaryGrey-500 bg-white ${
          disabled ? "cursor-not-allowed" : ""
        }`}
        onClick={onCloseModal}
        disabled={disabled}
      >
        No, Go Back
      </Button>
    </div>
  );
}

export default DeleteBudget;
