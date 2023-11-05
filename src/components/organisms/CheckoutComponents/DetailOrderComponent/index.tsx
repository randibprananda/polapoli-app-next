import { Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { AddOnInterface, PricingInterface } from '../../../../@types/Landing';
import { currencyFormat } from '../../../../utils';

export type DetailOrderProps = {
  packet: PricingInterface;
  periode: number;
  onOrder: () => void;
  loading: boolean;
  addOns: AddOnInterface[];
};

type ItemProps = {
  title: string;
  price: number;
};

const Item: React.FC<ItemProps> = ({ title, price }) => (
  <div className="flex justify-between items-center text-base font-medium mb-3">
    <span className="">{title}</span>
    <span className="">{currencyFormat(price)}</span>
  </div>
);

const DetailOrderComponent: React.FC<DetailOrderProps> = ({
  packet,
  periode,
  loading,
  onOrder,
  addOns
}) => {
  const totalAddOns = addOns?.reduce((acc, curr) => acc + +curr?.price || 0, 0);
  const total = (packet?.price + totalAddOns) * (periode || 0);

  return (
    <div className="p-4 sm:p-6 xl:p-8 bg-white rounded-2xl shadow max-w-lg min-h-[500px] flex flex-col justify-between">
      <div>
        <Title level={2} className="text-primary mb-6">
          Rincian Pembelian
        </Title>
        <div>
          <Item
            title={`Paket ${packet?.title} Pola-Poli`}
            price={packet?.price}
          />
          {addOns?.map(item => (
            <Item
              key={item?.id}
              title={`Add On: ${item?.title}`}
              price={item?.price}
            />
          ))}
          <div className="flex justify-between items-center text-base font-medium mb-3">
            <span className="">Periode</span>
            <span className="">{(periode || 0) + ' bulan'}</span>
          </div>
        </div>
        <div className="flex justify-between pt-4 border-t border-grey3">
          <span className="tet-base font-semibold">Total Bayar</span>
          <span className="text-rose font-bold text-xl">
            {currencyFormat(total)}
          </span>
        </div>
      </div>

      <div>
        <p className="text-grey2 text-base font-medium my-8 justify-self-end">
          Dengan mendaftar & beli kamu setuju dengan Syarat & Ketentuan dan
          Kebjakan Privasi yang berlaku
        </p>

        <Button
          disabled={!periode || loading}
          loading={loading}
          type="primary"
          size="large"
          block
          onClick={onOrder}
          className=" justify-self-end"
        >
          Beli Sekarang
        </Button>
      </div>
    </div>
  );
};

export default DetailOrderComponent;
