#!/bin/sh

IDENTITY_POOL_ID=${IDENTITY_POOL_ID:-ap-northeast-1:12345678-1234-1234-1234-1234567890}
AUTH_ROLE_ARN=${AUTH_ROLE_ARN:-arn:aws:iam::123456789012:role/Cognito_AuntMariaPizzeriaAuth_Role}
UNAUTH_ROLE_ARN=${UNAUTH_ROLE_ARN:-arn:aws:iam::123456789012:role/Cognito_AuntMariaPizzeriaUnauth_Role}

aws cognito-identity set-identity-pool-roles \
    --identity-pool-id $IDENTITY_POOL_ID \
    --roles authenticated=$AUTH_ROLE_ARN,unauthenticated=$UNAUTH_ROLE_ARN
