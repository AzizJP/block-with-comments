export const doValidDate = date => {
  return `${date.slice(3, 5)}.${date.slice(0, 2)}.${date.slice(6)}`;
};
