import { Button } from '@/components/Elements';
import type { Model, Page, PageActionType } from '@/hooks/usePaginate';

interface PaginationProps<TModel> {
  data: TModel[];
  page: Page;
  toggle: (type: PageActionType, data: TModel[]) => void;
}

export const Pagination = <TModel extends Model>({
  data,
  page,
  toggle,
}: PaginationProps<TModel>): JSX.Element => (
  <div className="mx-auto max-w-2xl">
    <nav>
      <ul className="inline-flex -space-x-px">
        {page.num !== 0 && (
          <li>
            <Button onClick={() => toggle('prev', data)}>←Prev</Button>
          </li>
        )}
        {data.length === Math.abs(page.take) && (
          <li>
            <Button onClick={() => toggle('next', data)}>Next→</Button>
          </li>
        )}
      </ul>
    </nav>
  </div>
);
