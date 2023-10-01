type ObjectType = {
  [key: string]: any;
};

const pick = (object: ObjectType, keys: string[]): ObjectType => {
  return keys.reduce((obj: ObjectType, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export default pick;
