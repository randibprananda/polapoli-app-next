import { Collapse } from 'antd';
import React from 'react';
import { FaqInterface } from '../../../../@types/Landing';
import { TTitle } from '../../../atoms';

const { Panel } = Collapse;

export type FAQProps = {
  data: FaqInterface[];
};

const FAQComponent: React.FC<FAQProps> = ({ data }) => {
  return (
    <section className="h-full w-full border-box py-20 lg:px-32 px-8 bg-white">
      <div className="content-7-2">
        <div className="text-center lg:mb-16 mb-12">
          <TTitle text="FAQ" color="primary" size="4xl" customStyle="mb-3" />
        </div>
        <div className="faq">
          <Collapse accordion>
            {data?.map((item: FaqInterface) => (
              <Panel header={item.question} key={item.id}>
                <p>{item.answer}</p>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;
