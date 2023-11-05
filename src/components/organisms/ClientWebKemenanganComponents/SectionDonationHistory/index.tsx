import React from 'react';
import { textLightOrDark } from '../../../../theme';
import { currencyFormat, dateFormat } from '../../../../utils';
import { DonaturItem, SectionWrapper } from '../../../moleculs';
import Props from './sectionDonationHistory.props';

const SectionDonationHistory: React.FC<Props> = ({ color, data }) => {
  return (
    <SectionWrapper
      title="Riwayat Donasi"
      backgroundColor={color}
      titleColor={textLightOrDark(color)}
    >
      <ol type="1" className="max-w-5xl md:mx-auto h-70vh overflow-auto">
        {data?.map((item: any, index: number) => (
          <DonaturItem
            key={index}
            name={item.name || ''}
            amount={currencyFormat(item.amount || '0')}
          />
        ))}
      </ol>
    </SectionWrapper>
  );
};

export default SectionDonationHistory;
