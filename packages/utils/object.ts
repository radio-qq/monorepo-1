import lodash from "lodash-es";

export function merge(f: unknown, j) {
  return lodash.merge(f, j);
}

export function cloneDeep(f: unknown) {
  return lodash.cloneDeep(f);
}

export function uniqBy<T>(f: T[], j) {
  return lodash.uniqBy(f, j);
}

export function mapObjectFields(obj: any, fieldPairs: string[]) {
  const newObj = { ...obj };

  for (const [newKey, originalKey] of Object.entries(fieldPairs)) {
    newObj[newKey] = obj[originalKey];
  }

  return newObj;
}

export function mapObjectArrayFields(array: any, fieldPairs: any) {
  if (!Array.isArray(array) || !Object.keys(fieldPairs).length) {
    return array;
  }

  return array.map((item) => mapObjectFields(item, fieldPairs));
}

export function getValue(o: any, j: any) {
  return lodash.get(o, j);
}

export function omit(o: any, j: any) {
  return lodash.omit(o, j);
}
