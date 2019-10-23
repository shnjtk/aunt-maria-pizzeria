#!/bin/sh

REGION="ap-northeast-1"

aws dynamodb create-table \
    --table-name pizza-orders \
    --attribute-definitions AttributeName=orderId,AttributeType=S \
    --key-schema AttributeName=orderId,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --region $REGION \
    --query TableDescription.TableArn \
    --output text
