const { roundRobinGenerator, consumeIteratorWithTimeout } = require("./src");

const sports = [
    "Футбол",
    "Баскетбол",
    "Теніс",
    "Волейбол",
    "Плавання",
    "Велоспорт",
    "Бокс"
];

console.log("Task 1 demo using the split library modules");

const sportsGenerator = roundRobinGenerator(sports);

function processSport(sport, iteration) {
    const timestamp = new Date().toLocaleTimeString('uk-UA');
    console.log(`[${timestamp}] Ітерація #${iteration}: ${sport}`);
}

const summary = consumeIteratorWithTimeout(sportsGenerator, 3, processSport);
console.log(`\nSummary: ${summary.iterationCount} iterations, ${summary.elapsedSeconds.toFixed(2)}s elapsed.`);
