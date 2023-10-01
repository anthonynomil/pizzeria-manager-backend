export const ingredientName = (value: string) => value.toLowerCase();
export const isUuidv4 = (value: string) => {
  const uuidv4Regex = new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9a-f]{12}4[0-9a-f]{19}");
  return uuidv4Regex.test(value);
};
