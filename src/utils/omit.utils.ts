import { Object } from "types";

const omit = (obj: Object, keys: (string | number)[]): Object => {
  const returnObj: Object = {};
  for (const key in keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      returnObj[key] = obj[key];
      delete obj[key];
    }
  }
  return returnObj;
};

export default omit;
