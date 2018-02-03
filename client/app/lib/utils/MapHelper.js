import Immutable from 'immutable';


export function take(map, keys) {
  return map.filter(keyIn(keys));
}

export function keyIn(keys) {
  var keySet = Immutable.Set(keys);
  return (v, k) => keySet.has(k);
}
