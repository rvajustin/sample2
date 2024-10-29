# set your environment variables here
export AWS_ACCOUNT_ID="992382578140" # enter your AWS account ID here
export AWS_SECRET_ACCESS_KEY=$RV_AWS_SECRET_ACCESS_KEY # enter your AWS secret access key here
export AWS_ACCESS_KEY_ID=$RV_AWS_ACCESS_KEY_ID # enter your AWS access key ID here
export AWS_REGION=$RV_AWS_REGION # enter your AWS region here
export STACK_NAME=sample2 # enter your stack name here

export ON_FAILURE=DELETE
export TEMPLATE_FILE=./template.yml
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set region $AWS_REGION

# run the action
sh ./actions/deploy/action.sh

# unset the environment variables
unset ENV
unset STACK_NAME
unset ON_FAILURE
unset REPO
unset VERSION
unset TEMPLATE_FILE

unset AWS_ACCOUNT_ID

unset AWS_SECRET_ACCESS_KEY
unset AWS_ACCESS_KEY_ID
unset AWS_REGION
unset GITHUB_PAT