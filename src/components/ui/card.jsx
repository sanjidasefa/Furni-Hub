import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Orange-Brown theme logic: border brown, hover korle orange shadow
        "bg-card text-card-foreground flex flex-col gap-4 rounded-2xl border border-orange-100 shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-orange-100/50 hover:border-orange-200 overflow-hidden group",
        className
      )}
      {...props} 
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-1.5 p-5",
        className
      )}
      {...props} 
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-tight font-bold text-[#5D4037] text-lg group-hover:text-orange-600 transition-colors", className)}
      {...props} 
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-xs font-medium uppercase tracking-wide", className)}
      {...props} 
    />
  );
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "absolute top-3 right-3 z-10",
        className
      )}
      {...props} 
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div 
      data-slot="card-content" 
      className={cn("px-5 pb-5 pt-0 flex-1", className)} 
      {...props} 
    />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center justify-between p-5 pt-0 border-t border-orange-50 mt-auto bg-orange-50/30", 
        className
      )}
      {...props} 
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}