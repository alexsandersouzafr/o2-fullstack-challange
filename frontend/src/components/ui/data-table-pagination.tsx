import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Button } from "./button";
import { useNavigate } from "@tanstack/react-router";

const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [10, 20, 30];

interface DataTablePaginationProps {
  route: string;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export function DataTablePagination({
  route,
  totalPages,
  currentPage,
  pageSize,
}: DataTablePaginationProps) {
  const navigate = useNavigate();
  const limit = pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE;

  const handleLimitChange = (newLimit: string) => {
    navigate({
      to: route,
      search: { limit: Number(newLimit), page: 1 },
    });
  };

  const goToPage = (page: number) => {
    navigate({
      to: route,
      search: { limit, page },
    });
  };

  return (
    <div className="flex items-center space-x-6 lg:space-x-8">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Linhas por página</p>
        <Select value={limit.toString()} onValueChange={handleLimitChange}>
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {PAGE_SIZE_OPTIONS.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Página {currentPage} de {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          aria-label="Ir para a primeira página"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => currentPage >= 2 && goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() =>
            currentPage < totalPages && goToPage(Number(currentPage) + 1)
          }
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Ir para a última página"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
