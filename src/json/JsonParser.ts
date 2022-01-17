import { BooleanLiteral, CloseBrace, CloseBracket, Colon, Comma, JsonLexer, NullLiteral, NumberLiteral, OpenBrace, OpenBracket, StringLiteral } from "./JsonLexer";


export type ParseError<M, TL> = { type: 'ERROR', message: M, rest: TL };

export type JsonParser<T extends string> = ParseJsonValue<JsonLexer<T>> extends [infer ValueType, []] ? ValueType : ParseJsonValue<JsonLexer<T>>;


// Values

type ParseJsonValue<TL> =
   TL extends [NullLiteral, ...infer R] ? [null, R] :
   TL extends [BooleanLiteral<any>, ...infer R] ? [boolean, R] :
   TL extends [NumberLiteral<any>, ...infer R] ? [number, R] :
   TL extends [StringLiteral<any>, ...infer R] ? [string, R] :
   TL extends [OpenBracket, ...infer R] ? ParseEndOfArrayOrArrayValues<never, R> :
   TL extends [OpenBrace, ...infer R] ? ParseEndOfObjectOrObjectProperties<{}, R> :
   ParseError<'value expected', TL>;


// Arrays

type ParseEndOfArrayOrArrayValues<ElementType, TL> =
   TL extends [] ? ParseError<'] or value expected', TL> :
   TL extends [CloseBracket, ...infer R] ? [Array<ElementType>, R] :
   ParseArrayValues<ElementType, TL>;

type ParseEndOfArrayOrCommaAndArrayValues<ElementType, TL> =
   TL extends [CloseBracket, ...infer R] ? [Array<ElementType>, R] :
   TL extends [Comma, ...infer R] ? ParseArrayValues<ElementType, R> :
   ParseError<'] or , expected', TL>;

type ParseArrayValues<ElementType, TL> =
   ParseJsonValue<TL> extends [infer NextElementType, infer NextTL] ? ParseEndOfArrayOrCommaAndArrayValues<ElementType | NextElementType, NextTL> :
   ParseJsonValue<TL>;


// Objects

type ParseEndOfObjectOrObjectProperties<ObjectType, TL> =
   TL extends [] ? ParseError<'} or object key expected', TL> :
   TL extends [CloseBrace, ...infer R] ? [ObjectType, R] :
   ParseObjectProperties<ObjectType, TL>;

type ParseEndOfObjectOrCommaAndObjectProperties<ObjectType, TL> =
   TL extends [CloseBrace, ...infer R] ? [ObjectType, R] :
   TL extends [Comma, ...infer R] ? ParseObjectProperties<ObjectType, R> :
   ParseError<'} or , expected', TL>;

// This just delegates to ParseObjectPropertiesAndUnifyDuplicateKeys which creates union types in case of duplicate keys.
// Alternatively you may change this and delegate to ParseObjectPropertiesAndFailOnDuplicateKeys which reports an error on duplicate keys.
// TODO: Make the parser configurable. Or even better: Create an AST representation first and implement both versions on this AST.
type ParseObjectProperties<ObjectType, TL> = ParseObjectPropertiesAndUnifyDuplicateKeys<ObjectType, TL>;
//type ParseObjectProperties<ObjectType, TL> = ParseObjectPropertiesAndFailOnDuplicateKeys<ObjectType, TL>;

type ParseObjectPropertiesAndUnifyDuplicateKeys<ObjectType, TL> =
   TL extends [StringLiteral<infer KeyType>, ...infer TLAfterKey] ? (
      TLAfterKey extends [Colon, ...infer TLAfterColon] ? (
         ParseJsonValue<TLAfterColon> extends infer ParseResult ? (
            ParseResult extends [infer ValueType, infer NextTL]
            ? ParseEndOfObjectOrCommaAndObjectProperties<{ [key in keyof ObjectType | KeyType]: key extends keyof ObjectType ? (key extends KeyType ? ObjectType[key] | ValueType : ObjectType[key]) : ValueType }, NextTL>
            : ParseResult
         ) : never
      ) :
      ParseError<': expected', TLAfterKey>
   ) :
   ParseError<'object key expected', TL>;

type ParseObjectPropertiesAndFailOnDuplicateKeys<ObjectType, TL> =
   TL extends [StringLiteral<infer KeyType>, ...infer TLAfterKey] ? (
      KeyType extends keyof ObjectType ? ParseError<`duplicate key ${KeyType}`, TL> :
      TLAfterKey extends [Colon, ...infer TLAfterColon] ? (
         ParseJsonValue<TLAfterColon> extends infer ParseResult ? (
            ParseResult extends [infer ValueType, infer NextTL]
            ? ParseEndOfObjectOrCommaAndObjectProperties<{ [key in keyof ObjectType | KeyType]: key extends keyof ObjectType ? ObjectType[key] : ValueType }, NextTL>
            : ParseResult
         ) : never
      ) :
      ParseError<': expected', TLAfterKey>
   ) :
   ParseError<'object key expected', TL>;
