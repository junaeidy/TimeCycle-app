import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { getAge } from "@/utils/employee";

export default function useEmployees() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(
        new Set(["name", "role", "status", "actions"])
    );
    const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get("/api/employees");
            const formatted = data.map((user) => ({
                id: user.id,
                nik: user.nik,
                name: user.name,
                age: getAge(user.date_of_birth),
                role: user.role?.role_name ?? "-",
                role_id: user.role?.id ?? "",
                team: user.position ?? "-",
                status: user.is_active ? "active" : "paused",
                avatar: user.profile_photo_path
                    ? `/storage/${user.profile_photo_path}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name
                      )}`,
                email: user.email,
                address: user.address,
                phone: user.phone,
                position: user.position,
                is_blocked: user.is_blocked,
            }));
            setUsers(formatted);
        } catch (error) {
            console.error("Gagal fetch data karyawan", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredItems = useMemo(() => {
        let filtered = [...users];
        if (filterValue) {
            filtered = filtered.filter((u) =>
                u.name.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        if (statusFilter !== "all") {
            filtered = filtered.filter((u) =>
                Array.from(statusFilter).includes(u.status)
            );
        }
        return filtered;
    }, [users, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredItems.slice(start, start + rowsPerPage);
    }, [filteredItems, page, rowsPerPage]);

    const sortedItems = useMemo(() => {
        const sorted = [...items];
        sorted.sort((a, b) => {
            const valA = a[sortDescriptor.column];
            const valB = b[sortDescriptor.column];
            const cmp = valA < valB ? -1 : valA > valB ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
        return sorted;
    }, [items, sortDescriptor]);

    return {
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
    };
}
