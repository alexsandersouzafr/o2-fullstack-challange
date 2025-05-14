import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { type JSX } from "react";

export default function CategoryBadge({
  className,
  style,
  category,
}: {
  className?: string;
  style: {
    id: number;
    color: string;
    icon: JSX.Element;
  };
  category: Category;
}) {
  return (
    <div
      className={cn(
        className,
        style?.color,
        "text-foreground/70  flex gap-2 items-center px-3 py-1  rounded-lg  text-sm"
      )}
    >
      {style?.icon}
      {category?.name}
    </div>
  );
}
