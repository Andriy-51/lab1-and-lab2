class BiDirectionalPriorityQueue {
  constructor() {
    this.items = [];
  }

  get size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  enqueue(item, priority) {
    if (!Number.isFinite(priority)) {
      throw new Error("priority must be a finite number");
    }

    this.items.push({ item, priority });
    return item;
  }

  peek(mode = "highest") {
    const index = this._findIndex(mode);
    return index >= 0 ? this.items[index].item : undefined;
  }

  dequeue(mode = "highest") {
    const index = this._findIndex(mode);
    if (index < 0) {
      return undefined;
    }

    const [entry] = this.items.splice(index, 1);
    return entry.item;
  }

  _findIndex(mode) {
    if (this.items.length === 0) {
      return -1;
    }

    let chosenIndex = 0;
    const normalized = String(mode || "highest").toLowerCase();

    for (let index = 1; index < this.items.length; index += 1) {
      const current = this.items[index];
      const chosen = this.items[chosenIndex];

      if (normalized === "lowest") {
        if (current.priority < chosen.priority) {
          chosenIndex = index;
        }
      } else if (current.priority > chosen.priority) {
        chosenIndex = index;
      }
    }

    return chosenIndex;
  }
}

module.exports = {
  BiDirectionalPriorityQueue
};
