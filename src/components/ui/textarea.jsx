import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full rounded-lg border border-orange-100 bg-[#FDFBF9]/50 px-3 py-2 text-sm shadow-sm transition-all duration-200 outline-none placeholder:text-stone-400 disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-200/50 focus-visible:ring-offset-0",
        "aria-invalid:border-red-500 aria-invalid:ring-red-100 dark:aria-invalid:ring-red-900/20",
        "selection:bg-orange-100 selection:text-orange-900",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
