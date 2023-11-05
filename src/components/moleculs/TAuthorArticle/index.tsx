import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { IlDefault } from '../../../assets/img/landing';
import { checkBaseUrlImageLanding } from '../../../utils';

import Props from './tAuthorArticle.props';

const TAuthorArticle: React.FC<Props> = ({ link, name = '-', picture }) => {
  const router = useRouter();
  return (
    <div className="w-full bg-white border-t border-t-primary pt-6 flex flex-col sm:flex-row sm:items-center justify-start sm:justify-between">
      <div className="flex items-center">
        <img
          className=" rounded-full w-16 h-16 lg:w-28 lg:h-28 object-cover"
          src={picture ? checkBaseUrlImageLanding(picture) : IlDefault.src}
          alt={'icon'}
        />
        <div className="pl-6">
          {/* <span className="text-xl font-semibold">Penulis</span> */}
          <h6 className="text-rose text-2xl font-bold">{name}</h6>
        </div>
      </div>
      <Button
        type="primary"
        className="self-start sm:self-center mt-5 sm:mt-0"
        onClick={() => router.push(link)}
      >
        Lihat Profil
      </Button>
    </div>
  );
};

export default TAuthorArticle;
