export const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase();
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US');
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
