# Generators Lab

This repository contains a small Node.js library demonstrating Generators and Iterators.

Structure:

```
repo/
├── generator-lib/
│   ├── generators.js
│   ├── timeoutIterator.js
│   └── index.js
├── example/
│   └── main.js
├── package.json
├── .gitignore
├── LICENSE
└── README.md
```

Usage:

1. Run the example:

```bash
cd repo
npm install
npm start
```

Library API:

- `randomNumberGenerator(min = 0, max = 100)` — generator that yields random integers indefinitely.
- `consumeWithTimeout(iterator, timeoutSeconds)` — asynchronously consumes a synchronous iterator for the given timeout and prints each value and running average.

Author: Andriy-51
License: MIT
