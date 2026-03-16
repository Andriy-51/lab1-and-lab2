/**
 * randomNumberGenerator
 * Generator that yields random integers indefinitely.
 * @param {number} [min=0] - inclusive minimum
 * @param {number} [max=100] - inclusive maximum
 */
function* randomNumberGenerator(min = 0, max = 100) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new TypeError('min and max must be numbers');
  }
  if (max < min) {
    throw new RangeError('max must be >= min');
  }

  while (true) {
    // produce a random integer in [min, max]
    const value = Math.floor(Math.random() * (max - min + 1)) + min;
    yield value;
  }
}

module.exports = { randomNumberGenerator };
