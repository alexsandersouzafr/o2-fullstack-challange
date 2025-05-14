import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Filter } from "lucide-react";
import type React from "react";

const metriCardVariants = cva(
  "flex gap-4 items-center border rounded-lg p-4 w-full flex-row",
  {
    variants: {
      variant: {
        default: "[&>div>span]:text-primary",
        secondary: "gradient text-primary-foreground [&>div>span]:font-bold ",
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
  filtered,
  ...props
}: {
  title: string;
  value: string;
  icon?: React.JSX.Element;
  filtered?: boolean;
} & VariantProps<typeof metriCardVariants> &
  React.ComponentProps<"div">) {
  return (
    <Card
      {...props}
      className={cn(metriCardVariants({ variant, className }), "relative")}
    >
      {icon}
      <div>
        <h3>{title}</h3>
        <span className="text-3xl">{value}</span>
      </div>
      {filtered && (
        <Filter className="absolute right-3 size-4 bottom-3 text-foreground/50" />
      )}
    </Card>
  );
}
