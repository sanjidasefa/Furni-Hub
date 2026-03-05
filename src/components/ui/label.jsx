"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label" // Fixed import path

import { cn } from "@/lib/utils"

function Label({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm font-semibold leading-none text-[#5D4037] select-none",
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        "hover:text-orange-600 transition-colors duration-200 cursor-pointer",      
        className
      )}
      {...props} 
    />
  );
}

export { Label }