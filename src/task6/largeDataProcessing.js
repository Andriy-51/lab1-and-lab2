function toAsyncIterable(source) {
  if (source && typeof source[Symbol.asyncIterator] === "function") {
    return source;
  }

  if (source && typeof source[Symbol.iterator] === "function") {
    return (async function* () {
      yield* source;
    })();
  }

  throw new Error("source must be an iterable or async iterable");
}

async function* chunkAsyncIterable(source, chunkSize = 1000) {
  if (!Number.isFinite(chunkSize) || chunkSize < 1) {
    throw new Error("chunkSize must be at least 1");
  }

  const buffer = [];

  for await (const item of toAsyncIterable(source)) {
    buffer.push(item);

    if (buffer.length >= chunkSize) {
      yield buffer.splice(0, buffer.length);
    }
  }

  if (buffer.length > 0) {
    yield buffer;
  }
}

async function processLargeData(source, processor, options = {}) {
  if (typeof processor !== "function") {
    throw new Error("processor must be a function");
  }

  const signal = options.signal;
  let count = 0;

  if (signal && signal.aborted) {
    throw new Error("The operation was aborted");
  }

  for await (const item of toAsyncIterable(source)) {
    if (signal && signal.aborted) {
      throw new Error("The operation was aborted");
    }

    await processor(item, count);
    count += 1;
  }

  return count;
}

module.exports = {
  chunkAsyncIterable,
  processLargeData
};
