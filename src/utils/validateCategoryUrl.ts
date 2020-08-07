const prefix = "/category";
const categories: Array<string> = [
  `${prefix}/shirts`,
  `${prefix}/dresses`,
  `${prefix}/jeans/skinny`,
  `${prefix}/jeans/relaxed`,
  `${prefix}/jeans/bootcut`,
  `${prefix}/jeans/straight`,
  `${prefix}/jackets`,
  `${prefix}/gymwear`,
  `${prefix}/blazers`,
  `${prefix}/shoes`
];

export default (path: string): boolean => {
  const index = categories.indexOf(path);
  if (index === -1) return false;
  return true;
};
