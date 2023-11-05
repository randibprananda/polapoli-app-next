type TButtonProps = {
  type?: 'primary' | 'rose' | 'grey' | 'secondary' | 'white';
  fontWeight?: 'normal' | 'medium' | 'semibold';
  textSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  text: string;
  customStyle?: string;
  onClick?: () => void;
  block?: boolean;
};

export default TButtonProps;
