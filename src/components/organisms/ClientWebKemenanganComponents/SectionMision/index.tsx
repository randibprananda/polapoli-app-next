import React from 'react';
import { textLightOrDark } from '../../../../theme';
import { SectionWrapper } from '../../../moleculs';
import Props from './sectionMision.props';

const SectionMision: React.FC<Props> = ({ color, mision }) => {
  return (
    <SectionWrapper title="Misi" titleColor={color}>
      <ol type="1" className="max-w-5xl md:mx-auto">
        {mision?.map((item: any, index) => (
          <li
            key={index}
            className="flex items-start font-medium text-lg md:text-xl mb-4 text-justify"
          >
            <span
              className=" px-3 py-1 flex justify-center items-center rounded-full mr-2 font-semibold text-lg md:text-2xl"
              style={{
                backgroundColor: color,
                color: textLightOrDark(color)
              }}
            >
              {index + 1}
            </span>
            {item.misi}
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
};

export default SectionMision;
