#!/bin/sh

BUCKET_NAME=${AUNT_MARIA_PIZZERIA_BUCKET_NAME:-some-unique-name-aunt-maria-pizzeria}
REGION="ap-northeast-1"

aws s3 mb s3://${BUCKET_NAME} --region $REGION
