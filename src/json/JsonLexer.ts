export type JsonLexer<S extends string> = Empty<[], S>;

export type NullLiteral = { type: 'NullLiteral' };
export type BooleanLiteral<V extends boolean> = { type: 'BooleanLiteral', value: V };
export type NumberLiteral<V extends string> = { type: 'NumberLiteral', value: V };
export type StringLiteral<V extends string> = { type: 'StringLiteral', value: V };
export type OpenBracket = { type: 'OpenBracket' };
export type CloseBracket = { type: 'CloseBracket' };
export type OpenBrace = { type: 'OpenBrace' };
export type CloseBrace = { type: 'CloseBrace' };
export type Comma = { type: 'Comma' };
export type Colon = { type: 'Colon' };
export type JsonLexerError<M extends string> = { type: 'Error', message: M };

export type Token = NullLiteral | BooleanLiteral<boolean> | NumberLiteral<string> | StringLiteral<string> | OpenBracket | CloseBracket | OpenBrace | CloseBrace | Comma | Colon | JsonLexerError<string>;

export type TokenList = Array<Token>;

type WhitespaceCharacter = ' ' | '\r' | '\n' | '\t';
type WordDelimitingCharacter = WhitespaceCharacter | '[' | ']' | '{' | '}' | ',' | ':' | '"' | '-' | '.';

type Empty<TL extends TokenList, T extends string> =
   T extends `${WhitespaceCharacter}${infer R}` ? Empty<TL, R> :
   T extends `null${infer R}` ? ExpectEndOfReservedWord<TL, NullLiteral, R> :
   T extends `true${infer R}` ? ExpectEndOfReservedWord<TL, BooleanLiteral<true>, R> :
   T extends `false${infer R}` ? ExpectEndOfReservedWord<TL, BooleanLiteral<false>, R> :
   T extends `[${infer R}` ? Empty<[...TL, OpenBracket], R> :
   T extends `]${infer R}` ? Empty<[...TL, CloseBracket], R> :
   T extends `{${infer R}` ? Empty<[...TL, OpenBrace], R> :
   T extends `}${infer R}` ? Empty<[...TL, CloseBrace], R> :
   T extends `,${infer R}` ? Empty<[...TL, Comma], R> :
   T extends `:${infer R}` ? Empty<[...TL, Colon], R> :
   T extends `"${infer R}` ? WithinStringLiteral<TL, '', R> :
   T extends `-${infer R}` ? NumberMinus<TL, '-', R> :
   T extends `0${infer R}` ? NumberZero<TL, '0', R> :
   T extends `1${infer R}` ? NumberNonZero<TL, '1', R> :
   T extends `2${infer R}` ? NumberNonZero<TL, '2', R> :
   T extends `3${infer R}` ? NumberNonZero<TL, '3', R> :
   T extends `4${infer R}` ? NumberNonZero<TL, '4', R> :
   T extends `5${infer R}` ? NumberNonZero<TL, '5', R> :
   T extends `6${infer R}` ? NumberNonZero<TL, '6', R> :
   T extends `7${infer R}` ? NumberNonZero<TL, '7', R> :
   T extends `8${infer R}` ? NumberNonZero<TL, '8', R> :
   T extends `9${infer R}` ? NumberNonZero<TL, '9', R> :
   T extends '' ? TL :
   [...TL, JsonLexerError<T>];

type ExpectEndOfReservedWord<TL extends TokenList, RWT extends Token, T extends string> =
   T extends '' ? [...TL, RWT] :
   T extends `${WordDelimitingCharacter}${string}` ? Empty<[...TL, RWT], T> :
   [...TL, JsonLexerError<T>];

type NumberMinus<TL extends TokenList, S extends string, T extends string> =
   T extends `0${infer R}` ? NumberZero<TL, `${S}0`, R> :
   T extends `1${infer R}` ? NumberNonZero<TL, `${S}1`, R> :
   T extends `2${infer R}` ? NumberNonZero<TL, `${S}2`, R> :
   T extends `3${infer R}` ? NumberNonZero<TL, `${S}3`, R> :
   T extends `4${infer R}` ? NumberNonZero<TL, `${S}4`, R> :
   T extends `5${infer R}` ? NumberNonZero<TL, `${S}5`, R> :
   T extends `6${infer R}` ? NumberNonZero<TL, `${S}6`, R> :
   T extends `7${infer R}` ? NumberNonZero<TL, `${S}7`, R> :
   T extends `8${infer R}` ? NumberNonZero<TL, `${S}8`, R> :
   T extends `9${infer R}` ? NumberNonZero<TL, `${S}9`, R> :
   [...TL, JsonLexerError<T>];

