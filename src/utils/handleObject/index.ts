export const cleanObject = (obj: any) => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
};

export const generateFormDataObj = (formData: any, obj: any, options?: any) => {
  if (obj.fields) {
    for (let propField in obj.fields) {
      formData.append(propField, obj.fields[propField]);
    }

    for (let propFile in obj.files) {
      formData.append(
        propFile,
        options?.createReadStream(obj.files[propFile].filepath)
      );
    }

    return formData;
  }

  for (let propField in obj) {
    formData.append(propField, obj[propField]);
  }

  return formData;
};

export const objectToArray = (obj: any): any[] =>
  obj ? Object.values(obj) : [];
