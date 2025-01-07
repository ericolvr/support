import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";


export function Pager({table}) {
    return (
        
			<div className="flex items-center justify-end space-x-2 py-4">
            <Button
                className="flex items-center justify-center w-10 h-10"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                <ChevronLeft strokeWidth={2.5} />
            </Button>
            <Button
                className="flex items-center justify-center w-10 h-10"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                <ChevronRight strokeWidth={2.5} />
            </Button>
        </div>
    );
} 