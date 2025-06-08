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
import toast from "react-hot-toast";
import ConfirmDialog from "@/Components/ConfirmDialog";
import DivisionForm from "@/Components/Division/DivisionForm";

export const columns = [
    { name: "NAMA DIVISI", uid: "division_name", sortable: true },
    { name: "DESKRIPSI", uid: "description", sortable: true },
    { name: "AKSI", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["division_name", "description", "actions"];

export default function DivisionList() {
    const [filterValue, setFilterValue] = useState("");
    const [visibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "division_name",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);
    const [divisions, setDivisions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [divisionToDelete, setDivisionToDelete] = useState(null);

    const fetchDivisions = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get("/api/divisions");
            setDivisions(data);
        } catch (error) {
            console.error("Gagal fetch divisi", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDivisions();
    }, []);

    const handleOpen = () => {
        setEditMode(false);
        setSelectedDivision(null);
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
        setEditMode(false);
        setSelectedDivision(null);
    };

    const handleSubmit = async (formData) => {
        try {
            if (editMode && selectedDivision) {
                await axios.put(
                    `/api/divisions/${selectedDivision.id}`,
                    formData
                );
                toast.success("Divisi berhasil diperbarui.");
            } else {
                await axios.post("/api/divisions", formData);
                toast.success("Divisi berhasil ditambahkan.");
            }
            fetchDivisions();
            handleClose();
        } catch (error) {
            toast.error("Gagal menyimpan data divisi.");
        }
    };

    const handleEdit = (division) => {
        setSelectedDivision(division);
        setEditMode(true);
        setShowForm(true);
    };

    const handleDelete = (division) => {
        setDivisionToDelete(division);
        setShowConfirmDialog(true);
    };

    const confirmDelete = async () => {
        if (!divisionToDelete) return;
        try {
            await axios.delete(`/api/divisions/${divisionToDelete.id}`);
            toast.success("Divisi berhasil dihapus.");
            fetchDivisions();
        } catch (error) {
            toast.error("Gagal menghapus divisi.");
        } finally {
            setShowConfirmDialog(false);
            setDivisionToDelete(null);
        }
    };

    const filteredItems = React.useMemo(() => {
        if (!filterValue) return divisions;
        return divisions.filter((d) =>
            d.division_name.toLowerCase().includes(filterValue.toLowerCase())
        );
    }, [filterValue, divisions]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredItems.slice(start, start + rowsPerPage);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const aValue = a[sortDescriptor.column];
            const bValue = b[sortDescriptor.column];
            const cmp = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = (item, columnKey) => {
        switch (columnKey) {
            case "actions":
                return (
                    <div className="flex justify-center items-center gap-2">
                        <Tooltip content="Edit">
                            <Pencil
                                className="w-5 h-5 text-gray-500 cursor-pointer"
                                onClick={() => handleEdit(item)}
                            />
                        </Tooltip>
                        <Tooltip content="Hapus" color="danger">
                            <Trash2
                                className="w-5 h-5 text-red-500 cursor-pointer"
                                onClick={() => handleDelete(item)}
                            />
                        </Tooltip>
                    </div>
                );
            default:
                return item[columnKey];
        }
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Input
                        isClearable
                        placeholder="Cari divisi..."
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
                        Tambah Divisi
                    </Button>
                </div>
                <div className="w-full">
                    <Table
                        aria-label="Daftar Divisi"
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
                            emptyContent="Tidak ada divisi ditemukan"
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

            <DivisionForm
                show={showForm}
                onClose={handleClose}
                division={selectedDivision}
                onSuccess={() => {
                    fetchDivisions();
                    handleClose();
                }}
            />

            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={confirmDelete}
                title="Hapus Divisi"
                message={`Apakah Anda yakin ingin menghapus divisi "${divisionToDelete?.division_name}"? Tindakan ini tidak dapat dibatalkan.`}
            />
        </>
    );
}
