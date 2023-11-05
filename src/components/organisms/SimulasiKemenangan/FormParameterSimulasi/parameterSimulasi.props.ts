type ParameterSimulasiProps = {
  estimasiPemilih: number;
  targetMenang: number;
  onChangeParameter: (
    name: 'estimasiPemilih' | 'targetMenang',
    value: any
  ) => void;
};

export default ParameterSimulasiProps;
