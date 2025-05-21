import Modal from "@/Components/UI/Modal";
import EditEmployee from "@/Pages/Employees/EditEmployee";

export default function EditEmployeeModal({
    show,
    onClose,
    employee,
    onSubmit,
}) {
    return (
        <Modal show={show} onClose={onClose}>
            <EditEmployee
                employee={employee}
                onSubmit={onSubmit}
                onCancel={onClose}
            />
        </Modal>
    );
}
