export default (regexFunction: RegExp, value: string, max: number, text: string) => {
  let error: string | null = null;
  if (value.length === 0) error = `${text} cannot be empty`;
  else if (value.length > max) error = `Too long ${text}`;
  else if (!regexFunction.test(value)) error = `Invalid ${text}`;
  return error;
};
