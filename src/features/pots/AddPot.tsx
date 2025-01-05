import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreatePot from "./CreatePot";

function AddPot() {
  return (
    <Modal>
      <>
        <Modal.Open opens="new-pot">
          <Button type="secondary">+Add New Pot</Button>
        </Modal.Open>
        <Modal.Window name="new-pot" title="Add New Pot">
          <CreatePot />
        </Modal.Window>
      </>
    </Modal>
  );
}

export default AddPot;
