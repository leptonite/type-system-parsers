Type system parsers
===================

In TypeScript we have [Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types), [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types), [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html), [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) and [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html).

**This allows us to build parsers within TypeScript’s type system!**

This repository provides a date validator and a JSON parser that are implemented completely within TypeScript’s type system.


Date validator
--------------

[src/date/IsDateString.ts](src/date/IsDateString.ts) defines the type `IsDateString<T>` which equals to type `true` if `T` is a string literal type of a valid date in format `yyyy-mm-dd`:

```typescript
type T1 = IsDateString<'2022-01-16'>; // true
type T2 = IsDateString<'2022-02-35'>; // false
type T3 = IsDateString<'2024-02-29'>; // true, supports leap years
type T4 = IsDateString<'2023-02-29'>; // false
type T5 = IsDateString<'2022-01-01' | '2022-12-31'>; // true, every alternative is valid
type T6 = IsDateString<'2022-01-00' | '2022-12-32'>; // false, every alternative is invalid
type T7 = IsDateString<'2022-01-01' | '2022-12-32'>; // boolean, there are both valid and invalid alternatives
```


### How it works

1. Build a [deterministic finite-state machine](https://en.wikipedia.org/wiki/Deterministic_finite_automaton) which accepts a valid date:

   ![deterministic finite-state machine which accepts a valid date](doc/date-dfsm.drawio.svg)

2. For each state define a type with a type variable that takes the rest of the input string. The implicit error state is represented by the type `false`. The state “1st digit even” for example looks like this:

   ```typescript
   type FirstDigitEven<T extends string> =
      T extends `${'0' | '4' | '8'}${infer R}`
      ? CenturyDivisibleByFour<R>
      : T extends `${'1' | '2' | '3' | '5' | '6' | '7' | '9'}${infer R}`
      ? CenturyNotDivisibleByFour<R>
      : false;
   ```

3. `IsDateString` is just the initial state:

   ```typescript
   export type IsDateString<T extends string> = Empty<T>;
   ```

4. Write unit tests, e. g.:

   ```typescript
   { const test: EqualTypes<IsDateString<'2022-01-01'>, true> = true; }
   { const test: EqualTypes<IsDateString<'2022-01-00'>, false> = true; }
   ```


JSON parser
-----------

[src/json/JsonParser.ts](src/json/JsonParser.ts) defines the type `JsonParser<T>` which implements a JSON parser. You may have a look at [src/json/JsonParser.test.ts](src/json/JsonParser.test.ts) to see how to use it.

TODO: describe how it works
