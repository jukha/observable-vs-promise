// 1) Observables can return multiple values over time, and promises simply return a single value.

// ============= OBSERVABLE =============
const observable = Rx.Observable.of("First Value", "Second Value");

observable.subscribe((value) => {
  console.log(value);
});

// ============= PROMISE =============
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("First Value");
  }, 1000);
  setTimeout(() => {
    // This will not be returned, as the Promise can only resolve once
    resolve("Second Value");
  }, 2000);
});

promise.then((value) => {
  console.log(value);
});

// 2) Observables are not executed until we subscribe to them using the subscribe() method, and they can emit multiple events.

// ============= OBSERVABLE =============
const observable2 = new Rx.Observable((observer) => {
  console.log("Observable execution started");
  observer.next("First event");
  setTimeout(() => {
    observer.next("Second event"); // Emitting the second event after a delay
  }, 1000);
});

observable2.subscribe((value) => {
  console.log(value); // Output: First event
});

// ============= PROMISE =============

const promise2 = new Promise((resolve, reject) => {
  console.log("Promise execution started");
  resolve("Resolved value"); // Resolving the promise
});

promise2.then((value) => {
  console.log(value); // Output: Resolved value
});
