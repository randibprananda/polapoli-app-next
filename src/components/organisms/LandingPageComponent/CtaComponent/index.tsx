import React from 'react';
import { useRouter } from 'next/router';
import { TButton, TText, TTitle } from '../../../atoms';

export type CtaProps = {
  title: string;
  subTitle: string;
};
const CtaComponent: React.FC<CtaProps> = ({ title, subTitle }) => {
  const router = useRouter();
  return (
    <section className="start bg-rose">
      <div className="absolute z-0 max-w-screen-2xl mx-auto lg:-mt-80"> </div>
      <main className="relative z-10 px-4 mx-auto py-24 max-w-screen-2xl lg:px-16">
        <div className="flex flex-col items-center w-full text-center">
          <TTitle text={title} color="white" size="4xl" tag="h3" />
          <div className="w-full mt-8 mb-20">
            <TText
              size="lg"
              fontWeight="normal"
              color="white"
              customStyle="leading-snug lg:leading-normal"
              text={subTitle}
            />
          </div>
          <div className="flex">
            <TButton
              fontWeight="semibold"
              type="white"
              text="Daftar Sekarang"
              textSize="xl"
              onClick={() => router.push('/auth/register')}
            />
          </div>
        </div>
      </main>
    </section>
  );
};

export default CtaComponent;
