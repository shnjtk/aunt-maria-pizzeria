#!/bin/sh

ROLE_FILE_PATH=$(cd $(dirname $0) && pwd)/../roles

aws iam put-role-policy \
    --role-name aunt-maria-pizzeria-api-executor \
    --policy-name PizzaApiDynamoDB \
    --policy-document file://${ROLE_FILE_PATH}/dynamodb.json
