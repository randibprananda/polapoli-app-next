import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  SectionContact,
  SectionDonation,
  SectionMision,
  SectionProgramKerja,
  SectionVision,
  SectionProfile,
  SectionGallery,
  Spinner,
  SectionPengalamanKerja
} from '../../../components';
import { Kemenangan } from '../../../layouts';
import { usePublicKemenanganBySlug } from '../../../swr';
import { getWindowLastPath } from '../../../utils';

const KemenanganPage = () => {
  const [slug, setSlug] = useState('');
  const router = useRouter();

  // swr
  const { data: allData, isLoading } = usePublicKemenanganBySlug(true, slug);

  useEffect(() => {
    if (!slug) {
      setSlug(getWindowLastPath());
    }
  }, [router]);

  return isLoading ? (
    <div className="flex justify-center items-center w-screen h-screen">
      <Spinner />
    </div>
  ) : (
    <>
      <SectionProfile
        color={allData?.data?.tentang_paslon?.tema_warna || '#C41141'}
        background={allData?.data?.tentang_paslon?.background}
        jenis_pencalonan={allData?.data?.jenis_pencalonan}
        nama_paslon={allData?.data?.nama_paslon}
        nama_wakil_paslon={allData?.data?.nama_wakil_paslon}
        nomor_urut={allData?.data?.nomor_urut}
        paslon_profile_photo={
          allData?.data?.tentang_paslon?.foto_calon_web_kemenangan
        }
        motto={allData?.data?.tentang_paslon?.motto}
        slogan={allData?.data?.tentang_paslon?.slogan}
        parpol={allData?.data?.tentang_paslon?.parpol_paslons}
      />
      <SectionVision
        color={allData?.data?.tentang_paslon?.tema_warna || '#C41141'}
        vision={allData?.data?.tentang_paslon?.visi}
      />
      <SectionMision
        color={allData?.data?.tentang_paslon?.tema_warna || '#C41141'}
        mision={allData?.data?.tentang_paslon?.misi_paslons}
      />
      <SectionProgramKerja
        color={allData?.data?.tentang_paslon?.tema_warna || '#C41141'}
        programKerja={allData?.data?.tentang_paslon?.proker_paslons}
      />
      <SectionPengalamanKerja
        color={allData?.data?.tentang_paslon?.tema_warna || '#C41141'}
        pengalamanKerja={allData?.data?.tentang_paslon?.pengalaman_kerja}
      />
      <SectionGallery
        color={allData?.data?.tentang_paslon?.tema_warna || '#C41141'}
        data={allData?.data?.galeri_paslon || []}
      />
      <SectionDonation
        color={allData?.data?.tentang_paslon?.tema_warna || '#C41141'}
        data={allData?.donation_data}
      />
      <SectionContact
        color={allData?.data?.tentang_paslon?.tema_warna || '#C41141'}
        contact={allData?.data?.contact_web_kemenangan}
        socialMedia={allData?.data?.sosmed_web_kemenangan}
      />
    </>
  );
};

KemenanganPage.layout = Kemenangan;

export default KemenanganPage;
