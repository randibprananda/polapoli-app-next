import { useState } from 'react';

export const useSearch = (initValue: string = '') => {
  const [search, setSearch] = useState<any>(initValue);

  const onSearch = (e: any, type: 'input' | 'select' = 'input') => {
    if (type === 'input') {
      return e?.target ? setSearch(e.target.value) : setSearch(e);
    }
    if (type === 'select') {
      return setSearch(e);
    }
  };

  return [search, onSearch];
};
