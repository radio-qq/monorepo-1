import lodash from "lodash";

export function isFunction(f: unknown) {
  return lodash.isFunction(f);
}

export function isPlainObject(o: unknown) {
  return lodash.isPlainObject(o);
}

export function isUndefined(o: unknown) {
  return lodash.isUndefined(o);
}

export function isArray(o: unknown) {
  return lodash.isArray(o);
}

export function isObject(o: unknown) {
  return lodash.isObject(o);
}

export function isString(o: unknown) {
  return lodash.isString(o);
}
