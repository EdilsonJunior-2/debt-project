export const timeVariation = (criado) => {
  const date = new Date(criado);
  const now = new Date();

  const difference_in_time = now.getTime() - date.getTime();
  const difference_in_days = difference_in_time / (1000 * 3600 * 24);

  return difference_in_days;
};

export const returnDate = (criado) => {
  const date = new Date(criado);

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
