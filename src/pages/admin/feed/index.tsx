import { Alert, Button, Col, Row, message } from 'antd';
import {
  FeedItem,
  HeaderPage,
  ModalConfirmation,
  ModalFeed,
  ModalShareSocialMediaFeed,
  NotFound,
  Search,
  Spinner,
  TPagination
} from '../../../components';
import {
  RenderIf,
  checkIsPremium,
  checkPermissionArray,
  fetchWrapper,
  responseMessage
} from '../../../utils';
import { useCurrentTeam, useFeed, useProfile } from '../../../swr';
import { usePagination, useSearch } from '../../../customHooks';

import { Admin } from '../../../layouts';
import { API_BACKEND_HOST, CLIENT_URL } from '../../../config';
import { DraggerProps } from 'antd/lib/upload';
import { FeedInterface } from '../../../@types/Feed';
import Head from 'next/head';
import { PERMISSION } from '../../../constant/contract';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useForm } from 'antd/lib/form/Form';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Feed = () => {
  const [form] = useForm();
  const router = useRouter();
  const [refresh, setRefresh] = useState(true);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalShare, setOpenModalShare] = useState(false);
  const [textToCopy, setTextToCopy] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);
  const [shareId, setShareId] = useState(0);

  const [search, handleSearch] = useSearch('');

  const [currentPage, onChangePagination] = usePagination(1);
  const { data: timRelawanData, listPermission } = useCurrentTeam(true);
  const { data: feedData, isLoading } = useFeed(refresh, currentPage, search);
  const { data: userData, role: userRole } = useProfile(true);

  const draggerProps: DraggerProps = {
    name: 'file',
    multiple: false,
    listType: 'picture',
    showUploadList: true,
    beforeUpload: file => {
      const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';
      if (!isPNG) {
        message.error('Format tidak didukung! Masukkan file .png atau .jpg', 3);
      }

      const isSizeValid = file.size <= 2 * 1024 * 1024; // 2MB in bytes
      if (!isSizeValid) {
        message.error('Ukuran gambar tidak boleh lebih dari 2MB', 3);
      }

      return isPNG && isSizeValid;
    },
    maxCount: 1
  };

  const onReset = () => {
    form.resetFields();
    setId(0);
    setIsEdit(false);
    setOpenModalCreate(false);
    setOpenModalDelete(false);
  };

  const hideModal = () => {
    setRefresh(false);
    onReset();
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const getUrlFeedDetail = (id: number) => `${CLIENT_URL}/feed/${id}`;

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append('judul_feed', values.judul_feed);
    formData.append('isi', values.isi);
    formData.append('foto_feed', values.foto_feed);

    fetchWrapper
      .post_multipart('/api/feed', formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil ditambahkan',
          onHide: hideModal
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal menambahkan data',
          onHide: hideModal
        });
      })
      .finally(() => hideLoading());
  };

  const handleDelete = (id: number) => {
    fetchWrapper
      .delete(`/api/feed?id=${id}`)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil dihapus',
          onHide: hideModal
        });
      })
      .catch(() => {
        responseMessage({
          type: 'error',
          message: 'Gagal menghapus data',
          onHide: hideModal
        });
      })
      .finally(() => hideLoading());
  };

  const confirmDelete = (id: number) => {
    setOpenModalDelete(true);
    setId(id);
  };

  const handleOpenModalToUpdate = (record: FeedInterface) => {
    setId(record.id);
    setOpenModalCreate(true);
    setIsEdit(true);
    form.setFieldsValue({
      judul_feed: record.judul_feed,
      isi: record.isi,
      foto_feed: record.foto_feed
    });
  };

  const onUpdate = (values: any) => {
    const formData = new FormData();
    formData.append('judul_feed', values.judul_feed);
    formData.append('isi', values.isi);
    formData.append('foto_feed', values.foto_feed);

    setLoading(true);
    fetchWrapper
      .post_multipart(`/api/feed?id=${id}`, formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: hideModal
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal mengubah data',
          onHide: hideModal
        });
      })
      .finally(() => hideLoading());
  };

  const handleDownload = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/download-image-feed/${id}`,
        { responseType: 'blob' }
      );

      // Buat elemen link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(response.data);
      link.setAttribute('download', 'feed.jpg');

      // Klik elemen link secara terprogram
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = (item: FeedInterface) => {
    // fetchWrapper
    //   .post('/api/feed/share', {
    //     id_feed: item?.id
    //   })
    //   .then(() => {
    setTextToCopy(getUrlFeedDetail(item.id));
    setShareId(item.id);
    setOpenModalShare(true);
    hideModal();
    hideLoading();
    // })
    // .finally(() => hideLoading());
  };

  const handleShareClick = () => {
    axios
      .post('/api/feed/share', {
        id_feed: shareId
      })
      .then(() => {
        hideLoading();
        setOpenModalShare(false);
      });
  };

  if (!userData?.currentTeam) {
    return (
      <div>
        <Alert
          message="Anda harus memilih tim terlebih dahulu untuk melihat informasi pada halaman ini"
          type="info"
          showIcon
          className="mb-6"
        />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Feed</title>
      </Head>
      <HeaderPage
        title="Data Feed"
        action={
          <Button type="primary" onClick={() => setOpenModalCreate(true)}>
            Tambah Feed
          </Button>
        }
      />
      <Row className="mt-7">
        <Col xs={24}>
          <div className="flex justify-end mb-8">
            <Search value={search} onChange={handleSearch} />
          </div>
        </Col>
        {isLoading ? (
          <div className="h-96 flex items-center justify-center w-full">
            <Spinner />
          </div>
        ) : feedData?.data?.data?.length === 0 ? (
          <NotFound />
        ) : (
          <>
            <Col xs={24}>
              {feedData?.data?.data?.map((item: FeedInterface) => (
                <FeedItem
                  key={item.id}
                  src={item.foto_feed}
                  title={item.judul_feed}
                  onDownload={() => handleDownload(item.id)}
                  total={item.jml || 0}
                  date={item.created_at}
                  onEdit={() => handleOpenModalToUpdate(item)}
                  onDelete={() => confirmDelete(item.id)}
                  content={item.isi}
                  onShare={() => handleShare(item)}
                  withShare={checkPermissionArray({
                    roles: listPermission,
                    idRole: PERMISSION.read_share_feed
                  })}
                  disabled={!checkIsPremium(timRelawanData?.data.is_premium)}
                  url={`/admin/feed/detail/${item.id}`}
                  linkToCopy={getUrlFeedDetail(item?.id)}
                />
              ))}
            </Col>
            <RenderIf isTrue={feedData?.data?.data.length !== 0}>
              <Col xs={24}>
                <TPagination
                  total={feedData?.data?.total}
                  onChange={onChangePagination}
                />
              </Col>
            </RenderIf>
          </>
        )}
      </Row>

      {/* Modal Create */}
      <ModalFeed
        visible={openModalCreate}
        onCancel={onReset}
        draggerProps={draggerProps}
        onCreate={onFinish}
        onUpdate={onUpdate}
        loading={loading}
        form={form}
        isEdit={isEdit}
      />
      {/* Modal Create */}

      {/* Modal Hapus */}
      <ModalConfirmation
        visible={openModalDelete}
        onCancel={() => setOpenModalDelete(false)}
        onOk={() => handleDelete(id)}
      />
      {/* Modal Hapus */}

      {/* Modal Share */}
      <ModalShareSocialMediaFeed
        visible={openModalShare}
        handleClick={handleShareClick}
        onCancel={() => {
          setOpenModalShare(false);
          setTextToCopy('');
        }}
        textToCopy={textToCopy}
      />
      {/* Modal Sharea */}
    </>
  );
};

Feed.layout = Admin;

export default Feed;
