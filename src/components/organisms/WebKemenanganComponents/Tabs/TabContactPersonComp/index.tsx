import { Row, Col, Button } from 'antd';
import React from 'react';
import {
  DaftarParpolKemenangan,
  MisiKemenangan,
  ProgramKerjaKemenangan,
  KodeWarnaKemenangan
} from '../..';
import { JENIS_PENCALONAN } from '../../../../../constant';
import { PERMISSION } from '../../../../../constant/contract';
import { RenderIf, checkPermissionArray } from '../../../../../utils';
import { CardKemenangan } from '../../../../atoms';
import Background from '../../BackgroundComponent';
import BagikanKemenangan from '../../BagikanKemenangan';
import FotoCalonComponent from '../../FotoCalonComponent';
import InfoCalonComponent from '../../InfoCalonComponent';
import PengalamanKerjaComponent from '../../PengalamanKerjaComponent';
import VisiKemenangan from '../../VisiKemenangan';

const TabAboutCalonComp: React.FC<any> = ({
  listPermission,
  tentangCalonData,
  formBackground,
  onUpdateBackground,
  formInfoCalon,
  onUpdateInfoCalon,
  openModalParpol,
  onCancelParpol,
  draggerProps,
  onCreateParpol,
  onUpdateParpol,
  loading,
  formParpol,
  isEdit,
  setOpenModalParpol,
  columnsParpol,
  formVisi,
  onUpdateVisi,
  formMisi,
  onUpdateMisi,
  formProker,
  onUpdateProker,
  formFotoCalon,
  onUpdateFotoCalon,
  formTema,
  onUpdateTema,
  isDisable,
  pengalamanKerja = {
    columnsPengalamanKerja: [],
    pengalamanKerjaData: [],
    openModalPengalamanKerja: () => {},
    onCancelPengalamanKerja: () => {},
    onCreatePengalamanKerja: () => {},
    onUpdatePengalamanKerja: () => {},
    formPengalamanKerja: {},
    setOpenModalPengalamanKerja: () => {},
    loadingPengalamanKerja: false
  }
}) => {
  const {
    columnsPengalamanKerja,
    pengalamanKerjaData,
    openModalPengalamanKerja,
    onCancelPengalamanKerja,
    onCreatePengalamanKerja,
    onUpdatePengalamanKerja,
    formPengalamanKerja,
    loadingPengalamanKerja,
    setOpenModalPengalamanKerja
  } = pengalamanKerja;

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24}>
        <RenderIf
          isTrue={checkPermissionArray({
            roles: listPermission,
            idRole: PERMISSION.tambah_background
          })}
        >
          <Background
            backgroundSrc={tentangCalonData?.data?.tentang_paslon?.background}
            form={formBackground}
            onUpdate={onUpdateBackground}
            isDisable={isDisable}
          />
        </RenderIf>
      </Col>
      <Col xs={24}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16} xl={17}>
            <Row gutter={[24, 24]}>
              <RenderIf
                isTrue={checkPermissionArray({
                  roles: listPermission,
                  idRole: PERMISSION.info_calon
                })}
              >
                <Col xs={24}>
                  {/* info calon */}
                  <InfoCalonComponent
                    form={formInfoCalon}
                    onUpdate={onUpdateInfoCalon}
                    data={{
                      paslon_name: tentangCalonData?.data?.nama_wakil_paslon
                        ? `${tentangCalonData?.data?.nama_paslon} & ${tentangCalonData?.data?.nama_wakil_paslon}`
                        : tentangCalonData?.data?.nama_paslon,
                      motto: tentangCalonData?.data?.tentang_paslon?.motto,
                      slogan: tentangCalonData?.data?.tentang_paslon?.slogan,
                      jenis_pencalonan:
                        tentangCalonData?.data?.jenis_pencalonan,
                      paslon_number: tentangCalonData?.data?.nomor_urut
                    }}
                    jenisPencalonan={JENIS_PENCALONAN}
                    isDisable={isDisable}
                  />
                </Col>
              </RenderIf>

              <RenderIf
                isTrue={checkPermissionArray({
                  roles: listPermission,
                  idRole: PERMISSION.slug_halaman_profil_kemenangan
                })}
              >
                <Col xs={24}>
                  {/* bagikan halaman */}
                  <BagikanKemenangan
                    slug={`/kemenangan/${tentangCalonData?.data?.tentang_paslon?.slug}`}
                    isShareDisable={
                      !tentangCalonData?.data?.tentang_paslon?.slug
                    }
                    isDisable={isDisable}
                  />
                </Col>
              </RenderIf>

              <RenderIf
                isTrue={checkPermissionArray({
                  roles: listPermission,
                  idRole: PERMISSION.crud_parpol
                })}
              >
                <Col xs={24}>
                  {/* daftar parpol */}
                  <DaftarParpolKemenangan
                    data={
                      tentangCalonData?.data?.tentang_paslon?.parpol_paslons ||
                      []
                    }
                    visible={openModalParpol}
                    onCancel={onCancelParpol}
                    draggerProps={draggerProps}
                    onCreate={onCreateParpol}
                    onUpdate={onUpdateParpol}
                    loading={loading}
                    form={formParpol}
                    isEdit={isEdit}
                    onOpenModal={() => setOpenModalParpol(true)}
                    columns={columnsParpol}
                    isDisable={isDisable}
                  />
                </Col>
              </RenderIf>

              <RenderIf
                isTrue={checkPermissionArray({
                  roles: listPermission,
                  idRole: PERMISSION.tambah_visi_paslon
                })}
              >
                <Col xs={24}>
                  {/* visi */}
                  <VisiKemenangan
                    form={formVisi}
                    onUpdate={onUpdateVisi}
                    visi={tentangCalonData?.data?.tentang_paslon?.visi}
                    isDisable={isDisable}
                  />
                </Col>
              </RenderIf>

              <RenderIf
                isTrue={checkPermissionArray({
                  roles: listPermission,
                  idRole: PERMISSION.crud_misi_paslon
                })}
              >
                <Col xs={24}>
                  {/* misi */}
                  <MisiKemenangan
                    form={formMisi}
                    onUpdate={onUpdateMisi}
                    misi_paslons={
                      tentangCalonData?.data?.tentang_paslon?.misi_paslons
                    }
                    isDisable={isDisable}
                  />
                </Col>
              </RenderIf>

              <RenderIf
                isTrue={checkPermissionArray({
                  roles: listPermission,
                  idRole: PERMISSION.crud_program_kerja
                })}
              >
                <Col xs={24}>
                  {/* proker */}
                  <ProgramKerjaKemenangan
                    form={formProker}
                    onUpdate={onUpdateProker}
                    proker_paslons={
                      tentangCalonData?.data?.tentang_paslon?.proker_paslons
                    }
                    isDisable={isDisable}
                  />
                </Col>
              </RenderIf>

              <RenderIf
                isTrue={checkPermissionArray({
                  roles: listPermission,
                  idRole: PERMISSION.crud_parpol
                })}
              >
                <Col xs={24}>
                  <PengalamanKerjaComponent
                    data={pengalamanKerjaData || []}
                    visible={openModalPengalamanKerja}
                    onCancel={onCancelPengalamanKerja}
                    onCreate={onCreatePengalamanKerja}
                    onUpdate={onUpdatePengalamanKerja}
                    loading={loadingPengalamanKerja}
                    form={formPengalamanKerja}
                    isEdit={isEdit}
                    onOpenModal={() => setOpenModalPengalamanKerja(true)}
                    columns={columnsPengalamanKerja}
                    isDisable={isDisable}
                  />
                </Col>
              </RenderIf>
            </Row>
          </Col>
          <Col xs={24} lg={8} xl={7}>
            <Row gutter={[24, 24]}>
              <Col xs={24}>
                {/* foto */}
                <FotoCalonComponent
                  foto_calon={
                    tentangCalonData?.data?.tentang_paslon
                      ?.foto_calon_web_kemenangan
                  }
                  form={formFotoCalon}
                  onUpdate={onUpdateFotoCalon}
                  isDisable={isDisable}
                />
              </Col>

              <Col xs={24}>
                {/* tema */}
                <KodeWarnaKemenangan
                  form={formTema}
                  onUpdate={onUpdateTema}
                  tema_warna={
                    tentangCalonData?.data?.tentang_paslon?.tema_warna ||
                    '#C41141'
                  }
                  isDisable={isDisable}
                />
              </Col>
              <RenderIf
                isTrue={checkPermissionArray({
                  roles: listPermission,
                  idRole: PERMISSION.view_halaman_kemenangan
                })}
              >
                <Col xs={24}>
                  {/* preview halaman */}
                  <CardKemenangan
                    title="Preview Halaman"
                    content={
                      <a
                        href={`/kemenangan/${tentangCalonData?.data?.tentang_paslon?.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button
                          block
                          type="primary"
                          size="large"
                          disabled={
                            !tentangCalonData?.data?.tentang_paslon?.slug
                          }
                        >
                          Lihat Halaman
                        </Button>
                      </a>
                    }
                  />
                </Col>
              </RenderIf>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TabAboutCalonComp;
