import React from 'react';
import { PengalamanKerjaInterface } from '../../../../@types/Kemenangan';
import { textLightOrDark } from '../../../../theme';
import { SectionWrapper } from '../../../moleculs';
import Props from './sectionPengalamanKerja.props';

const CardPengalaman: React.FC<{
  data: PengalamanKerjaInterface;
  color: string;
}> = ({ data, color }) => {
  return (
    <article className="w-full max-w-[630px] rounded-3xl bg-white flex flex-col items-center mx-0 md:mx-3 mb-3 p-4 lg:p-7">
      <h3
        className=" font-bold text-2xl lg:text-3xl mb-4 lg:mb-7"
        style={{
          color
        }}
      >
        {data.name}
      </h3>
      <ul>
        {data?.detail_pengalaman?.map((item, index) => (
          <li
            key={item?.id}
            className=" mb-2 text-lg lg:text-xl font-medium text-center"
          >{`${item?.description} (${item?.start} - ${item?.end})`}</li>
        ))}
      </ul>
    </article>
  );
};

const SectionPengalamanKerja: React.FC<Props> = ({
  color,
  pengalamanKerja
}) => {
  return (
    <SectionWrapper
      title="Pengalaman Kerja"
      backgroundColor={color}
      titleColor={textLightOrDark(color)}
    >
      <div className="flex flex-col md:flex-row max-w-5xl md:mx-auto">
        {pengalamanKerja?.map((item: PengalamanKerjaInterface) => (
          <CardPengalaman key={item?.id} data={item} color={color} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default SectionPengalamanKerja;
