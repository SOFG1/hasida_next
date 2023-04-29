import getFormatDate from "./getFormatDate";

//Converts filters data with ranges and multiselects
const convertFiltersData = (body: { [key: string]: any }) => {
  const params: any = { offset: body.offset };
  Object.keys(body).forEach((key) => {
    const value = body[key];
    //Empty values
    if (!value || value?.length === 0) return;
    if (key === "offset") return;
    //Dates and integers (ranges)
    if (Array.isArray(value) && !value[0]?.hasOwnProperty("label")) {
      if (value[0] instanceof Date) {
        params[`${key}__gte`] = getFormatDate(value[0]);
      }
      if (typeof value[0] === "number") {
        params[`${key}__gte`] = value[0];
      }
      if (value[1] instanceof Date) {
        params[`${key}__lte`] = getFormatDate(value[1]);
      }
      if (typeof value[1] === "number") {
        params[`${key}__lte`] = value[1];
      }
      return;
    }
    //Dropdowns
    if (Array.isArray(value) && value[0]?.hasOwnProperty("label")) {
      params[key] = value.map((o) => o.value).join(',')
      return;
    }
    //Booleans, texts, strings
    params[key] = value;
  });
  return params;
};

export default convertFiltersData;
