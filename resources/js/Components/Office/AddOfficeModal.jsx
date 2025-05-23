import Modal from "@/Components/UI/Modal";
import AddOffice from "@/Pages/Offices/AddOffice";

export default function AddOfficeModal({ show, onClose, onSubmit }) {
    return (
        <Modal show={show} onClose={onClose}>
            <AddOffice onSubmit={onSubmit} onCancel={onClose} />
        </Modal>
    );
}
