import React from 'react';
import { Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Plus } from 'react-iconly';
import { colors } from '../../../../theme';
import { Gap } from '../../../atoms';

import Props from './tambahPertanyaan.props';

const TambahPertanyaan: React.FC<Props> = ({ onCreate }) => {
  return (
    <section className="bg-white rounded-xl p-4 md:py-9 md:px-8 mb-6 flex flex-col md:flex-row justify-between items-center sticky top-6 left-0 right-0 z-30 shadow">
      <div>
        <Title level={2} className="text-xl font-bold">
          List Pertanyaan
        </Title>
        <span className="text-sm">
          <b>Informasi</b> bahwa sudah ada field Nama dan Alamat Responden
        </span>
      </div>
      <Button
        onClick={onCreate}
        type="default"
        className="flex justify-center items-center"
      >
        <Plus set="light" primaryColor={colors.primary} size={16} />
        <Gap width={10} height={2} />
        Tambah Pertanyaan
      </Button>
    </section>
  );
};

export default TambahPertanyaan;
