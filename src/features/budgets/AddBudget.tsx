import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBudget from "./CreateBudget";

function AddBudget() {
  return (
    <Modal>
      <>
        <Modal.Open opens="new-budget">
          <Button type="secondary">+Add New Budget</Button>
        </Modal.Open>
        <Modal.Window name="new-budget" title="Add New Budget">
          <CreateBudget />
        </Modal.Window>
      </>
    </Modal>
  );
}

export default AddBudget;
