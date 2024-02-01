export const getClasses = (classes) =>
  classes
    .filter((cl) => cl !== '')
    .join(' ')
    .trim();
