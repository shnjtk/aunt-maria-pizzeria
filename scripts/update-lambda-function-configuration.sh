#!/bin/sh

aws lambda update-function-configuration \
    --function-name aunt-maria-pizzeria-api \
    --tracing-config Mode=Active \
    --region ap-northeast-1
