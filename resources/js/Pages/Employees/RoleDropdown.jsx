import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@heroui/react";

const RoleDropdown = ({
    roles,
    selectedValue,
    selectedKeys,
    setSelectedKeys,
    error,
}) => (
    <div className="w-full h-7">
        <Dropdown>
            <DropdownTrigger>
                <Button
                    className={`capitalize w-full justify-between ${
                        error ? "border-red-500" : ""
                    }`}
                    variant="bordered"
                >
                    {selectedValue}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="Pilih peran"
                selectedKeys={selectedKeys}
                selectionMode="single"
                variant="flat"
                onSelectionChange={setSelectedKeys}
            >
                {roles.map((role) => (
                    <DropdownItem key={role.id.toString()}>
                        {role.role_name}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
);

export default RoleDropdown;
