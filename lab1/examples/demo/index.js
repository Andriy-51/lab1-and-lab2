const { roundRobinGenerator, consumeIteratorWithTimeout } = require('labaa-lib');

const items = ['Яблуко', 'Банан', 'Апельсин', 'Виноград'];

const gen = roundRobinGenerator(items);

function printItem(item, i) {
  const ts = new Date().toLocaleTimeString('uk-UA');
  console.log(`[${ts}] Ітерація #${i}: ${item}`);
}

(async () => {
  const result = await consumeIteratorWithTimeout(gen, 5, printItem, 1500);
  console.log('\nDemo finished:', result);
})();
