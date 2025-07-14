"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassName?: string
    showValue?: boolean
    format?: (value: number) => string
  }
>(({ className, value, indicatorClassName, showValue = false, format, ...props }, ref) => {
  const defaultFormat = (val: number) => `${Math.round(val)}%`
  const formatter = format || defaultFormat
  const displayValue = value !== undefined ? value : 0

  return (
    <div className="relative w-full">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn("h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out", indicatorClassName)}
          style={{ transform: `translateX(-${100 - (displayValue || 0)}%)` }}
        />
      </ProgressPrimitive.Root>

      {showValue && (
        <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-medium text-white px-1 rounded">
          {formatter(displayValue)}
        </span>
      )}
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

