const { randomNumberGenerator } = require('./generators');
const { consumeWithTimeout } = require('./timeoutIterator');

module.exports = {
  randomNumberGenerator,
  consumeWithTimeout,
};
