export const debugValues = (formData: any) => {
  for (var value of formData.entries()) {
    console.log(value[0], value[1]);
  }
};
