const addZeroForward = (string: string, needLength: number = 2) => {
  return `${"0".repeat(needLength - string.length)}${string}`;
};


//Converts Date object to 'YYYY-MM-DD' string
const getFormatDate = (date: Date): string => {
  const days = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const years = date.getFullYear();
  return `${years}-${addZeroForward(month)}-${addZeroForward(days)}`;
};

export default getFormatDate