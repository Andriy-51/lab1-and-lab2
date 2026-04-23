function memoize(fn, options = {}) {
  if (typeof fn !== "function") {
    throw new Error("memoize expects a function");
  }

  const cache = new Map();
  const keyResolver = typeof options.keyResolver === "function"
    ? options.keyResolver
    : (args) => JSON.stringify(args);

  const memoized = function memoizedFunction(...args) {
    const key = keyResolver(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const value = fn.apply(this, args);
    cache.set(key, value);
    return value;
  };

  memoized.cache = cache;
  memoized.clear = () => cache.clear();

  return memoized;
}

module.exports = {
  memoize
};
