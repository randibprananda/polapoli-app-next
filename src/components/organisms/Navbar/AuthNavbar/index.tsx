import React from 'react';
import Image from 'next/image';
import { IcArrowLeft, IlLogo, IlLogoNew } from '../../../../assets';
import { useRouter } from 'next/router';

const AuthNavbar = () => {
  const router = useRouter();

  return (
    <nav className="py-4 sm:px-16 bg-white">
      <div className="flex justify-center sm:justify-start items-center">
        <button className="mr-3" onClick={() => router.push('/')}>
          <Image
            src={IcArrowLeft}
            width={32}
            height={32}
            objectFit="contain"
            loading="eager"
            alt="Back"
          />
        </button>
        <button>
          <Image
            src={IlLogoNew}
            width={171}
            height={40}
            objectFit="contain"
            loading="eager"
            alt="PolaPoli"
          />
        </button>
      </div>
    </nav>
  );
};

export default AuthNavbar;
