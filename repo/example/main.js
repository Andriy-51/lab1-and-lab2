const path = require('path');
// require the library relatively from project root
const { randomNumberGenerator, consumeWithTimeout } = require('../generator-lib');

// Example: generate random integers between 1 and 100 and consume for 5 seconds
const gen = randomNumberGenerator(1, 100);

(async function runExample() {
  try {
    const summary = await consumeWithTimeout(gen, 5);
    console.log('\nExample finished. Summary:', summary);
  } catch (err) {
    console.error('Error in example:', err);
  }
})();
