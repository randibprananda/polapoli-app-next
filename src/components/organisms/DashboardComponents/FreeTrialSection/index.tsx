import { Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { IlLogoNew, IlPattern2 } from '../../../../assets';

export type FreeTrialSectionProps = {
  name?: string;
};

const FreeTrialSection: React.FC<FreeTrialSectionProps> = ({
  name = 'Budi'
}) => {
  const router = useRouter();

  return (
    <div
      className={`relative flex flex-col-reverse md:flex-row justify-between items-center rounded-xl bg-white overflow-hidden`}
      aria-label="Banner"
      style={{ maxWidth: 1000 }}
    >
      <div className="absolute top-0 bottom-0 right-0 hidden md:block">
        <Image
          src={IlPattern2}
          alt="background"
          width={2034}
          height={494}
          className="rounded-xl"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col-reverse items-center justify-between w-full px-6 py-10 md:flex-row">
        <div className="mt-4 text-center md:text-left md:mt-0">
          <h5 className="mb-4 text-xl font-bold text-primary">
            Selamat Datang, {name} <br /> Sekarang Kamu Masih Menggunakan Fitur
            Trial
          </h5>
          <Button
            type="primary"
            size="middle"
            onClick={() => router.push('/pricing')}
          >
            Upgrade Sekarang
          </Button>
        </div>
        <Image src={IlLogoNew} width={199} height={45} alt="logo" />
      </div>
    </div>
  );
};

export default FreeTrialSection;
