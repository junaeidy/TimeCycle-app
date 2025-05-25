import Modal from "@/Components/UI/Modal";
import AddOffice from "@/Pages/Offices/AddOffice";

export default function AddOfficeModal({
    show,
    onClose,
    onSubmit,
    mode = "add",
    initialData = null,
}) {
    return (
        <Modal show={show} onClose={onClose}>
            <AddOffice
                mode={mode}
                initialData={initialData}
                onSubmit={onSubmit}
                onCancel={onClose}
            />
        </Modal>
    );
}
