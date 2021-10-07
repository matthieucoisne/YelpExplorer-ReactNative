export const groupBy = <S, T>(values: S[], keyGetter: (element: S) => T) => {
  const map = new Map<T, S[]>();
  values.forEach(element => {
    const key = keyGetter(element);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [element]);
    } else {
      collection.push(element);
    }
  });
  return map;
};
