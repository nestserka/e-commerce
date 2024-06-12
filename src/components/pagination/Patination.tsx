import { Pagination } from 'antd';

import IconPrev from '../../assets/images/icons/prev.png';
import IconNext from '../../assets/images/icons/next.png';

import './pagination.scss';

import type { PaginationProps } from 'antd';

export interface PaginationBlockProps{
  defaultCurrent:number;
  total:number;
  defaultPageSize:number;
  handleChangePage:(pageNumber: number)=>void;
}

export default function PaginationBlock({defaultCurrent,total,defaultPageSize, handleChangePage}:PaginationBlockProps): JSX.Element {
  const onChange: PaginationProps['onChange'] = (pageNumber: number) => {
    handleChangePage(pageNumber);
  };

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <div className="prev-block">
          <img className="prev-block-icon" src={IconPrev} alt="prev" />
          <span> Previous </span>
        </div>
      );
    }

    if (type === 'next') {
      return (
        <div className="prev-block">
          <span>Next</span>
          <img className="prev-block-icon" src={IconNext} alt="next" />
        </div>
      );
    }

    return originalElement;
  };

  return (
    <section className="wrapper">
      <Pagination defaultCurrent={defaultCurrent} total={total} onChange={onChange} defaultPageSize={defaultPageSize} itemRender={itemRender} />
    </section>
  );
}
