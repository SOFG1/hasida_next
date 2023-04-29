import { IField } from "../api/user";
import { IsraelCountryCode, incomeOptions } from "../constants";
import getFormatDate from "./getFormatDate";

//Converts field inputs data (single values) and single dropdowns
const convertFormData = (formData: { [key: string]: any }) => {
  const requestData: { [key: string]: any } = {};
  Object.keys(formData).forEach((k) => {
    const value = formData[k];
    if (value === null) {
      requestData[k] = null;
      return;
    }
    if (value instanceof Date) {
      requestData[k] = getFormatDate(value);
      return;
    }
    if (Array.isArray(value) && value) {
      requestData[k] = value.map(v => v.value)
      return;
    }
    if (typeof value === "object" && value) {
      requestData[k] = value.value;
      return;
    }
    if (typeof value === "boolean") {
      requestData[k] = value;
      return;
    }
    if (value == Number(value)) {
      requestData[k] = Number(value);
      return;
    }
    if (value !== undefined) {
      requestData[k] = value;
      return;
    }
  });
  return requestData;
};

const convertApiData = (fields: IField[], data: { [key: string]: any }) => {
  const convertedData: { [key: string]: any } = {};
  fields.forEach((f) => {
    if (!data[f.name]) return;
    //Date inputs
    if (f.type === "Date") {
      convertedData[f.name] = new Date(data[f.name]);
      return;
    }
    //text inputs
    if (f.type === "String" && !f.options.length) {
      convertedData[f.name] = data[f.name];
      return;
    }
    //Textareas
    if (f.type === "Text") {
      convertedData[f.name] = data[f.name];
      return;
    }
    //Exception for income
    if (f.name === "income" && data?.country?.id === IsraelCountryCode) {
      const opt = incomeOptions[IsraelCountryCode].find(o => o.value === data[f.name])
      convertedData[f.name] = opt
      return
    }
    //Dropdowns
    if (f.type === "String" && f.options.length) {
      convertedData[f.name] = { label: data[f.name], value: data[f.name] };
      return;
    }
    //Fetchable dropdowns
    if (f.type === "ForeignKey") {
      convertedData[f.name] = {
        label: data[f.name].name,
        value: data[f.name].id,
      };
      return;
    }
    //Dropdowns
    if (f.type === "Integer") {
      convertedData[f.name] = data[f.name];
      return;
    }
  });
  return convertedData;
};

export { convertFormData, convertApiData };
