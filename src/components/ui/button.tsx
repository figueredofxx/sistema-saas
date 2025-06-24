
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "md3-filled-button",
        destructive: "bg-error text-error-foreground hover:bg-error/90 hover:shadow-elevation-2 rounded-full px-6 py-3",
        outline: "md3-outlined-button",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-elevation-2 rounded-full px-6 py-3",
        ghost: "md3-text-button",
        link: "text-primary underline-offset-4 hover:underline rounded-none px-0 py-0",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-full px-4 text-sm",
        lg: "h-14 rounded-full px-8 text-lg",
        icon: "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
