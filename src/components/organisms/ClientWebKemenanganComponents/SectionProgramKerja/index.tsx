import React from 'react';
import { textLightOrDark } from '../../../../theme';
import { SectionWrapper } from '../../../moleculs';
import Props from './sectionProgramKerja.props';

const SectionProgramKerja: React.FC<Props> = ({ color, programKerja }) => {
  return (
    <SectionWrapper
      title="Program Kerja"
      backgroundColor={color}
      titleColor={textLightOrDark(color)}
    >
      <ol type="1" className="max-w-5xl md:mx-auto">
        {programKerja?.map((item: any, index) => (
          <li
            key={index}
            className="flex items-start font-medium text-lg md:text-xl mb-4 text-justify"
            style={{
              color: textLightOrDark(color)
            }}
          >
            {index + 1}. {item.isi_proker}
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
};

export default SectionProgramKerja;
