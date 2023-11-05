type TCardProps = {
  title: string;
  checked: number[];
  price: string;
  time: string;
  features: string[];
  type?: 'primary' | 'white';
  onBuy: () => void;
  packet: number;
};

export default TCardProps;
