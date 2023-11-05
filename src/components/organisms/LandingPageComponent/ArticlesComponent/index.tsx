import { Col, Row } from 'antd';
import React from 'react';
import { ArticleInterface } from '../../../../@types/Landing';
import { IlDefault } from '../../../../assets/img/landing';
import { RenderIf } from '../../../../utils';
import { TArticle } from '../../../moleculs';

export type ArticlesProps = {
  data: ArticleInterface[];
};

const ArticlesComponent: React.FC<ArticlesProps> = ({ data }) => {
  return (
    <div className="bg-light">
      <div className="px-4 py-20 mx-auto md:px-6 max-w-screen-2xl lg:px-24">
        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <RenderIf isTrue={data[0]?.hasOwnProperty('id')}>
              <TArticle
                image={data[0]?.picture}
                title={data[0]?.title}
                content={''}
                link={`/articles/${data[0]?.id}`}
              />
            </RenderIf>
          </Col>
          {/* section 2 */}
          <RenderIf isTrue={data?.length > 1}>
            {data?.slice(1)?.map((artikel: ArticleInterface) => (
              <Col xs={24} md={12} key={artikel.id}>
                <TArticle
                  image={artikel.picture}
                  title={artikel.title}
                  content=""
                  link={`/articles/${artikel.id}`}
                />
              </Col>
            ))}
          </RenderIf>
        </Row>
      </div>
    </div>
  );
};

export default ArticlesComponent;
