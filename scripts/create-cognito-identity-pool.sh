#!/bin/sh

CLIENT_ID=${CLIENT_ID:-1234567890}
FACEBOOK_APP_ID=${FACEBOOK_APP_ID:-1234567890}
REGION="ap-northeast-1"
USER_POOL_ID=${USER_POOL_ID:-ap-northeast-1_1234567890}
PROVIDER_NAME="cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}"

aws cognito-identity create-identity-pool \
    --identity-pool-name AuntMariaPizzeria \
    --allow-unauthenticated-identities \
    --supported-login-providers graph.facebook.com=$FACEBOOK_APP_ID \
    --cognito-identity-providers ProviderName=$PROVIDER_NAME,ClientId=$CLIENT_ID,ServerSideTokenCheck=false \
    --query IdentityPoolId \
    --output text
