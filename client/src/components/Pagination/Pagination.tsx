import type { FC } from 'react';
import { Button } from '@/components/Elements';
import type { Models } from '@/hooks/usePaginate';

import { usePaginate } from '@/hooks/usePaginate';

interface PaginationProps {
  data: Models;
}

export const Pagination: FC<PaginationProps> = ({ data }) => {
  const { setNextPage, setPrevPage } = usePaginate();

  return (
    <div className="mx-auto max-w-2xl">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <li>
            <Button onClick={() => setPrevPage(data)}>Prev</Button>
          </li>
          <li>
            <Button onClick={() => setNextPage(data)}>Next</Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
