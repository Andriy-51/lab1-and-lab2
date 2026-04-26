class AbortError extends Error {
  constructor(message = "The operation was aborted") {
    super(message);
    this.name = "AbortError";
  }
}

function asyncMapCallback(items, mapper, callback, options = {}) {
  if (!Array.isArray(items)) {
    throw new Error("items must be an array");
  }

  if (typeof mapper !== "function") {
    throw new Error("mapper must be a function");
  }

  if (typeof callback !== "function") {
    throw new Error("callback must be a function");
  }

  const signal = options.signal;
  const delayMs = Number.isFinite(options.delayMs) && options.delayMs >= 0 ? options.delayMs : 0;
  const results = new Array(items.length);
  let index = 0;
  let settled = false;
  let timer = null;

  const cleanup = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }

    if (signal) {
      signal.removeEventListener("abort", onAbort);
    }
  };

  const finish = (error, value) => {
    if (settled) {
      return;
    }

    settled = true;
    cleanup();
    callback(error, value);
  };

  const onAbort = () => {
    finish(new AbortError());
  };

  if (signal && signal.aborted) {
    finish(new AbortError());
    return () => {};
  }

  if (signal) {
    signal.addEventListener("abort", onAbort, { once: true });
  }

  const advance = () => {
    if (settled) {
      return;
    }

    if (index >= items.length) {
      finish(null, results);
      return;
    }

    timer = setTimeout(() => {
      timer = null;

      if (settled) {
        return;
      }

      const currentIndex = index;
      const currentValue = items[currentIndex];

      try {
        mapper(currentValue, currentIndex, items, (error, mappedValue) => {
          if (settled) {
            return;
          }

          if (error) {
            finish(error);
            return;
          }

          results[currentIndex] = mappedValue;
          index = currentIndex + 1;
          advance();
        });
      } catch (error) {
        finish(error);
      }
    }, delayMs);
  };

  advance();

  return () => finish(new AbortError("Cancelled"));
}

module.exports = {
  AbortError,
  asyncMapCallback
};
