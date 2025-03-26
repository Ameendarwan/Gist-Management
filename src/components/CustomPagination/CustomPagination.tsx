import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@app/components/Pagination/Pagination';

import { Button } from '@app/components/Button/Button';
import { Input } from '@app/components/Input/Input';

interface CustomPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  className?: string;
}

const CustomPagination: FC<CustomPaginationProps> = ({ page, totalPages, onPageChange, className = '' }) => {
  const [inputValue, setInputValue] = useState<string>(String(page));

  useEffect(() => {
    setInputValue(String(page));
  }, [page]);

  const handlePageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty input for intermediate typing
    if (value === '') {
      setInputValue('');
      return;
    }

    const newPage = Number(value);

    // Update inputValue but only update page when valid
    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
      setInputValue(value);
      onPageChange(newPage);
    }
  };

  const handleBlur = () => {
    // Reset to current page if input is empty or invalid
    if (inputValue === '' || isNaN(Number(inputValue))) {
      setInputValue(String(page));
    }
  };

  return (
    <Pagination className={`flex items-center justify-end gap-2 text-text ${className}`}>
      <PaginationContent className="flex items-center gap-2">
        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(Math.max(page - 1, 1))}
            disabled={page === 1}
            className="text-gray-500 hover:text-black">
            <PaginationPrevious className="text-text" />
          </Button>
        </PaginationItem>

        <span className="text-sm text-text">Page</span>

        <PaginationItem>
          <Input
            type="number"
            value={inputValue}
            onChange={handlePageChange}
            onBlur={handleBlur}
            className="h-8 w-12 rounded-md border border-gray-400 text-center focus:ring-0 [&::-moz-number-spin-box]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </PaginationItem>

        <span className="text-sm text-text">of {totalPages}</span>

        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(Math.min(page + 1, totalPages))}
            disabled={page === totalPages}
            className="text-text">
            <PaginationNext className="text-text" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
