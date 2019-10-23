#!/bin/sh

USER_POOL_ID="ap-northeast-1_mFl5aJ4Oz"

aws cognito-idp create-user-pool-client \
    --user-pool-id $USER_POOL_ID \
    --client-name AuntMariaPizzeriaClient \
    --no-generate-secret \
    --query UserPoolClient.ClientId \
    --output text
