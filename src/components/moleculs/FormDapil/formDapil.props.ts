type FormDapilProps = {
  isActive: boolean;
  mounted: boolean;
  form: any;
  customLayout?: {
    dapil: {
      xs: any;
      sm: any;
      md: any;
      lg: any;
      xl: any;
    };
    customDapil: {
      xs: any;
      sm: any;
      md: any;
      lg: any;
      xl: any;
    };
  };
  allDisabled?: boolean;
};

export default FormDapilProps;
