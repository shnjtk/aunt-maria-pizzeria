#!/bin/sh

ROLE_FILE_PATH=$(cd $(dirname $0) && pwd)/../roles

aws iam put-role-policy \
    --role-name Cognito_AuntMariaPizzeriaUnauth_Role \
    --policy-name Cognito_AuntMariaPizzeriaUnauth_Policy \
    --policy-document file://${ROLE_FILE_PATH}/cognito-unauth-policy.json
