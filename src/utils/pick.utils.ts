import { Object } from "types";

const pick = (object: Object, keys: string[]): Object => {
  return keys.reduce((obj: Object, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export default pick;
