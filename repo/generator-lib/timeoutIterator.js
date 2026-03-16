/**
 * consumeWithTimeout
 * Consumes values from a synchronous iterator until timeoutSeconds elapses.
 * Prints each value and the running average of values seen so far.
 * Returns a summary object.
 *
 * @param {Iterator} iterator - synchronous iterator (e.g., generator)
 * @param {number} timeoutSeconds - duration in seconds to consume
 */
function _tick() {
  // allow other events to run to avoid blocking the event loop
  return new Promise((resolve) => setImmediate(resolve));
}

async function consumeWithTimeout(iterator, timeoutSeconds) {
  if (typeof iterator?.next !== 'function') {
    throw new TypeError('iterator must be an iterator with next()');
  }
  if (!Number.isFinite(timeoutSeconds) || timeoutSeconds <= 0) {
    throw new RangeError('timeoutSeconds must be a positive number');
  }

  const start = Date.now();
  const end = start + timeoutSeconds * 1000;
  let count = 0;
  let sum = 0;

  console.log(`\nStarting consumption for ${timeoutSeconds} seconds...`);

  while (Date.now() < end) {
    const { value, done } = iterator.next();
    if (done) {
      console.log('Iterator finished early.');
      break;
    }

    const num = Number(value);
    count += 1;
    sum += Number.isFinite(num) ? num : 0;
    const avg = sum / count;

    console.log(`Value #${count}: ${value} | Running average: ${avg.toFixed(2)}`);

    // yield to event loop briefly to avoid blocking
    await _tick();
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(2);
  const finalAvg = count ? (sum / count) : null;

  console.log('\nConsumption finished.');
  console.log(`Iterations: ${count}, Elapsed: ${elapsed}s, Final average: ${finalAvg === null ? 'N/A' : finalAvg.toFixed(2)}`);

  return { iterations: count, elapsed: Number(elapsed), average: finalAvg };
}

module.exports = { consumeWithTimeout };
