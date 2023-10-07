### Differnce B/w Promise and Observable

// 1) Observables can return multiple values over time, and promises simply return a single value.

```JS
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
```

// 2) Observables are not executed until we subscribe to them using the subscribe() method, and they can emit multiple events.

```JS
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

```

### 2-Types of Observable

1. Cold (unicast): one Observer per Producer (Regular Observables are Cold & Unicast)
2. Hot (multicast): multiple Observers per Producer (Subject & BehaviourSubject)

#### 2-Types of Hot Observable

##### 1. Subject

- When you subscribe to a Subject you will only see new events, not anything that happened in the past. It sends data only to subscribed observers, any previously emitted data is not sent to new observers. You can only react to things you were paying attention to (subscribed to).
- No initial value.
- you can feed values to the stream by calling the method next(). subject$.next(‘Hello World’);

```JS
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

// Observer 1 received: Hello World
// Observer 1 received: Hi there
// Observer 2 received: Hi there
```

##### 2. Behaviour Subjects

- Behaviour Subject receives the last emitted/latest value at subscription. This feature makes it useful for storing data in a service to share across your app.
- It is necessary to pass the initial value. const behaviorSubject$ = new BehaviorSubject("Hello World");
- If there is no latest value, then it emits the initial value.

```JS
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

// Output (since there's an initial value):
// Observer 1 received: Hello World
// Observer 2 received: Hello World

// Change the value of the BehaviorSubject
behaviorSubject$.next("Hi there");

// Output:
// Observer 1 received: Hi there
// Observer 2 received: Hi there
```

##### usage of getValue inside BehaviourSubject

```JS
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

// Output:
// Observer 1 received: Hello World
// Observer 1 received: Hi there
// Observer 2 received: Hi there
// Observer 2 got the latest value via getValue: Hi there
```

### Credits

1. https://javascript.plainenglish.io/eli5-observables-vs-subjects-vs-behavior-subjects-f2494f14813d
