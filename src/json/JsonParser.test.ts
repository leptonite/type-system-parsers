import { EqualTypes } from '../EqualTypes';
import { BooleanLiteral, CloseBrace, Colon, JsonLexerError, NumberLiteral, StringLiteral } from './JsonLexer';
import { JsonParser, ParseError } from './JsonParser';


{ const test: EqualTypes<JsonParser<'null'>, null> = true; }
{ const test: EqualTypes<JsonParser<'true'>, boolean> = true; }
{ const test: EqualTypes<JsonParser<'0'>, number> = true; }
{ const test: EqualTypes<JsonParser<'""'>, string> = true; }

{ const test: EqualTypes<JsonParser<'[]'>, Array<never>> = true; }
{ const test: EqualTypes<JsonParser<'[1]'>, Array<number>> = true; }
{ const test: EqualTypes<JsonParser<'[1, "one"]'>, Array<number | string>> = true; }

{ const test: EqualTypes<JsonParser<'{}'>, {}> = true; }
{ const test: EqualTypes<JsonParser<'{ "n": 1 }'>, { n: number }> = true; }
{ const test: EqualTypes<JsonParser<'{ "n": 1, "s": "one" }'>, { n: number, s: string }> = true; }

{
    type ParserResult = JsonParser<`
        {
            "null": null,
            "true": true,
            "false": false,
            "zero": 0,
            "minusPi": -3.141529,
            "emptyString": "",
            "foo": "bar",
            "emptyList": [],
            "numberList": [1, 2],
            "booleanOrStringList": ["one", true],
            "emptyObject": {},
            "user": {
                "id": 42,
                "name": "Daniel"
            }
        }
    `>;

    type Expected = {
        null: null,
        true: boolean,
        false: boolean,
        zero: number,
        minusPi: number,
        emptyString: string,
        foo: string,
        emptyList: Array<never>,
        numberList: Array<number>,
        booleanOrStringList: Array<boolean | string>,
        emptyObject: {},
        user: {
            id: number,
            name: string,
        },
    };

    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`}`>;
    type Expected = ParseError<'value expected', [CloseBrace]>;
    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`@@`>;
    type Expected = ParseError<'value expected', [JsonLexerError<'@@'>]>;
    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`[`>;
    type Expected = ParseError<'] or value expected', []>;
    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`[1`>;
    type Expected = ParseError<'] or , expected', []>;
    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`[1,`>;
    type Expected = ParseError<'value expected', []>;
    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`{`>;
    type Expected = ParseError<'} or object key expected', []>;
    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`{true`>;
    type Expected = ParseError<'object key expected', [BooleanLiteral<true>]>;
    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`{"a"`>;
    type Expected = ParseError<': expected', []>;
    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`{"a":`>;
    type Expected = ParseError<'value expected', []>;
    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`{"a":1`>;
    type Expected = ParseError<'} or , expected', []>;
    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`{"a":1,`>;
    type Expected = ParseError<'object key expected', []>;
    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`{"a":1,2`>;
    type Expected = ParseError<'object key expected', [NumberLiteral<'2'>]>;
    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`{"a":1,"b"`>;
    type Expected = ParseError<': expected', []>;
    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`{"a":1,"b":`>;
    type Expected = ParseError<'value expected', []>;
    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`{"a":1,"b":2`>;
    type Expected = ParseError<'} or , expected', []>;
    const test: EqualTypes<ParserResult, Expected> = true;
}

// Uncomment the next test if you changed the parser to report errors on duplicate keys.
/*
{
    type ParserResult = JsonParser<`{"a":1,"a": 2}`>;
    type Expected = ParseError<'duplicate key a', [StringLiteral<'a'>, Colon, NumberLiteral<'2'>, CloseBrace]>;
    const test: EqualTypes<ParserResult, Expected> = true;
}
*/

// Comment out the next two tests if you changed the parser to report errors on duplicate keys.
{
    type ParserResult = JsonParser<`{"a":1,"a": 2}`>;
    type Expected = { "a": number };
    const test: EqualTypes<ParserResult, Expected> = true;
}

{
    type ParserResult = JsonParser<`{"a":1,"a": true}`>;
    type Expected = { "a": number | boolean };
    const test: EqualTypes<ParserResult, Expected> = true;
}
