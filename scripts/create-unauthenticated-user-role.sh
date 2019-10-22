#!/bin/sh

ROLE_FILE_PATH=$(cd $(dirname $0) && pwd)/../roles

aws iam create-role \
    --role-name Cognito_AuntMariaPizzeriaUnauth_Role \
    --assume-role-policy-document file://${ROLE_FILE_PATH}/cognito-assume-role-unauth-policy.json
