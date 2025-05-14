import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export default function Filters() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <DatePickerWithRange className="rounded-lg" route="/" />
      <Button
        variant="secondary"
        onClick={() =>
          navigate({
            to: "/",
            search: { startDate: undefined, endDate: undefined },
          })
        }
      >
        <FilterX />
        Limpar filtros
      </Button>
    </div>
  );
}