type NumberZero<TL extends TokenList, S extends string, T extends string> =
   T extends `.${infer R}` ? NumberPeriod<TL, `${S}.`, R> :
   T extends `e${infer R}` ? NumberExp<TL, `${S}e`, R> :
   T extends `E${infer R}` ? NumberExp<TL, `${S}E`, R> :
   Empty<[...TL, NumberLiteral<S>], T>;

type NumberNonZero<TL extends TokenList, S extends string, T extends string> =
   T extends `.${infer R}` ? NumberPeriod<TL, `${S}.`, R> :
   T extends `0${infer R}` ? NumberNonZero<TL, `${S}0`, R> :
   T extends `1${infer R}` ? NumberNonZero<TL, `${S}1`, R> :
   T extends `2${infer R}` ? NumberNonZero<TL, `${S}2`, R> :
   T extends `3${infer R}` ? NumberNonZero<TL, `${S}3`, R> :
   T extends `4${infer R}` ? NumberNonZero<TL, `${S}4`, R> :
   T extends `5${infer R}` ? NumberNonZero<TL, `${S}5`, R> :
   T extends `6${infer R}` ? NumberNonZero<TL, `${S}6`, R> :
   T extends `7${infer R}` ? NumberNonZero<TL, `${S}7`, R> :
   T extends `8${infer R}` ? NumberNonZero<TL, `${S}8`, R> :
   T extends `9${infer R}` ? NumberNonZero<TL, `${S}9`, R> :
   T extends `e${infer R}` ? NumberExp<TL, `${S}e`, R> :
   T extends `E${infer R}` ? NumberExp<TL, `${S}E`, R> :
   Empty<[...TL, NumberLiteral<S>], T>;

type NumberPeriod<TL extends TokenList, S extends string, T extends string> =
   T extends `0${infer R}` ? NumberPeriodNumber<TL, `${S}0`, R> :
   T extends `1${infer R}` ? NumberPeriodNumber<TL, `${S}1`, R> :
   T extends `2${infer R}` ? NumberPeriodNumber<TL, `${S}2`, R> :
   T extends `3${infer R}` ? NumberPeriodNumber<TL, `${S}3`, R> :
   T extends `4${infer R}` ? NumberPeriodNumber<TL, `${S}4`, R> :
   T extends `5${infer R}` ? NumberPeriodNumber<TL, `${S}5`, R> :
   T extends `6${infer R}` ? NumberPeriodNumber<TL, `${S}6`, R> :
   T extends `7${infer R}` ? NumberPeriodNumber<TL, `${S}7`, R> :
   T extends `8${infer R}` ? NumberPeriodNumber<TL, `${S}8`, R> :
   T extends `9${infer R}` ? NumberPeriodNumber<TL, `${S}9`, R> :
   [...TL, JsonLexerError<T>];

type NumberPeriodNumber<TL extends TokenList, S extends string, T extends string> =
   T extends `0${infer R}` ? NumberPeriodNumber<TL, `${S}0`, R> :
   T extends `1${infer R}` ? NumberPeriodNumber<TL, `${S}1`, R> :
   T extends `2${infer R}` ? NumberPeriodNumber<TL, `${S}2`, R> :
   T extends `3${infer R}` ? NumberPeriodNumber<TL, `${S}3`, R> :
   T extends `4${infer R}` ? NumberPeriodNumber<TL, `${S}4`, R> :
   T extends `5${infer R}` ? NumberPeriodNumber<TL, `${S}5`, R> :
   T extends `6${infer R}` ? NumberPeriodNumber<TL, `${S}6`, R> :
   T extends `7${infer R}` ? NumberPeriodNumber<TL, `${S}7`, R> :
   T extends `8${infer R}` ? NumberPeriodNumber<TL, `${S}8`, R> :
   T extends `9${infer R}` ? NumberPeriodNumber<TL, `${S}9`, R> :
   T extends `e${infer R}` ? NumberExp<TL, `${S}e`, R> :
   T extends `E${infer R}` ? NumberExp<TL, `${S}E`, R> :
   Empty<[...TL, NumberLiteral<S>], T>;

