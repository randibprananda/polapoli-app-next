import { Col, Form, Row } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { SurveiInterface } from '../../../../@types/Survei';
import { getWilayahSurvei } from '../../../../utils';
import { CardSurveiItem } from '../../../atoms';
import Props from './listCardSurvei.props';

const ListCardSurvei: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  return (
    <Form>
      <Row gutter={[12, 12]}>
        {data?.map((item: SurveiInterface) => (
          <Col key={item.id} xs={24} md={12} xl={12}>
            <CardSurveiItem
              title={item.judul_survey}
              daerah={getWilayahSurvei([
                item?.propinsi,
                item?.kabupaten,
                item?.kecamatan,
                item?.kelurahan,
                item?.dapil
              ])}
              pembukaan={item.pembukaan_survey.replaceAll('-', '/')}
              penutupan={item.penutupan_survey.replaceAll('-', '/')}
              totalResponden={item.total_answer}
              onClick={() => router.push(`/admin/survei/soal/${item.id}`)}
            />
          </Col>
        ))}
      </Row>
    </Form>
  );
};

export default ListCardSurvei;
