import numeral from "numeral";

//sort country by cases
export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const NumberFormat = (stat) =>
  stat ? `${numeral(stat).format("0.0a")}` : "+0";
