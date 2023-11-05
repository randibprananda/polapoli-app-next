import React from 'react';
import TText from '../TText';
import TTitle from '../TTitle';
import Props from './tCardAdvantage.props';

const TCardAdvantage: React.FC<Props> = ({ img, alt, title, description }) => {
  return (
    <div className="w-full lg:mb-0 mb-6">
      <div className="rounded-2xl h-full text-center py-8">
        <img className="mx-auto" src={img} alt={alt} />
        <TTitle
          text={title}
          size="xl"
          weight="semibold"
          customStyle="leading-relaxed pt-5 pb-2.5 title-text"
        />
        <TText
          color="grey"
          text={description}
          customStyle="leading-6 caption-text"
        />
      </div>
    </div>
  );
};

export default TCardAdvantage;
