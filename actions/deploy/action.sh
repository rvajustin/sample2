#!/bin/bash

echo "Deploying $STACK_NAME"

sam build \
  --config-env dev \
  --template-file $TEMPLATE_FILE \
  --region $AWS_REGION \
  --parameter-overrides AwsAccountId=$AWS_ACCOUNT_ID AwsSecretAccessKey=$AWS_SECRET_ACCESS_KEY AwsAccessKeyId=$AWS_ACCESS_KEY_ID AwsRegion=$AWS_REGION

sam deploy \
  --no-fail-on-empty-changeset \
  --config-env dev \
  --template-file $TEMPLATE_FILE \
  --stack-name $STACK_NAME \
  --on-failure $ON_FAILURE \
  --capabilities CAPABILITY_NAMED_IAM \
  --resolve-s3 \
  --resolve-image-repos \
  --s3-prefix sam-$REPO \
  --parameter-overrides AwsAccountId=$AWS_ACCOUNT_ID AwsSecretAccessKey=$AWS_SECRET_ACCESS_KEY AwsAccessKeyId=$AWS_ACCESS_KEY_ID AwsRegion=$AWS_REGION \
  --region $AWS_REGION

STATUS=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query 'Stacks[0].StackStatus' --output text)

if [ $STATUS == 'CREATE_COMPLETE' ] || [ $STATUS == 'UPDATE_COMPLETE' ]; then
  echo "Deployment succeeded"
  exit 0
else
  echo "Deployment failed"
  exit 1
fi
