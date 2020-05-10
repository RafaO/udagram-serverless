'use strict'

import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-labmda';
import 'source-map-support/register'
import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';

const docClient = new AWS.DynamoDB.DocumentClient()

const groupsTable = process.env.GROUPS_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const parsedBody = JSON.parse(event.body);
    const itemId = uuid.v4();

    const item = {
        id: itemId,
        ...parsedBody
    };

    await docClient.put({
        TableName: groupsTable,
        Item: item
    }).promise();

    const response = {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ item }),
    };
    return response;
};
