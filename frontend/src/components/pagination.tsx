import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageIndex: number) => Promise<void> | void;
}

export function Pagination({
  totalPages,
  onPageChange,
  currentPage,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center sm:justify-between">
      <div className="hidden text-sm font-medium sm:flex">
        Página {currentPage} de {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="flex justify-center items-center h-8 w-8 p-0 bg-zinc-800 text-white rounded-md cursor-pointer disabled:text-zinc-600"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Página anterior</span>
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="flex justify-center items-center h-8 w-8 p-0 bg-zinc-800 text-white rounded-md cursor-pointer disabled:text-zinc-600"
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Próxima página</span>
        </button>
      </div>
    </div>
  );
}
