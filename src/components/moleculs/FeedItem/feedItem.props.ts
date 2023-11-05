type Props = {
  src: string;
  title: string;
  onDownload: (item: any) => void;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  onShare: () => void;
  date: string;
  content: string;
  withShare?: boolean;
  disabled?: boolean;
  total?: number;
  url?: string;
  linkToCopy?: string;
};

export default Props;
