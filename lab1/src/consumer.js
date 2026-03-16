function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function consumeIteratorWithTimeout(iterator, timeoutSeconds, processingCallback, intervalMs = 1000) {
  const startTime = Date.now();
  const endTime = startTime + timeoutSeconds * 1000;
  let iterationCount = 0;

  while (Date.now() < endTime) {
    const result = iterator.next();
    if (result.done) break;

    iterationCount++;
    processingCallback(result.value, iterationCount);

    await sleep(intervalMs);
  }

  const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
  return { iterationCount, elapsedTime };
}

module.exports = { sleep, consumeIteratorWithTimeout };
