import { EqualTypes } from '../EqualTypes';
import { BooleanLiteral, CloseBrace, CloseBracket, Colon, Comma, JsonLexerError, JsonLexer, NullLiteral, NumberLiteral, OpenBrace, OpenBracket, StringLiteral } from './JsonLexer';


{ const test: EqualTypes<JsonLexer<'null'>, [NullLiteral]> = true; }

{ const test: EqualTypes<JsonLexer<'true'>, [BooleanLiteral<true>]> = true; }
{ const test: EqualTypes<JsonLexer<'false'>, [BooleanLiteral<false>]> = true; }

{ const test: EqualTypes<JsonLexer<'0'>, [NumberLiteral<'0'>]> = true; }
{ const test: EqualTypes<JsonLexer<'1'>, [NumberLiteral<'1'>]> = true; }
{ const test: EqualTypes<JsonLexer<'1e1'>, [NumberLiteral<'1e1'>]> = true; }
{ const test: EqualTypes<JsonLexer<'1E1'>, [NumberLiteral<'1E1'>]> = true; }
{ const test: EqualTypes<JsonLexer<'1e+1'>, [NumberLiteral<'1e+1'>]> = true; }
{ const test: EqualTypes<JsonLexer<'1E+1'>, [NumberLiteral<'1E+1'>]> = true; }
{ const test: EqualTypes<JsonLexer<'1e-1'>, [NumberLiteral<'1e-1'>]> = true; }
{ const test: EqualTypes<JsonLexer<'1E-1'>, [NumberLiteral<'1E-1'>]> = true; }
{ const test: EqualTypes<JsonLexer<'1.1'>, [NumberLiteral<'1.1'>]> = true; }
{ const test: EqualTypes<JsonLexer<'1.1e1'>, [NumberLiteral<'1.1e1'>]> = true; }
{ const test: EqualTypes<JsonLexer<'1.1E1'>, [NumberLiteral<'1.1E1'>]> = true; }
{ const test: EqualTypes<JsonLexer<'1.1e+1'>, [NumberLiteral<'1.1e+1'>]> = true; }
{ const test: EqualTypes<JsonLexer<'1.1E+1'>, [NumberLiteral<'1.1E+1'>]> = true; }
{ const test: EqualTypes<JsonLexer<'1.1e-1'>, [NumberLiteral<'1.1e-1'>]> = true; }
{ const test: EqualTypes<JsonLexer<'1.1E-1'>, [NumberLiteral<'1.1E-1'>]> = true; }
{ const test: EqualTypes<JsonLexer<'123456789.0123456789e0123456789'>, [NumberLiteral<'123456789.0123456789e0123456789'>]> = true; }
{ const test: EqualTypes<JsonLexer<'123456789.0123456789e+0123456789'>, [NumberLiteral<'123456789.0123456789e+0123456789'>]> = true; }
{ const test: EqualTypes<JsonLexer<'123456789.0123456789e-0123456789'>, [NumberLiteral<'123456789.0123456789e-0123456789'>]> = true; }
{ const test: EqualTypes<JsonLexer<'-123456789.0123456789e0123456789'>, [NumberLiteral<'-123456789.0123456789e0123456789'>]> = true; }
{ const test: EqualTypes<JsonLexer<'-123456789.0123456789e+0123456789'>, [NumberLiteral<'-123456789.0123456789e+0123456789'>]> = true; }
{ const test: EqualTypes<JsonLexer<'-123456789.0123456789e-0123456789'>, [NumberLiteral<'-123456789.0123456789e-0123456789'>]> = true; }

{ const test: EqualTypes<JsonLexer<'""'>, [StringLiteral<''>]> = true; }
{ const test: EqualTypes<JsonLexer<'"a"'>, [StringLiteral<'a'>]> = true; }
{ const test: EqualTypes<JsonLexer<`" !#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_\`abcdefghijklmnopqrstuvwxyz{|}~"`>, [StringLiteral<` !#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_\`abcdefghijklmnopqrstuvwxyz{|}~`>]> = true; }
{ const test: EqualTypes<JsonLexer<'"\\n"'>, [StringLiteral<'\n'>]> = true; }
{ const test: EqualTypes<JsonLexer<'"\\t"'>, [StringLiteral<'\t'>]> = true; }
{ const test: EqualTypes<JsonLexer<'"\\r"'>, [StringLiteral<'\r'>]> = true; }
{ const test: EqualTypes<JsonLexer<'"\\b"'>, [StringLiteral<'\b'>]> = true; }
{ const test: EqualTypes<JsonLexer<'"\\\\"'>, [StringLiteral<'\\'>]> = true; }
{ const test: EqualTypes<JsonLexer<'"\\""'>, [StringLiteral<'"'>]> = true; }
{ const test: EqualTypes<JsonLexer<'"\\a"'>, [JsonLexerError<'illegal or unsupported escape sequence: \\a"'>]> = true; }

{ const test: EqualTypes<JsonLexer<'['>, [OpenBracket]> = true; }
{ const test: EqualTypes<JsonLexer<']'>, [CloseBracket]> = true; }
{ const test: EqualTypes<JsonLexer<'{'>, [OpenBrace]> = true; }
{ const test: EqualTypes<JsonLexer<'}'>, [CloseBrace]> = true; }
{ const test: EqualTypes<JsonLexer<','>, [Comma]> = true; }
{ const test: EqualTypes<JsonLexer<':'>, [Colon]> = true; }

{
    type LexerResult = JsonLexer<`
        {
            "null": null,
            "true": true,
            "false": false,
            "zero": 0,
            "minus-pi": -3.141529,
            "empty-string": "",
            "foo": "bar",
            "empty-list": [],
            "empty-object": {}
        }
    `>;

    type Expected = [
        OpenBrace,

        StringLiteral<'null'>,
        Colon,
        NullLiteral,
        Comma,

        StringLiteral<'true'>,
        Colon,
        BooleanLiteral<true>,
        Comma,

        StringLiteral<'false'>,
        Colon,
        BooleanLiteral<false>,
        Comma,

        StringLiteral<'zero'>,
        Colon,
        NumberLiteral<'0'>,
        Comma,

        StringLiteral<'minus-pi'>,
        Colon,
        NumberLiteral<'-3.141529'>,
        Comma,

        StringLiteral<'empty-string'>,
        Colon,
        StringLiteral<''>,
        Comma,

        StringLiteral<'foo'>,
        Colon,
        StringLiteral<'bar'>,
        Comma,

        StringLiteral<'empty-list'>,
        Colon,
        OpenBracket,
        CloseBracket,
        Comma,

        StringLiteral<'empty-object'>,
        Colon,
        OpenBrace,
        CloseBrace,

        CloseBrace,
    ];
    const test: EqualTypes<LexerResult, Expected> = true;
}
