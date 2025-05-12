import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

const metriCardVariants = cva(
  "flex gap-4 items-center border rounded-lg p-4 w-full",
  {
    variants: {
      variant: {
        default: "[&>div>span]:text-primary",
        secondary: "bg-primary text-primary-foreground [&>div>span]:font-bold ",
      },
    },
  }
);

export default function MetricCard({
  className,
  title,
  value,
  icon,
  variant,
  ...props
}: {
  title: string;
  value: string;
  icon: React.JSX.Element;
} & VariantProps<typeof metriCardVariants> &
  React.ComponentProps<"div">) {
  return (
    <div {...props} className={cn(metriCardVariants({ variant, className }))}>
      {icon}
      <div>
        <h3>{title}</h3>
        <span className="text-3xl">{value}</span>
      </div>
    </div>
  );
}
