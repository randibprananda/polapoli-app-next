import React from 'react';
import { IlHeaderSoal } from '../../../../assets';
import { CardBanner } from '../../../atoms';

export type HeaderSoalProps = {
  title: string;
  date: string;
  wilayah: any;
};

const HeaderSoal: React.FC<HeaderSoalProps> = ({ title, date, wilayah }) => {
  console.log(wilayah);
  return (
    <CardBanner
      image={IlHeaderSoal}
      content={
        <>
          <h3 className="mb-3 text-4xl font-bold text-white">{title}</h3>
          <p className="mb-3 text-xl font-medium text-white">
            {wilayah?.propinsi?.name} {wilayah?.kabupaten?.name}{' '}
            {wilayah?.kecamatan?.name} {wilayah?.kelurahan?.name}{' '}
            {wilayah?.dapil && `Dapil ${wilayah?.dapil}`} | {date}
          </p>
        </>
      }
    />
  );
};

export default HeaderSoal;
