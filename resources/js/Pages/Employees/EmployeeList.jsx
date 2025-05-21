import React, { useMemo, useState, useCallback } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    User,
    Spinner,
    Pagination,
} from "@heroui/react";
import useEmployees from "@/hooks/useEmployees";
import { columns, statusColorMap } from "@/utils/employee";
import EmployeeActions from "@/Components/Employee/EmployeeActions";
import EmployeeTableTopContent from "@/Components/Employee/EmployeeTableTopContent";
import AddEmployeeModal from "@/Components/Employee/AddEmployeeModal";
import EditEmployeeModal from "@/Components/Employee/EditEmployeeModal";
import axios from "axios";
import toast from "react-hot-toast";
import ConfirmDialog from "@/Components/ConfirmDialog";

export default function EmployeeList() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const {
        users,
        setUsers,
        isLoading,
        filterValue,
        setFilterValue,
        selectedKeys,
        setSelectedKeys,
        visibleColumns,
        setVisibleColumns,
        statusFilter,
        setStatusFilter,
        rowsPerPage,
        setRowsPerPage,
        sortDescriptor,
        setSortDescriptor,
        page,
        setPage,
        fetchUsers,
        sortedItems,
        pages,
    } = useEmployees();

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((col) =>
            Array.from(visibleColumns).includes(col.uid)
        );
    }, [visibleColumns]);

    const renderCell = useCallback((user, columnKey) => {
        const value = user[columnKey];
        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ src: user.avatar }}
                        name={value}
                        description={user.email}
                    />
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <span>{value}</span>
                        <span className="text-default-400">{user.team}</span>
                    </div>
                );
            case "status":
                return (
                    <Chip color={statusColorMap[user.status]} variant="flat">
                        {value}
                    </Chip>
                );
            case "actions":
                return (
                    <EmployeeActions
                        onEdit={() => {
                            setSelectedEmployee(user);
                            setShowEditModal(true);
                        }}
                        onBlock={() => {
                            setSelectedUser(user);
                            setConfirmDialogOpen(true);
                        }}
                        onDelete={() => {
                            // contoh handle hapus
                            console.log("Hapus", user.name);
                        }}
                        isBlocked={user.is_blocked}
                    />
                );

            default:
                return value;
        }
    }, []);

    const handleAddEmployee = async (data) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value) formData.append(key, value);
            });

            const response = await axios.post("/api/employees", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            });

            toast.success("Karyawan berhasil ditambahkan");

            await fetchUsers();
            return { success: true, message: response.data.message };
        } catch (error) {
            console.error("Gagal menyimpan data:", error);
            toast.error("Gagal menyimpan data");
            return { success: false };
        }
    };

    const handleUpdateEmployee = async ({ id, formData }) => {
        try {
            const res = await axios.post(
                `/api/employees/${id}?_method=PUT`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success("Karyawan berhasil diperbarui");

            await fetchUsers();
            return { success: true, data: res.data };
        } catch (err) {
            console.error(err);
            toast.error("Gagal memperbarui data");
            return { success: false };
        }
    };

    const handleToggleBlock = async (user) => {
        try {
            const response = await axios.patch(
                `/api/employees/${user.id}/block`
            );
            const updatedUser = response.data.user;

            if (updatedUser.is_blocked) {
                toast.success(
                    `Karyawan ${updatedUser.name} berhasil diblokir.`
                );
            } else {
                toast.success(
                    `Karyawan ${updatedUser.name} berhasil dibuka blokirnya.`
                );
            }

            fetchUsers();
        } catch (error) {
            console.error("Gagal memblokir/unblokir user:", error);
            toast.error("Terjadi kesalahan saat memproses permintaan.");
        }
    };

    return (
        <>
            <Table
                aria-label="Employee Table"
                isHeaderSticky
                bottomContent={
                    <div className="flex justify-between items-center py-2 px-2">
                        <span className="text-default-400 text-small">
                            {selectedKeys === "all"
                                ? "All selected"
                                : `${selectedKeys.size} of ${users.length} selected`}
                        </span>
                        <Pagination
                            page={page}
                            total={pages}
                            onChange={setPage}
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                        />
                    </div>
                }
                topContent={
                    <EmployeeTableTopContent
                        filterValue={filterValue}
                        onSearchChange={setFilterValue}
                        onClear={() => setFilterValue("")}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        visibleColumns={visibleColumns}
                        setVisibleColumns={setVisibleColumns}
                        setShowAddModal={setShowAddModal}
                        users={users}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setPage(1);
                        }}
                    />
                }
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            allowsSorting={column.sortable}
                            align={
                                column.uid === "actions" ? "center" : "start"
                            }
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    isLoading={isLoading}
                    items={sortedItems}
                    emptyContent="No users found"
                    loadingContent={
                        <div className="py-10 flex justify-center">
                            <Spinner />
                        </div>
                    }
                >
                    {(item) => (
                        <TableRow key={item.nik}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <AddEmployeeModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAddEmployee}
            />
            <EditEmployeeModal
                show={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedEmployee(null);
                }}
                employee={selectedEmployee}
                onSubmit={handleUpdateEmployee}
            />

            <ConfirmDialog
                isOpen={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                onConfirm={() =>
                    selectedUser && handleToggleBlock(selectedUser)
                }
                title="Konfirmasi Aksi"
                message={`Apakah Anda yakin ingin ${
                    selectedUser?.is_blocked ? "membuka blokir" : "memblokir"
                } ${selectedUser?.name}?`}
            />
        </>
    );
}
