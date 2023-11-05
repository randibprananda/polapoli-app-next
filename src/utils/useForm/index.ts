import { useState } from 'react';

export const useForm = (initialValue: any) => {
  const [values, setValues] = useState(initialValue);

  return [
    values,
    (name: string, value: any) => {
      if (name === 'reset') {
        return setValues(initialValue);
      }
      return setValues({
        ...values,
        [name]: value
      });
    }
  ];
};
