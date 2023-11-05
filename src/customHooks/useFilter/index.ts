import { useState } from 'react';

export const useFilter = (initialValue: any = '') => {
  const [filter, setFilter] = useState<any>(initialValue);

  const handleChangeFilter = (val: any, callback?: (val?: any) => void) => {
    setFilter(() => val);

    callback && callback();
  };

  return [filter, handleChangeFilter];
};