type NumberExp<TL extends TokenList, S extends string, T extends string> =
   T extends `+${infer R}` ? NumberExpSign<TL, `${S}+`, R> :
   T extends `-${infer R}` ? NumberExpSign<TL, `${S}-`, R> :
   T extends `0${infer R}` ? NumberExpNumber<TL, `${S}0`, R> :
   T extends `1${infer R}` ? NumberExpNumber<TL, `${S}1`, R> :
   T extends `2${infer R}` ? NumberExpNumber<TL, `${S}2`, R> :
   T extends `3${infer R}` ? NumberExpNumber<TL, `${S}3`, R> :
   T extends `4${infer R}` ? NumberExpNumber<TL, `${S}4`, R> :
   T extends `5${infer R}` ? NumberExpNumber<TL, `${S}5`, R> :
   T extends `6${infer R}` ? NumberExpNumber<TL, `${S}6`, R> :
   T extends `7${infer R}` ? NumberExpNumber<TL, `${S}7`, R> :
   T extends `8${infer R}` ? NumberExpNumber<TL, `${S}8`, R> :
   T extends `9${infer R}` ? NumberExpNumber<TL, `${S}9`, R> :
   [...TL, JsonLexerError<T>];

type NumberExpSign<TL extends TokenList, S extends string, T extends string> =
   T extends `0${infer R}` ? NumberExpNumber<TL, `${S}0`, R> :
   T extends `1${infer R}` ? NumberExpNumber<TL, `${S}1`, R> :
   T extends `2${infer R}` ? NumberExpNumber<TL, `${S}2`, R> :
   T extends `3${infer R}` ? NumberExpNumber<TL, `${S}3`, R> :
   T extends `4${infer R}` ? NumberExpNumber<TL, `${S}4`, R> :
   T extends `5${infer R}` ? NumberExpNumber<TL, `${S}5`, R> :
   T extends `6${infer R}` ? NumberExpNumber<TL, `${S}6`, R> :
   T extends `7${infer R}` ? NumberExpNumber<TL, `${S}7`, R> :
   T extends `8${infer R}` ? NumberExpNumber<TL, `${S}8`, R> :
   T extends `9${infer R}` ? NumberExpNumber<TL, `${S}9`, R> :
   [...TL, JsonLexerError<T>];

type NumberExpNumber<TL extends TokenList, S extends string, T extends string> =
   T extends `0${infer R}` ? NumberExpNumber<TL, `${S}0`, R> :
   T extends `1${infer R}` ? NumberExpNumber<TL, `${S}1`, R> :
   T extends `2${infer R}` ? NumberExpNumber<TL, `${S}2`, R> :
   T extends `3${infer R}` ? NumberExpNumber<TL, `${S}3`, R> :
   T extends `4${infer R}` ? NumberExpNumber<TL, `${S}4`, R> :
   T extends `5${infer R}` ? NumberExpNumber<TL, `${S}5`, R> :
   T extends `6${infer R}` ? NumberExpNumber<TL, `${S}6`, R> :
   T extends `7${infer R}` ? NumberExpNumber<TL, `${S}7`, R> :
   T extends `8${infer R}` ? NumberExpNumber<TL, `${S}8`, R> :
   T extends `9${infer R}` ? NumberExpNumber<TL, `${S}9`, R> :
   Empty<[...TL, NumberLiteral<S>], T>;

type WithinStringLiteral<TL extends TokenList, S extends string, T extends string> =
   T extends `"${infer R}` ? Empty<[...TL, StringLiteral<S>], R> :
   T extends `\\"${infer R}` ? WithinStringLiteral<TL, `${S}"`, R> :
   T extends `\\\\${infer R}` ? WithinStringLiteral<TL, `${S}\\`, R> :
   T extends `\\/${infer R}` ? WithinStringLiteral<TL, `${S}/`, R> :
   T extends `\\b${infer R}` ? WithinStringLiteral<TL, `${S}\b`, R> :
   T extends `\\f${infer R}` ? WithinStringLiteral<TL, `${S}\f`, R> :
   T extends `\\n${infer R}` ? WithinStringLiteral<TL, `${S}\n`, R> :
   T extends `\\r${infer R}` ? WithinStringLiteral<TL, `${S}\r`, R> :
   T extends `\\t${infer R}` ? WithinStringLiteral<TL, `${S}\t`, R> :
   T extends `\\t${infer R}` ? WithinStringLiteral<TL, `${S}\t`, R> :
   T extends `\\${string}` ? [...TL, JsonLexerError<`illegal or unsupported escape sequence: ${T}`>] :
   T extends `${infer F}${infer R}` ? WithinStringLiteral<TL, `${S}${F}`, R> :
   [...TL, JsonLexerError<'unfinished string literal'>];
