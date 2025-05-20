import Modal from "@/Components/UI/Modal";
import AddEmployee from "@/Pages/Employees/AddEmployee";

export default function AddEmployeeModal({ show, onClose, onSubmit }) {
    return (
        <Modal show={show} onClose={onClose}>
            <AddEmployee onSubmit={onSubmit} onCancel={onClose} />
        </Modal>
    );
}
