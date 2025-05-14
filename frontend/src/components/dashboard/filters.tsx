import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Filters() {
  return (
    <div className="flex gap-4">
      <DatePickerWithRange className="rounded-lg" />
      <Button variant="secondary">
        <FilterX />
        Limpar filtros
      </Button>
    </div>
  );
}
