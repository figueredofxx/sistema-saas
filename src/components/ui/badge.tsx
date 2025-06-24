
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary hover:text-secondary-foreground",
        destructive: "bg-error/10 text-error border border-error/20 hover:bg-error hover:text-error-foreground",
        outline: "text-foreground border border-outline hover:bg-primary hover:text-primary-foreground border-primary/20",
        success: "bg-success/10 text-success border border-success/20 hover:bg-success hover:text-success-foreground",
        warning: "bg-warning/10 text-warning border border-warning/20 hover:bg-warning hover:text-warning-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
