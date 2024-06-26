import { Pagination } from 'antd';

import IconPrev from '../../assets/images/icons/prev.png';
import IconNext from '../../assets/images/icons/next.png';

import './_pagination.scss';

import type { PaginationBlockProps } from './types';
import type { PaginationProps } from 'antd';

export default function PaginationBlock({
  page,
  total,
  defaultPageSize,
  handleChangePage,
}: PaginationBlockProps): JSX.Element {
  const onChange: PaginationProps['onChange'] = (pageNumber: number) => {
    handleChangePage(pageNumber);
  };

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <div className="prev-block">
          <img className="prev-block-icon" src={IconPrev} alt="prev" />
          <span className="prev-block-title"> Previous </span>
        </div>
      );
    }

    if (type === 'next') {
      return (
        <div className="prev-block">
          <span className="prev-block-title">Next</span>
          <img className="prev-block-icon" src={IconNext} alt="next" />
        </div>
      );
    }

    return originalElement;
  };

  return (
    <section className="wrapper">
      <Pagination
        defaultCurrent={1}
        current={page}
        total={total}
        onChange={onChange}
        defaultPageSize={defaultPageSize}
        itemRender={itemRender}
      />
    </section>
  );
}
