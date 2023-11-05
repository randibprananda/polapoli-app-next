import { Switch } from 'antd';
import React from 'react';
import { currencyFormat } from '../../../utils';
import Props from './cardAddOn.props';

const CardAddOn: React.FC<Props> = ({
  title,
  price = 0,
  description,
  onChange
}) => {
  return (
    <div className="block w-full max-w-[200px] bg-white rounded-lg mx-auto shadow mb-3">
      <h3 className=" bg-primary py-3 px-5 text-white text-lg rounded-t-lg font-semibold break-words">
        {title}
      </h3>
      <div className="px-5 py-4 text-center">
        <span className="text-primary font-bold text-lg">
          {currencyFormat(price)}
        </span>
        <p className=" text-justify text-xs my-3">{description}</p>
        <Switch onChange={onChange} />
      </div>
    </div>
  );
};

export default CardAddOn;
