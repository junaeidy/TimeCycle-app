import {
    Input,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/react";
import { ChevronDown, Plus } from "lucide-react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { statusOptions, columns, capitalize } from "@/utils/employee";

export default function EmployeeTableTopContent({
    filterValue,
    onSearchChange,
    onClear,
    statusFilter,
    setStatusFilter,
    visibleColumns,
    setVisibleColumns,
    setShowAddModal,
    users,
    onRowsPerPageChange,
}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
                <Input
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="Cari berdasarkan nama..."
                    startContent={<MagnifyingGlassIcon className="w-[1rem]" />}
                    value={filterValue}
                    onClear={onClear}
                    onValueChange={onSearchChange}
                />
                <div className="flex gap-3">
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button endContent={<ChevronDown />} variant="flat">
                                Status
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            selectedKeys={statusFilter}
                            selectionMode="multiple"
                            closeOnSelect={false}
                            onSelectionChange={setStatusFilter}
                        >
                            {statusOptions.map((status) => (
                                <DropdownItem
                                    key={status.uid}
                                    className="capitalize"
                                >
                                    {capitalize(status.name)}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button endContent={<ChevronDown />} variant="flat">
                                Kolom
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            selectedKeys={visibleColumns}
                            selectionMode="multiple"
                            closeOnSelect={false}
                            onSelectionChange={setVisibleColumns}
                        >
                            {columns.map((col) => (
                                <DropdownItem
                                    key={col.uid}
                                    className="capitalize"
                                >
                                    {capitalize(col.name)}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Button
                        onPress={() => setShowAddModal(true)}
                        color="primary"
                        endContent={<Plus />}
                    >
                        Tambah
                    </Button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">
                    Total {users.length} users
                </span>
                <label className="flex items-center text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        onChange={onRowsPerPageChange}
                    >
                        {[5, 10, 15].map((v) => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
}
