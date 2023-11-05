import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Props from './navLogo.props';

const NavLogo: React.FC<Props> = ({ image, alt }) => {
  return (
    <Link href="/">
      <a>
        <Image
          src={image}
          width={200}
          height={45}
          objectFit="contain"
          alt={alt}
        />
      </a>
    </Link>
  );
};

export default NavLogo;
