import { MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  triggerClassName?: string;
}

export function ActionMenu({ onEdit, onDelete, triggerClassName }: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`p-1.5 rounded-lg border border-white/5 bg-white/5 text-white/45 hover:text-white/80 hover:bg-white/10 hover:border-white/10 transition-all ${triggerClassName}`}
        >
          <MoreHorizontal size={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-32 border border-white/10 bg-[#0c1626]/95 backdrop-blur-xl rounded-xl p-1 shadow-2xl"
      >
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="flex items-center gap-2 text-[12px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg py-1.5 px-2 cursor-pointer transition-colors"
        >
          <Edit2 size={12} />
          Edit Details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex items-center gap-2 text-[12px] font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg py-1.5 px-2 cursor-pointer transition-colors"
        >
          <Trash2 size={12} />
          Delete Item
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
