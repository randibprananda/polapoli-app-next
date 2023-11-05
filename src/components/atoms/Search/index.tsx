import React from 'react';
import { Input } from 'antd';
import { Search as RISearch } from 'react-iconly';
import { colors } from '../../../theme';

export type SearchProps = {
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string | number | readonly string[] | undefined;
};

const Search: React.FC<SearchProps> = ({
  placeholder = 'Cari',
  value,
  onChange
}) => {
  return (
    <Input
      suffix={<RISearch set="light" size={24} primaryColor={colors.grey2} />}
      className="w-full max-w-xs"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default Search;
