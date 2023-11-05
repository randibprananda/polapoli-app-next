import { PaginationProps } from 'antd';
import { useState } from 'react';

export const usePagination = (initValue: number = 1) => {
  const [currentPage, setCurrentPage] = useState<any>(initValue);

  const onChangePagination: PaginationProps['onChange'] = page => {
    setCurrentPage(page);
  };

  return [currentPage, onChangePagination];
};
