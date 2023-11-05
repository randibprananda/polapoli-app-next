import React, { useEffect, useState } from 'react';

export type TRatingProps = {
  total: number;
};

const TRating: React.FC<TRatingProps> = ({ total }) => {
  const [totals, setTotals] = useState<number[]>([]);

  useEffect(() => {
    const temp = [];
    for (let index = 0; index < total; index++) {
      temp.push(index);
    }
    setTotals([...temp]);
  }, [total]);
  return (
    <div className="inline-flex gap-3 mt-3 mb-9">
      {totals.map((item, index) => (
        <svg
          key={index}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.0013 1.66602L12.5763 6.88268L18.3346 7.72435L14.168 11.7827L15.1513 17.516L10.0013 14.8077L4.8513 17.516L5.83464 11.7827L1.66797 7.72435L7.4263 6.88268L10.0013 1.66602Z"
            fill="#FFA125"
            stroke="#FFA125"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
};

export default TRating;
