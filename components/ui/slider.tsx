"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  showTooltip?: boolean
  formatTooltip?: (value: number) => string
  showLabels?: boolean
  minLabel?: string
  maxLabel?: string
  midLabel?: string
  colorClass?: string
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    {
      className,
      showTooltip = false,
      formatTooltip,
      showLabels = false,
      minLabel,
      midLabel,
      maxLabel,
      colorClass = "bg-primary",
      ...props
    },
    ref,
  ) => {
    const [hoveredThumb, setHoveredThumb] = React.useState<number | null>(null)
    const [isDragging, setIsDragging] = React.useState(false)

    const defaultFormat = (value: number) => `${value}`
    const formatter = formatTooltip || defaultFormat

    const handleThumbMouseEnter = (index: number) => {
      setHoveredThumb(index)
    }

    const handleThumbMouseLeave = () => {
      if (!isDragging) {
        setHoveredThumb(null)
      }
    }

    return (
      <div className="space-y-2">
        {showLabels && (
          <div className="flex justify-between text-xs text-muted-foreground px-1">
            <span>{minLabel || "Min"}</span>
            {midLabel && <span>{midLabel}</span>}
            <span>{maxLabel || "Max"}</span>
          </div>
        )}

        <SliderPrimitive.Root
          ref={ref}
          className={cn("relative flex w-full touch-none select-none items-center", className)}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => {
            setIsDragging(false)
            setHoveredThumb(null)
          }}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
            <SliderPrimitive.Range className={cn("absolute h-full rounded-full", colorClass)} />
          </SliderPrimitive.Track>
          {props.value?.map((value, index) => (
            <React.Fragment key={index}>
              <SliderPrimitive.Thumb
                className={cn(
                  "block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:border-primary/80",
                  isDragging && hoveredThumb === index ? "scale-110" : "",
                )}
                onMouseEnter={() => handleThumbMouseEnter(index)}
                onMouseLeave={handleThumbMouseLeave}
              />
              {showTooltip && (hoveredThumb === index || isDragging) && (
                <div
                  className="absolute -top-8 rounded bg-primary px-2 py-1 text-xs font-semibold text-white shadow-md"
                  style={{
                    left: `calc(${((value - (props.min || 0)) / ((props.max || 100) - (props.min || 0))) * 100}% - 16px)`,
                    transform: "translateX(-50%)",
                    zIndex: 50,
                  }}
                >
                  {formatter(value)}
                </div>
              )}
            </React.Fragment>
          ))}
        </SliderPrimitive.Root>
      </div>
    )
  },
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

