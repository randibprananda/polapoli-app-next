type TCardProps = {
  title: string;
  price: string;
  time: string;
  features: string[];
  type?: 'primary' | 'white';
  onBuy: () => void;
};

export default TCardProps;
