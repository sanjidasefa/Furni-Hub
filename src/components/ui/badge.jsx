import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot"; 

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-all overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-orange-500 text-white shadow-sm",    
        brown: "bg-[#5D4037] text-white shadow-sm",    
        secondary: "bg-orange-100 text-orange-800",       
        destructive: "bg-red-500 text-white",
        outline: "border-[#5D4037] text-[#5D4037] border-md hover:bg-orange-50",
        success: "bg-emerald-100 text-emerald-700 border border-emerald-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Badge = React.forwardRef(({
  className,
  variant = "default",
  asChild = false,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      ref={ref}
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props} 
    />
  );
})

Badge.displayName = "Badge"

export { Badge, badgeVariants }