import Title from 'antd/lib/typography/Title';
import React from 'react';
import { colors } from '../../../theme';
import Props from './sectionWrapper.props';

const SectionWrapper: React.FC<Props> = ({
  title,
  children,
  titleColor = colors.black,
  backgroundColor = colors.white,
  titleStyle = 'text-center',
  id,
  className
}) => {
  const generateIdSection = () => title.replace(/\W/g, '-').toLowerCase();

  return (
    <section
      id={id ? id : generateIdSection()}
      className={`px-4 sm:px-6 md:px-20 xl:px-6 py-8 sm:py-12 md:py-16 ${className}`}
      style={{
        backgroundColor
      }}
    >
      <div className="max-w-1200 mx-auto">
        <Title
          level={2}
          className={`font-bold text-3xl md:text-4xl mb-6 md:mb-12 ${titleStyle}`}
          style={{
            color: titleColor
          }}
        >
          {title}
        </Title>

        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
