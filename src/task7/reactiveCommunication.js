class ReactiveEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(eventName, listener) {
    if (typeof listener !== "function") {
      throw new Error("listener must be a function");
    }

    const listeners = this.listeners.get(eventName) || [];
    listeners.push(listener);
    this.listeners.set(eventName, listeners);

    return () => this.off(eventName, listener);
  }

  off(eventName, listener) {
    const listeners = this.listeners.get(eventName);

    if (!listeners) {
      return false;
    }

    const nextListeners = listeners.filter((currentListener) => currentListener !== listener);

    if (nextListeners.length === 0) {
      this.listeners.delete(eventName);
    } else {
      this.listeners.set(eventName, nextListeners);
    }

    return nextListeners.length !== listeners.length;
  }

  emit(eventName, payload) {
    const listeners = [...(this.listeners.get(eventName) || [])];

    for (const listener of listeners) {
      listener(payload);
    }

    return listeners.length > 0;
  }

  subscribe(eventName, listener) {
    return this.on(eventName, listener);
  }

  unsubscribe(eventName, listener) {
    return this.off(eventName, listener);
  }
}

function createReactiveChannel() {
  return new ReactiveEmitter();
}

module.exports = {
  ReactiveEmitter,
  createReactiveChannel
};
