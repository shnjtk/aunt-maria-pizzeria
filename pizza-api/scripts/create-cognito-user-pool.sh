#!/bin/sh

aws cognito-idp create-user-pool \
    --pool-name AuntMariaPizzeria \
    --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=false,RequireLowercase=false,RequireNumbers=false,RequireSymbols=false}" \
    --username-attributes email \
    --query UserPool.Id \
    --output text
