import {
  APIGatewayProxyEventHeaders,
  APIGatewayProxyEventBase,
  APIGatewayProxyEventQueryStringParameters,
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyEventMultiValueQueryStringParameters,
  APIGatewayProxyEventV2 as LambdaAPIGatewayProxyEventV2,
} from 'aws-lambda'

declare module 'aws-lambda' {
  interface Event {
    body?: unknown
    headers?: APIGatewayProxyEventHeaders
    pathParameters?: APIGatewayProxyEventPathParameters
    queryStringParameters?: APIGatewayProxyEventQueryStringParameters
    multiValueQueryStringParameters?: APIGatewayProxyEventMultiValueQueryStringParameters
    cookies?: string[] | undefined
  }

  interface APIGatewayProxyEvent<EventGeneric extends Event = Event> extends APIGatewayProxyEventBase<unknown> {
    body: EventGeneric['body']
    headers: EventGeneric['headers']
    pathParameters: EventGeneric['pathParameters']
    queryStringParameters: EventGeneric['queryStringParameters']
    multiValueQueryStringParameters: EventGeneric['multiValueQueryStringParameters']
  }

  interface APIGatewayProxyEventV2<EventGeneric extends Event = Event> extends LambdaAPIGatewayProxyEventV2 {
    cookies: EventGeneric['cookies']
    headers: EventGeneric['headers']
    queryStringParameters: EventGeneric['queryStringParameters']
    body?: EventGeneric['body']
  }
}
