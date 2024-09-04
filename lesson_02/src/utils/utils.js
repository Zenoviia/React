export const generateRandomIndex = (array) => {
  if (array.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
};
