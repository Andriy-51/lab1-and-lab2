const { roundRobinGenerator } = require("./generators/roundRobinGenerator");
const { consumeIteratorWithTimeout } = require("./consumers/consumeIteratorWithTimeout");

module.exports = {
  roundRobinGenerator,
  consumeIteratorWithTimeout
};
