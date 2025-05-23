import React, { useState, useEffect } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    Pagination,
    Spinner,
} from "@heroui/react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Tooltip } from "@heroui/react";
import AddOfficeModal from "@/Components/Office/AddofficeModal";
import toast from "react-hot-toast";
import ConfirmDialog from "@/Components/ConfirmDialog";

export const columns = [
    { name: "NAMA LOKASI", uid: "location_name", sortable: true },
    { name: "LATITUDE", uid: "latitude", sortable: true },
    { name: "LONGITUDE", uid: "longitude", sortable: true },
    { name: "RADIUS (METER)", uid: "radius_meter", sortable: true },
    { name: "AKSI", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
    "location_name",
    "latitude",
    "longitude",
    "radius_meter",
    "actions",
];

export default function OfficeList() {
    const [filterValue, setFilterValue] = React.useState("");
    const [visibleColumns, setVisibleColumns] = React.useState(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "location_name",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    const [offices, setOffices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [selectedOffice, setSelectedOffice] = useState(null);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filtered = [...offices];
        if (hasSearchFilter) {
            filtered = filtered.filter((office) =>
                office.location_name
                    .toLowerCase()
                    .includes(filterValue.toLowerCase())
            );
        }
        return filtered;
    }, [filterValue, offices]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [officeToDelete, setOfficeToDelete] = useState(null);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setEditMode(false);
        setSelectedOffice(null);
    };

    const handleSubmit = async (formData) => {
        if (!formData) {
            toast.error("Gagal menyimpan kantor.");
            return;
        }

        try {
            if (editMode) {
                await axios.put(`/api/offices/${selectedOffice.id}`, formData);
                toast.success(`${formData.location_name} berhasil diperbarui.`);
            } else {
                await axios.post("/api/offices", formData);
                toast.success(
                    `${formData.location_name} berhasil ditambahkan.`
                );
            }
            fetchOffices();
            handleClose();
        } catch (error) {
            toast.error("Terjadi kesalahan saat menyimpan data.");
        }
    };

    const fetchOffices = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get("/api/offices");
            const formatted = data.map((office) => ({
                id: office.id,
                location_name: office.location_name,
                latitude: office.latitude,
                longitude: office.longitude,
                radius_meter: office.radius_meter,
            }));
            setOffices(formatted);
        } catch (error) {
            console.error("Gagal fetch data kantor", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOffices();
    }, []);

    const handleEdit = (office) => {
        setSelectedOffice(office);
        setEditMode(true);
        setShowModal(true);
    };

    const handleDelete = (office) => {
        setOfficeToDelete(office);
        setShowConfirmDialog(true);
    };

    const confirmDelete = async () => {
        if (!officeToDelete) return;

        try {
            await axios.delete(`/api/offices/${officeToDelete.id}`);
            toast.success(`${officeToDelete.location_name} berhasil dihapus.`);
            fetchOffices();
        } catch (error) {
            console.error("Gagal menghapus kantor:", error);
            toast.error("Gagal menghapus kantor.");
        } finally {
            setShowConfirmDialog(false);
            setOfficeToDelete(null);
        }
    };

    const renderCell = (item, columnKey) => {
        const cellValue = item[columnKey];
        switch (columnKey) {
            case "actions":
                return (
                    <div className="relative flex justify-center items-center gap-2">
                        <Tooltip content="Edit">
                            <Pencil
                                className="w-5 h-5 text-gray-500 cursor-pointer"
                                onClick={() => handleEdit(item)}
                            />
                        </Tooltip>

                        <Tooltip content="Delete" color="danger">
                            <Trash2
                                className="w-5 h-5 text-red-500 cursor-pointer"
                                onClick={() => handleDelete(item)}
                            />
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Input
                        isClearable
                        placeholder="Cari lokasi..."
                        value={filterValue}
                        onClear={() => setFilterValue("")}
                        onValueChange={setFilterValue}
                        className="max-w-xs"
                    />
                    <Button
                        color="primary"
                        endContent={<Plus />}
                        onClick={handleOpen}
                    >
                        Tambah Kantor
                    </Button>
                </div>
                <div className="w-full">
                    <Table
                        aria-label="Daftar Kantor"
                        sortDescriptor={sortDescriptor}
                        onSortChange={setSortDescriptor}
                        bottomContent={
                            pages > 1 && (
                                <div className="flex justify-end px-2 py-2">
                                    <Pagination
                                        isCompact
                                        showControls
                                        showShadow
                                        color="primary"
                                        page={page}
                                        total={pages}
                                        onChange={setPage}
                                    />
                                </div>
                            )
                        }
                    >
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn
                                    key={column.uid}
                                    allowsSorting={column.sortable}
                                >
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>

                        <TableBody
                            emptyContent={"No Office Found"}
                            items={sortedItems}
                            isLoading={isLoading}
                            loadingContent={
                                <div className="py-10 flex justify-center">
                                    <Spinner />
                                </div>
                            }
                        >
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => (
                                        <TableCell>
                                            {renderCell(item, columnKey)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <AddOfficeModal
                show={showModal}
                onClose={handleClose}
                onSubmit={handleSubmit}
                mode={editMode ? "edit" : "add"}
                initialData={selectedOffice || {}}
            />

            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={confirmDelete}
                title="Hapus Kantor"
                message={`Apakah Anda yakin ingin menghapus kantor "${officeToDelete?.location_name}"? Tindakan ini tidak dapat dibatalkan.`}
            />
        </>
    );
}
