import React from 'react';
import { Form } from 'antd';
import { PertanyaanItem } from '../../../moleculs';

import Props from './formPertanyaan.props';

const FormPertanyaan: React.FC<Props> = ({
  form,
  listPertanyaan,
  onDeleteItem,
  onUpdateTypeItem
}) => {
  return (
    <Form layout="vertical" form={form}>
      {listPertanyaan.map((item: any) => {
        return (
          <PertanyaanItem
            onChange={onUpdateTypeItem}
            key={item.id}
            index={item.id}
            onDelete={onDeleteItem}
            initJenisJawaban={item.type}
          />
        );
      })}
    </Form>
  );
};

export default FormPertanyaan;
