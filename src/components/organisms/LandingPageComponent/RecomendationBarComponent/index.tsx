import Link from 'next/link';
import React from 'react';
import { ArticleInterface } from '../../../../@types/Landing';
import { IlDefault } from '../../../../assets/img/landing';
import { RenderIf } from '../../../../utils';
import { TArticle } from '../../../moleculs';

import Props from './recomendationBar.props';

const RecomendationBarComponent: React.FC<Props> = ({ data }) => {
  return (
    <aside className="bg-white h-full w-full rounded-lg p-4 md:p-6 max-w-lg">
      <h6 className="mb-2 text-xl font-bold  text-black">Rekomendasi</h6>
      <RenderIf isTrue={(data?.length || 0) > 1}>
        <ul>
          {/* <RenderIf isTrue={data?.length > 1}> */}
          {data?.map((artikel: ArticleInterface) => (
            <li key={artikel.id}>
              <TArticle
                image={artikel.picture}
                title={artikel.title}
                content=""
                link={`/articles/${artikel.id}`}
                variant="horizontal"
              />
            </li>
          ))}
          {/* </RenderIf> */}
        </ul>
        <Link href="/articles">
          <a className="inline-block w-full text-center text-primary font-bold mt-6">
            Lainnya
          </a>
        </Link>
      </RenderIf>
    </aside>
  );
};

export default RecomendationBarComponent;
