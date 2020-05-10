'use strict'

import * as AWS from 'aws-sdk';
import 'source-map-support/register';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-labmda';

const docClient = new AWS.DynamoDB.DocumentClient();

const connectionsTable = process.env.CONNECTIONS_TABLE;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Websocket connect: ', event);

    const connectionId = event.requestContext.connectionId;

    const key = {
        id: connectionId
    }

    await docClient.delete({
        TableName: connectionsTable,
        Key: key
    }).promise();

    return {
        statusCode: 200,
        body: ''
    }
}
