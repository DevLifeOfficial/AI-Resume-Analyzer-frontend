import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  loading?: boolean;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  loading = false,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border border-red-500/20 bg-[#0d1624]/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 mb-3 border border-red-500/20 shadow-inner">
            <AlertTriangle size={20} />
          </div>
          <DialogTitle className="text-[16px] font-bold text-white leading-snug">
            {title}
          </DialogTitle>
          <DialogDescription className="text-[12px] text-white/40 mt-2 leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex sm:justify-center gap-3 mt-6">
          <button
            type="button"
            disabled={loading}
            onClick={() => onOpenChange(false)}
            className="flex-1 text-[12px] font-semibold py-2.5 rounded-xl text-white/50 border border-white/5 bg-white/2 hover:bg-white/5 transition-all"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="flex-1 text-[12px] font-semibold py-2.5 rounded-xl text-white bg-red-500 hover:bg-red-600 transition-all shadow-lg shadow-red-500/10 flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : null}
            {confirmLabel}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
