import React from 'react';
import { ArticleCategoryInteface } from '../../../@types/Landing';

interface TabInterface {
  title: string;
  active?: boolean;
  onClick: () => void;
}

interface TabsInterface {
  data?: ArticleCategoryInteface[];
  active: any;
  onClick: (val: any) => void;
}

const Tab: React.FC<TabInterface> = ({ title, active = false, onClick }) => (
  <button
    className={`font-semibold text-lg transition-all duration-150 ${
      active ? 'text-black border-b-2 border-b-rose' : 'text-grey2'
    }`}
    onClick={onClick}
  >
    {title}
  </button>
);

const TArticleTabs: React.FC<TabsInterface> = ({ data, active, onClick }) => {
  return (
    <div className="bg-light flex justify-around px-4 py-20 mx-auto md:px-6 max-w-screen-2xl lg:px-24">
      <Tab
        title="Semua Kategori"
        active={active === ''}
        onClick={() => onClick('')}
      />
      {data?.map(item => (
        <Tab
          key={item?.id}
          title={item?.title}
          active={active === item?.id}
          onClick={() => onClick(item?.id)}
        />
      ))}
    </div>
  );
};

export default TArticleTabs;
