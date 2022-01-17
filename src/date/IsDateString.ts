export type IsDateString<T extends string> = Empty<T>;


// parse 1st character
// yyyy-mm-dd
// ^

type Empty<T extends string> =
   T extends `${'0' | '2' | '4' | '6' | '8'}${infer R}`
   ? FirstDigitEven<R>
   : T extends `${'1' | '3' | '5' | '7' | '9'}${infer R}`
   ? FirstDigitOdd<R>
   : false;


// parse 2nd character
// yyyy-mm-dd
//  ^

type FirstDigitEven<T extends string> =
   T extends `${'0' | '4' | '8'}${infer R}`
   ? CenturyDivisibleByFour<R>
   : T extends `${'1' | '2' | '3' | '5' | '6' | '7' | '9'}${infer R}`
   ? CenturyNotDivisibleByFour<R>
   : false;

type FirstDigitOdd<T extends string> =
   T extends `${'2' | '6'}${infer R}`
   ? CenturyDivisibleByFour<R>
   : T extends `${'0' | '1' | '3' | '4' | '5' | '7' | '8' | '9'}${infer R}`
   ? CenturyNotDivisibleByFour<R>
   : false;


// parse 3rd character
// yyyy-mm-dd
//   ^

type CenturyDivisibleByFour<T extends string> =
   T extends `${'0' | '2' | '4' | '6' | '8'}${infer R}`
   ? CenturyDivisibleByFourAndThirdDigitEven_or_CenturyNotDivisibleByFourAndThirdDigitEvenAndNotZero<R>
   : T extends `${'1' | '3' | '5' | '7' | '9'}${infer R}`
   ? ThirdDigitOdd<R>
   : false;

type CenturyNotDivisibleByFour<T extends string> =
   T extends `${'0'}${infer R}`
   ? CenturyNotDivisibleByFourAndThirdDigitZero<R>
   : T extends `${'1' | '3' | '5' | '7' | '9'}${infer R}`
   ? ThirdDigitOdd<R>
   : T extends `${'2' | '4' | '6' | '8'}${infer R}`
   ? CenturyDivisibleByFourAndThirdDigitEven_or_CenturyNotDivisibleByFourAndThirdDigitEvenAndNotZero<R>
   : false;


// parse 4th character
// yyyy-mm-dd
//    ^

type CenturyDivisibleByFourAndThirdDigitEven_or_CenturyNotDivisibleByFourAndThirdDigitEvenAndNotZero<T extends string> =
   T extends `${'0' | '4' | '8'}${infer R}`
   ? LeapYear<R>
   : T extends `${'1' | '2' | '3' | '5' | '6' | '7' | '9'}${infer R}`
   ? NonLeapYear<R>
   : false;

type ThirdDigitOdd<T extends string> =
   T extends `${'2' | '6'}${infer R}`
   ? LeapYear<R>
   : T extends `${'0' | '1' | '3' | '4' | '5' | '7' | '8' | '9'}${infer R}`
   ? NonLeapYear<R>
   : false;

type CenturyNotDivisibleByFourAndThirdDigitZero<T extends string> =
   T extends `${'0' | '1' | '2' | '3' | '5' | '6' | '7' | '9'}${infer R}`
   ? NonLeapYear<R>
   : T extends `${'4' | '8'}${infer R}`
   ? LeapYear<R>
   : false;


// parse 5th character
// yyyy-mm-dd
//     ^

type LeapYear<T extends string> =
   T extends `${'-'}${infer R}`
   ? LeapYearWithDash<R>
   : false;

type NonLeapYear<T extends string> =
   T extends `${'-'}${infer R}`
   ? NonLeapYearWith<R>
   : false;


// parse 6th character
// yyyy-mm-dd
//      ^

type LeapYearWithDash<T extends string> =
   T extends `${'0'}${infer R}`
   ? LeapYearWithDashAndZero<R>
   : T extends `${'1'}${infer R}`
   ? YearWithDashAndOne<R>
   : false;

