import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";

interface DeletePotProps {
  onCloseModal?: () => void;
  onConfirm?: () => void;
  disabled?: boolean;
}

function DeletePot({ onCloseModal, onConfirm, disabled }: DeletePotProps) {
  return (
    <div className="mt-5">
      <p>
        Are you sure you want to delete this pot? This action cannot be
        reversed, and all the data inside it will be removed forever.
      </p>

      <Button
        type="danger"
        className=" mt-5"
        onClick={() => {
          onConfirm?.();
          onCloseModal?.();
        }}
        disabled={disabled}
      >
        {disabled ? <SpinnerMini /> : "Yes, Confirm Deletion"}
      </Button>

      <Button
        type="primary"
        className="mt-2 bg-white text-primaryGrey-500"
        onClick={onCloseModal}
        disabled={disabled}
      >
        No, Go Back
      </Button>
    </div>
  );
}

export default DeletePot;
