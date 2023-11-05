import React from 'react';
import { ArticleInterface } from '../../../../@types/Landing';
import { IlDefault } from '../../../../assets/img/landing';
import { dateFormat } from '../../../../utils';
import { TAuthorArticle } from '../../../moleculs';

export type DetailArticleProps = {
  data: ArticleInterface;
};

const ArticleDetailComponent: React.FC<DetailArticleProps> = ({ data }) => {
  return (
    <div className="w-full bg-white rounded-lg">
      <img
        className="rounded-t-lg w-full h-96 object-cover"
        src={data?.picture}
        alt={data?.title}
      />
      <div className="p-4 md:p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
          {data?.title}
        </h5>
        <span className="font-medium text-gray-1 mt-4">
          {dateFormat(data?.created_at, 'lll')}
        </span>
        <p
          className="mb-3 font-normal text-gray-1 leading-8 mt-4"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        ></p>
        <TAuthorArticle
          link={`/articles/author/${data?.user?.id}`}
          name={data?.user?.name}
        />
      </div>
    </div>
  );
};

export default ArticleDetailComponent;