type NonLeapYearWith<T extends string> =
   T extends `${'0'}${infer R}`
   ? NonLeapYearWithAndZero<R>
   : T extends `${'1'}${infer R}`
   ? YearWithDashAndOne<R>
   : false;


// parse 7th character
// yyyy-mm-dd
//       ^

type LeapYearWithDashAndZero<T extends string> =
   T extends `${'1' | '3' | '5' | '7' | '8'}${infer R}`
   ? YearAndMonth31<R>
   : T extends `${'2'}${infer R}`
   ? YearAndMonth29<R>
   : T extends `${'4' | '6' | '9'}${infer R}`
   ? YearAndMonth30<R>
   : false;

type NonLeapYearWithAndZero<T extends string> =
   T extends `${'1' | '3' | '5' | '7' | '8'}${infer R}`
   ? YearAndMonth31<R>
   : T extends `${'2'}${infer R}`
   ? YearAndMonth28<R>
   : T extends `${'4' | '6' | '9'}${infer R}`
   ? YearAndMonth30<R>
   : false;

type YearWithDashAndOne<T extends string> =
   T extends `${'0' | '2'}${infer R}`
   ? YearAndMonth31<R>
   : T extends `${'1'}${infer R}`
   ? YearAndMonth30<R>
   : false;


// parse 8th character
// yyyy-mm-dd
//        ^

type YearAndMonth28<T extends string> =
   T extends `${'-'}${infer R}`
   ? YearAndMonth28WithDash<R>
   : false;

type YearAndMonth29<T extends string> =
   T extends `${'-'}${infer R}`
   ? YearAndMonth29WithDash<R>
   : false;

type YearAndMonth30<T extends string> =
   T extends `${'-'}${infer R}`
   ? YearAndMonth30WithDash<R>
   : false;

type YearAndMonth31<T extends string> =
   T extends `${'-'}${infer R}`
   ? YearAndMonth31WithDash<R>
   : false;


// parse 9th character
// yyyy-mm-dd
//         ^

type YearAndMonth28WithDash<T extends string> =
   T extends `${'0'}${infer R}`
   ? Expect1to9<R>
   : T extends `${'1'}${infer R}`
   ? Expect0to9<R>
   : T extends `${'2'}${infer R}`
   ? Expect0to8<R>
   : false;

type YearAndMonth29WithDash<T extends string> =
   T extends `${'0'}${infer R}`
   ? Expect1to9<R>
   : T extends `${'1' | '2'}${infer R}`
   ? Expect0to9<R>
   : false;

type YearAndMonth30WithDash<T extends string> =
   T extends `${'0'}${infer R}`
   ? Expect1to9<R>
   : T extends `${'1' | '2'}${infer R}`
   ? Expect0to9<R>
   : T extends `${'3'}${infer R}`
   ? Expect0<R>
   : false;

type YearAndMonth31WithDash<T extends string> =
   T extends `${'0'}${infer R}`
   ? Expect1to9<R>
   : T extends `${'1' | '2'}${infer R}`
   ? Expect0to9<R>
   : T extends `${'3'}${infer R}`
   ? Expect0to1<R>
   : false;


// parse 10th character
// yyyy-mm-dd
//          ^

type Expect0to8<T extends string> =
   T extends `${'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'}${infer R}`
   ? ValidDate<R>
   : false;

type Expect1to9<T extends string> =
   T extends `${'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'}${infer R}`
   ? ValidDate<R>
   : false;

type Expect0to9<T extends string> =
   T extends `${'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'}${infer R}`
   ? ValidDate<R>
   : false;

type Expect0<T extends string> =
   T extends `${'0'}${infer R}`
   ? ValidDate<R>
   : false;

type Expect0to1<T extends string> =
   T extends `${'0' | '1'}${infer R}`
   ? ValidDate<R>
   : false;


// ensure there's no 11th character
// yyyy-mm-dd
//           ^

type ValidDate<T extends string> =
   T extends ''
   ? true
   : false;
