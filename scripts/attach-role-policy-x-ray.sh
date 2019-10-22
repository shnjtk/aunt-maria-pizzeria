#!/bin/sh

aws iam attach-role-policy \
    --policy-arn arn:aws:iam::aws:policy/AWSXrayWriteOnlyAccess \
    --role-name aunt-maria-pizzeria-api-executor \
    --region ap-northeast-1 \
    --output json
