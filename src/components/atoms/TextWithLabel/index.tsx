import Link from 'next/link';
import React from 'react';
import Props from './textWithLabel.props';

const TextWithLabel: React.FC<Props> = ({
  label,
  text,
  withLink = false,
  link = null,
  customLinkText = null
}) => {
  return (
    <div>
      <span className="font-semibold text-xs mb-2">{label}</span>
      <p className="font-semibold text-base">{text}</p>
      {withLink && (
        <a
          target="_blank"
          href={link || '#'}
          className="text-xs text-primary underline"
          rel="noreferrer"
        >
          {customLinkText || 'Lihat'}
        </a>
      )}
    </div>
  );
};

export default TextWithLabel;
