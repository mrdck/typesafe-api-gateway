<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [typesafe-api-gateway](#typesafe-api-gateway)
  - [Usage](#usage)
  - [Setup](#setup)
  - [Contribution](#contribution)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# typesafe-api-gateway

This is types package that I've made as extension of `@types/aws-lambda` package with idea of giving much more generic interface for API Gateway events.

Before you start please take a look below to see explanation why generic API Gateway Event is needed.

```typescript
interface Payload {
  foo: string
}

const handler = async ({ body }: APIGatwayEventProxy): APIGatewayProxyResult => {
   let data: Payload

    try {
      data = JSON.parse(body) as unknown as Payload
    } catch {
     // exception handle
    }
}
```

In the example from above `body` property most-likely will get `string` or `null` type since this is what type definition has inside `APIGatewayProxyEventBase`
```
export interface APIGatewayProxyEventBase<TAuthorizerContext> {
    body: string | null;
}
```

The reason for `string` as body type is most likely due fact that body in event is usually in raw form which needs to get parsed.

However, if there is body-parser used as middleware or other mechanism applied that pass parsed body to event there is need to use type correction

```typescript
interface Payload {
    foo: string
}

const handler = async ({ body }: APIGatwayEventProxy): APIGatewayProxyResult => {
  let data = body as unknown as Payload
}
```

This is the place where this library comes with help with more generic typings

## Usage

Typing request parts

```typescript
interface Body {
  bar: string
}

interface Headers {
  baz: string
}

const handler = async (event: APIGatwayEventProxy<{ body: Foo,  headers: Headers }>): APIGatewayProxyResult => {
  //
}
```
## Setup

In order to make types available with existing code base You need to specify types.
There are two ways for including types in project:

Using `types` property in `tsconfig.json`
```json
{
  "types": [
    "typesafe-api-gateway"
  ]
}
```

Using `import` in `types.d.ts` file
```typescript
import 'typesafe-api-gateway'
```

## Contribution

Feel free to submit an issue or PR

## License

MIT
