# labaa-lib

Library extracted from Task 1.

Usage:

1. Install dependencies (none required for this simple lib):

```bash
npm install
```

2. Run example:

```bash
npm run test
```

API:

- `roundRobinGenerator(list)` — generator that yields elements in round-robin.
- `consumeIteratorWithTimeout(iterator, timeoutSeconds, processingCallback, intervalMs)` — asynchronously consumes iterator for given timeout, calling callback on each item.
