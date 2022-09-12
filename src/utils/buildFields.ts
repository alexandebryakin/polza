type BuildFieldsReturnType<T> = Record<keyof T, keyof T>;

export function buildFields<T>(keys: Array<keyof T>): BuildFieldsReturnType<T> {
  return Object.fromEntries(keys.map((key) => [key, key])) as BuildFieldsReturnType<T>;
}
