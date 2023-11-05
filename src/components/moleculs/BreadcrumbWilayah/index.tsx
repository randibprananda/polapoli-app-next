import { Breadcrumb } from 'antd';
import React from 'react';
import Props from './breadcrumbWilayah.props';

const BreadcrumbWilayah: React.FC<Props> = ({ wilayah, resetWilayah }) => {
  return (
    <Breadcrumb separator=">" className="font-medium">
      <Breadcrumb.Item
        className="cursor-pointer capitalize"
        onClick={() => resetWilayah('all')}
      >
        Semua
      </Breadcrumb.Item>
      {wilayah?.propinsi_id.id && (
        <Breadcrumb.Item
          className="cursor-pointer capitalize"
          onClick={() => resetWilayah('provinsi')}
        >
          {wilayah?.propinsi_id.name}
        </Breadcrumb.Item>
      )}
      {wilayah?.kabupaten_id.id && (
        <Breadcrumb.Item
          className="cursor-pointer capitalize"
          onClick={() => resetWilayah('kabupaten')}
        >
          {wilayah?.kabupaten_id.name}
        </Breadcrumb.Item>
      )}
      {wilayah?.kecamatan_id.id && (
        <Breadcrumb.Item
          className="cursor-pointer capitalize"
          onClick={() => resetWilayah('kecamatan')}
        >
          {wilayah?.kecamatan_id.name}
        </Breadcrumb.Item>
      )}
      {wilayah?.kelurahan_id?.id && (
        <Breadcrumb.Item
          className="cursor-pointer capitalize"
          onClick={() => resetWilayah('kelurahan')}
        >
          {wilayah?.kelurahan_id?.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default BreadcrumbWilayah;
