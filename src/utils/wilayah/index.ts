export const getWilayahSurvei = (wilayah: any[]) => {
  const wilayahIndex = wilayah.filter((item: any) => item).length - 1;
  console.log('wilayah', wilayah);

  return wilayahIndex === -1 ? null : wilayah[wilayahIndex].name;
};

export const getJenisWilayah = (wilayah: any[]) => {
  const tempJenisWilayah = wilayah.filter((item: any) => item).length - 1;
  return tempJenisWilayah === -1 ? null : tempJenisWilayah.toString();
};
