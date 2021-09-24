export const timeVariation = (created_at) => {
  const date = new Date(created_at);
  const now = new Date();

  const difference_in_time = now.getTime() - date.getTime();
  const difference_in_days = difference_in_time / (1000 * 3600 * 24);

  return difference_in_days;
};

export const returnDate = (created_at) => {
  const date = new Date(created_at);

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
