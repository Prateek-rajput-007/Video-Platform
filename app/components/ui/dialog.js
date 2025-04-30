import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = ({ className, children, ...props }) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
    <DialogPrimitive.Content
      className={cn(
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg max-w-md w-full",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);
export const DialogHeader = ({ className, ...props }) => (
  <div className={cn("mb-4", className)} {...props} />
);
export const DialogTitle = DialogPrimitive.Title;