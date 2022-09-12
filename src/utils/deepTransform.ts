import _ from 'lodash';
import { snakeToCamel } from './snakeToCamel';

type Key = string | number | symbol;
type Iterator = (key: Key, value: unknown) => [Key, unknown];

const defaultIterator: Iterator = (key, value) => [snakeToCamel(key), value];

// https://stackoverflow.com/questions/63801052/deep-map-transform-js-object-with-ability-to-alter-keys-and-values
export function deepTransform(obj: object, iterator: Iterator = defaultIterator) {
  return _.transform(
    obj,
    (acc, val, key) => {
      const [k, v] = iterator(key, val); // use the iterator and get a pair of key and value

      if (_.isUndefined(k)) return; // skip if no updated key

      // set the updated key and value, and if the value is an object iterate it as well
      // @ts-expect-error
      acc[k] = _.isObject(v) ? deepTransform(v, iterator) : v;
    },
    {}
  );
}
