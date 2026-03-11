const {
  roundRobinGenerator,
  consumeIteratorWithTimeout
} = require("lab2-library");

const sports = [
  "Football",
  "Basketball",
  "Tennis",
  "Volleyball",
  "Swimming",
  "Cycling",
  "Boxing"
];

console.log("Example 1: roundRobinGenerator");
const generator = roundRobinGenerator(sports);
for (let i = 1; i <= 8; i += 1) {
  console.log(`Step ${i}: ${generator.next().value}`);
}

console.log("\nExample 2: consumeIteratorWithTimeout");
const summary = consumeIteratorWithTimeout(
  roundRobinGenerator(sports),
  2,
  (sport, iteration) => {
    console.log(`Iteration #${iteration}: ${sport}`);
  }
);

console.log(
  `\nSummary: ${summary.iterationCount} iterations in ${summary.elapsedSeconds.toFixed(2)} seconds.`
);
