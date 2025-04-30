import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Toast({ message, open, onOpenChange, duration = 3000 }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => onOpenChange(false), duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 rounded-md bg-gray-900 text-white p-4 shadow-lg"
      )}
    >
      {message}
    </div>
  );
}