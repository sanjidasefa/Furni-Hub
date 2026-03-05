import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
   "flex h-10 w-full rounded-lg border border-orange-100 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-400 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 outline-none shadow-sm",
        "focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-200/50 focus-visible:ring-offset-0",
        "aria-invalid:border-red-500 aria-invalid:ring-red-100 dark:aria-invalid:ring-red-900/20",
        "selection:bg-orange-100 selection:text-orange-900", 
        className
      )}
      {...props} 
    />
  );
}

export { Input }