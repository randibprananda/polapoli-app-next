import { Col, Row } from 'antd';
import Image from 'next/image';
import React from 'react';
import { ClientInterface, SolutionInterface } from '../../../../@types/Landing';
import { checkBaseUrlImageLanding } from '../../../../utils';
import { TCardSolution, TTitle } from '../../../atoms';

export type ClientProps = {
  clients: any;
  solutions: any;
  title: string;
  subTitle: string;
};

const ClientComponent: React.FC<ClientProps> = ({
  title,
  subTitle,
  clients,
  solutions
}) => {
  return (
    <section className="bg-white">
      <main className="flex flex-col gap-12 px-4 py-20 mx-auto md:px-6 max-w-screen-2xl lg:px-24">
        <div className="grid items-center gap-20 md:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-6 md:col-span-10 lg:pr-16">
            <div className="flex flex-col gap-5">
              <div className="text-lg font-semibold text-left uppercase text-pink">
                {subTitle}
              </div>
              <TTitle size="3xl" text={title} tag="h2" />
            </div>
          </div>
          <div className="md:col-span-10 lg:col-span-6">
            <Row gutter={[24, 24]}>
              {solutions?.map((solution: SolutionInterface) => (
                <Col key={solution.id} xs={24} sm={12}>
                  <TCardSolution
                    icon={
                      <Image
                        width={60}
                        height={60}
                        src={checkBaseUrlImageLanding(solution.picture)}
                        alt={solution.title}
                      />
                    }
                    title={solution.title}
                    description={solution.description}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </div>
        {/* <div className="flex flex-row flex-wrap items-center justify-evenly md:justify-center gap-14 md:flex-row mt-14">
          {clients?.map((item: ClientInterface) => (
            <img
              src={checkBaseUrlImageLanding(item.picture)}
              className="img-client object-cover"
              alt={item.title}
              key={item.id}
            />
          ))}
        </div> */}
      </main>
    </section>
  );
};

export default ClientComponent;
