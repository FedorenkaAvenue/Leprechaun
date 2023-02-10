export function objectToFormData(data: any) {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    const value = data[key];
    if (Array.isArray(value)) {
      value.forEach((item: string | File, index: number) => {
        if(item instanceof File) {
          formData.append(key, item)
        } else {
          formData.append(`${key}[${index}]`, item)
        }
      });
    }
    
    else if(typeof value === 'object' && value !== null) {
      if(value instanceof File) {
        formData.append(key, value)
      }
      else {
        Object.keys(value).forEach(subKey => {formData.append(`${key}[${subKey}]`, value[subKey])}) 
      }
    }
    else {
      formData.append(key, value)
    }
    
  });
  return formData;
}