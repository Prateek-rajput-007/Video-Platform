import { cn } from "@/lib/utils";

export function Button({ className, variant = "default", ...props }) {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-100",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}