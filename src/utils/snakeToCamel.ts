export function snakeToCamel(str: string | number | symbol) {
  return str.toString().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}
