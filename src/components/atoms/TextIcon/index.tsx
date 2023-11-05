import Link from 'next/link';
import React from 'react';
import { colors } from '../../../theme';
import Props from './textIcon.props';

const TextIcon: React.FC<Props> = ({
  tag = 'div',
  text,
  icon = null,
  size = 16,
  color = colors.white,
  href,
  className
}) => {
  const Tag = tag;
  if (href) {
    return (
      <Link href={href}>
        <a>
          <Tag className={`flex items-center justify-start ${className}`}>
            {icon}
            <p
              className="ml-2 font-medium"
              style={{
                fontSize: size - 4,
                color
              }}
            >
              {text}
            </p>
          </Tag>
        </a>
      </Link>
    );
  }

  return (
    <Tag className={`flex items-start justify-start ${className}`}>
      <div>{icon}</div>
      <p
        className="ml-2 font-medium p-0"
        style={{
          fontSize: size - 4,
          color
        }}
      >
        {text}
      </p>
    </Tag>
  );
};

export default TextIcon;
