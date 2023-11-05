import React from 'react';
import { SectionWrapper } from '../../../moleculs';
import Props from './sectionDescription.props';

const SectionDescription: React.FC<Props> = ({ color, description }) => {
  return (
    <SectionWrapper title="Deskripsi" titleColor={color} titleStyle="text-left">
      <p className="text-left font-medium text-xl md:text-2xl">{description}</p>
    </SectionWrapper>
  );
};

export default SectionDescription;
