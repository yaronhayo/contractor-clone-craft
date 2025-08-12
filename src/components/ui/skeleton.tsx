import { cn } from "@/lib/utils"

function Skeleton({
  className,
  shimmer = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { shimmer?: boolean }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/20",
        shimmer && "skeleton-shimmer",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
