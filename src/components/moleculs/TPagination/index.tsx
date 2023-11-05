import { Pagination, PaginationProps } from 'antd';
import React from 'react';

export type TPaginationProps = PaginationProps;

const TPagination: React.FC<TPaginationProps> = ({
  total,
  onChange,
  ...props
}) => {
  return (
    <div className="articles-pagination flex justify-center items-center bg-light pt-6 pb-16">
      <Pagination total={total} onChange={onChange} {...props} />
    </div>
  );
};

export default TPagination;
