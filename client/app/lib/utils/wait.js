export default function wait(fn, args) {
  return new Promise(resolve => {
    setTimeout(() => resolve(fn(args)), 1000)
  });
}
