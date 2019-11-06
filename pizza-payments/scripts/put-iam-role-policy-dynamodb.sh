#!/bin/sh

ROLE_FILE_PATH=$(cd $(dirname $0) && pwd)/../roles

aws iam put-role-policy \
    --role-name pizza-payments-executor \
    --policy-name PizzaPaymentDynamoDB \
    --policy-document file://${ROLE_FILE_PATH}/dynamodb.json
