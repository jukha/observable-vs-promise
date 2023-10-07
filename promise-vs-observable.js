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

// ============= SUBJECT =============

// Create a new Subject
const subject$ = new Rx.Subject();

// Subscribe to the Subject (Observer 1)
subject$.subscribe((value) => {
  console.log("Observer 1 received:", value);
});

// Feed a value to the stream
subject$.next("Hello World");

// Subscribe to the Subject (Observer 2)
subject$.subscribe((value) => {
  console.log("Observer 2 received:", value);
});

// Feed another value to the stream
subject$.next("Hi there");

// ============= BEHAVIOUR SUBJECT =============

// Create a new BehaviorSubject with an initial value
const behaviorSubject$ = new Rx.BehaviorSubject("Hello World");

// Subscribe to the BehaviorSubject (Observer 1)
behaviorSubject$.subscribe((value) => {
  console.log("Observer 1 received:", value);
});

// Subscribe to the BehaviorSubject (Observer 2)
behaviorSubject$.subscribe((value) => {
  console.log("Observer 2 received:", value);
});

// Change the value of the BehaviorSubject
behaviorSubject$.next("Hi there");

// getValue use in BehaviourSubject

// Create a new BehaviorSubject with an initial value
const behaviorSubject2$ = new Rx.BehaviorSubject("Hello World");

// Subscribe to the BehaviorSubject (Observer 1)
behaviorSubject2$.subscribe((value) => {
  console.log("Observer 1 received:", value);
});

// Change the value of the BehaviorSubject
behaviorSubject2$.next("Hi there");

// Subscribe to the BehaviorSubject again (Observer 2)
behaviorSubject2$.subscribe((value) => {
  console.log("Observer 2 received:", value);
  const latestValue = behaviorSubject$.getValue(); // Access the latest emitted value
  console.log("Observer 2 got the latest value via getValue:", latestValue);
});
