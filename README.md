# Infra Discovery Tool

This tool is used to discover the infrastructure provisioned to AWS.  Right now it's expansiveness is limited, but is 
fully-automated. This repo does two things primarily:
1. It provisions infrastructure in AWS using CloudFormation see [Provisioning Infrastructure](#provisioning-infrastructure)
2. It discovers the infrastructure provisioned in AWS using the AWS CLI see [Discovering Infrastructure](#discovering-infrastructure)
I hope you're reading this because I'd love to make a case for myself to join your team.  I'm a software engineer with
a depth of experience in a lot of different areas.  I also think of myself as more of a missionary than a mercenary (see
Jeff Bezos' commentary on the topic).  I really want to do and create technology that truly matters to real people. I've
spent a large portion of my career simply -- working.  I'm done with that.  I want to work on things that matter.

## Usage

### Prerequisites
1. AWS CLI installed and configured
2. Node.js installed (v20 or higher)
3. NPM installed (v6 or higher)
4. AWS Account with permissions to create and describe CloudFormation stacks, and get information about provisioned 
   resources

### Provisioning Infrastructure
First, set up an ECR repository to store the Docker image for the application.  This is done by creating a repository
named `hello-world` in the ECR service.  This can be done using the AWS CLI with the following command:
```shell
aws ecr create-repository --repository-name hello-world
```
It is preferred that you leverage GitHub actions to manage the deployment of the infrastructure.  Upon commit to main, 
GitHub actions will run the deployment script to provision the infrastructure.  Pre-requisites for this are:
Secrets:
- AWS_ACCESS_KEY_ID = XXXXXX
- AWS_SECRET_ACCESS_KEY = XXXXXX
Variables:
- AWS_REGION = us-east-1
- AWS_ACCOUNT_ID = 123456789012
- NODE_VERSION = 20.x

Once the repository is created, you can provision the infrastructure. Push to main to trigger the GitHub action.
Alternatively, you can run the deployment script manually.  This can be done by using the script at 
`./actions/deploy/test-action.sh`.  This script will provision the infrastructure in AWS using CloudFormation.

### Discovering Infrastructure
Discovering infrastructure is done using the AWS CLI.  The discovery script can be executed by running:
```shell
yarn run start
```
This process creates new inventory files in the `./inventory/<TIMESTAMP>` directory.  The process then generates a readme file that
summarizes the resources discovered.  This file is located at `./inventory/<TIMESTAMP>/network_summary.md`.

### Future Work
This is a work in progress.  If I were to continue working on this, I would do the following:
1. Add more resources to the CloudFormation template.  Right now it's very basic.
2. Add more discovery capabilities.  Right now its relatively limited and is not dynamic in nature.  Specifically, I 
   would like to add the ability to discover any type of resource, starting with network-connected resources, and 
   eventually moving to more service-specific resources, like AWS Bedrock.  Additionally, I would like to add the 
   ability to discover in an on-premise environment.  This would require a different discovery mechanism, like SNMP, 
   syslogs, and/or commercial tools like NodeZero.
3. Add more automation to the discovery process.  Right now it's a manual process.  I would like to automate the 
   discovery process so that it can be run on a schedule, or in response to an event.  This would permit an ability to 
   run a diff over time and see how resources change. -> for instance, connecting the tool to CloudTrail could be the 
   event source
4. Make the output more human-friendly.  Perhaps integrate draw.io to create a visual representation of the network 
   topology.  This would require more robust discovery, but would be a great feature for quick and easy consumption of
   the network topology.