import Link from 'next/link';
import React from 'react';
import { IlDefault } from '../../../assets/img/landing';
import Props from './tArticle.props';

const TArticle: React.FC<Props> = ({
  title,
  image,
  content,
  link,
  variant = 'vertical'
}) => {
  const getVariant = () => {
    if (variant === 'horizontal') {
      return 'flex flex-row items-center';
    }

    return 'flex flex-col';
  };

  const getImageStyle = () => {
    if (variant === 'horizontal') {
      return 'h-16 w-16 rounded-lg';
    }

    return 'w-full h-96 rounded-t-lg';
  };

  const getImageWrapper = () => {
    if (variant === 'horizontal') {
      return 'contents';
    }

    return '';
  };

  const getContentWrapper = () => {
    if (variant === 'horizontal') {
      return 'p-3';
    }

    return 'p-5';
  };

  const getTitleSize = () => {
    if (variant === 'horizontal') {
      return 'text-xl lg:text-lg';
    }

    return 'text-xl';
  };

  return (
    <div className={`w-full bg-white rounded-l ${getVariant()}`}>
      <Link href={link}>
        <a className={getImageWrapper()}>
          <img
            className={`object-cover ${getImageStyle()}`}
            src={image}
            alt={title}
          />
        </a>
      </Link>
      <div className={`w-full ${getContentWrapper()}`}>
        <Link href={link}>
          <a>
            <h5
              className={`mb-2 font-bold tracking-tight text-gray-900 whitespace-normal break-all ${getTitleSize()}`}
            >
              {title}
            </h5>
          </a>
        </Link>
        <p className="mb-3 font-normal text-gray-1">{content}</p>
        <Link href={link}>
          <a className="inline-flex items-center text-sm font-medium text-center text-primary">
            Read more
            <svg
              aria-hidden="true"
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default TArticle;
