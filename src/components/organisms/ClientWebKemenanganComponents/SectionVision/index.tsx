import React from 'react';
import { SectionWrapper } from '../../../moleculs';
import Props from './sectionVision.props';

const SectionVision: React.FC<Props> = ({ color, vision }) => {
  return (
    <SectionWrapper title="Visi" titleColor={color}>
      <p className="text-center font-medium text-xl md:text-2xl">{vision}</p>
    </SectionWrapper>
  );
};

export default SectionVision;
