import { Pencil, Trash2, Ban } from "lucide-react";
import { Tooltip } from "@heroui/react";

export default function EmployeeActions({
    onEdit,
    onBlock,
    onDelete,
    isBlocked,
}) {
    return (
        <div className="relative flex justify-center items-center gap-2">
            <Tooltip content="Edit">
                <Pencil
                    className="w-5 h-5 text-gray-500 cursor-pointer"
                    onClick={onEdit}
                />
            </Tooltip>
            <Tooltip content={isBlocked ? "Buka Blokir" : "Blokir"}>
                <Ban
                    className={`w-5 h-5 cursor-pointer ${
                        isBlocked ? "text-red-500" : "text-amber-500"
                    }`}
                    onClick={onBlock}
                />
            </Tooltip>
            <Tooltip content="Delete" color="danger">
                <Trash2
                    className="w-5 h-5 text-red-500 cursor-pointer"
                    onClick={onDelete}
                />
            </Tooltip>
        </div>
    );
}
