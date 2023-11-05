type Props = {
  onDelete: (val: number) => void;
  index: number;
  onChange: (key: number, type: string) => void;
  initJenisJawaban?: string;
};

export default Props;
