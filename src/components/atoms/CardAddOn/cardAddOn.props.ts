import { SwitchChangeEventHandler } from 'antd/lib/switch';

type CardAddOnProps = {
  title: string;
  price: number;
  description: string;
  onChange: SwitchChangeEventHandler | undefined;
};

export default CardAddOnProps;
