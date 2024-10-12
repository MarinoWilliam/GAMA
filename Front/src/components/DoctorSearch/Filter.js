export const searchFilter = (searchValue, list, spec = '', city = '') => {
  let lowerCaseQuery = searchValue.toLowerCase();

  if ((spec) && (spec.length > 0)) {
    list = list.filter(x => (x['spec'] === spec))
  }
  
  if ((city) && (city.length > 0)) {
    list = list.filter(x => (x['city'] === city))
  }

  let filteredList = searchValue
    ? list.filter(x => x['name'].toLowerCase().includes(lowerCaseQuery))
    : list;

  return filteredList;
};


export const patientSearchFilter = (searchValue, list) => {
  let lowerCaseQuery = searchValue.toLowerCase();

  let filteredList = searchValue
    ? list.filter(x => x['name'].toLowerCase().includes(lowerCaseQuery))
    : list;

  return filteredList;
};