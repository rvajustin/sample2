#!/bin/bash

# Tag-based filtering for resource inventory
TAG_KEY="Project"
TAG_VALUE="Sample2"

# Directory to store output files
OUTPUT_DIR="inventory/$(date +'%Y%m%d%H%M%S')"
mkdir -p "$OUTPUT_DIR"

get_tagged_resources() {
  echo "Fetching tagged resources..."
  resources=$(aws resourcegroupstaggingapi get-resources \
              --tag-filters Key=$TAG_KEY,Values=$TAG_VALUE \
              --query "ResourceTagMappingList[*].{ARN:ResourceARN, Tags:Tags}" \
              --output json)

  if [[ -z "$resources" || "$resources" == "[]" ]]; then
    echo "No tagged resources found with $TAG_KEY=$TAG_VALUE."
  else
    echo "$resources" | jq '.' > "${OUTPUT_DIR}/tagged_resources.json"
    echo "Saved tagged resources to ${OUTPUT_DIR}/tagged_resources.json"
  fi
}

get_ecs_clusters() {
  echo "Fetching ECS clusters..."
  clusters=$(aws ecs list-clusters --query "clusterArns" --output text)
  ecs_cluster_details="[]"

  for cluster_arn in $clusters; do
    tags=$(aws ecs list-tags-for-resource --resource-arn "$cluster_arn" \
            --query "tags[?Key=='$TAG_KEY' && Value=='$TAG_VALUE']")

    if [[ -n "$tags" ]]; then
      cluster_detail=$(aws ecs describe-clusters --clusters "$cluster_arn" --output json | jq '.clusters[0]')
      ecs_cluster_details=$(echo "$ecs_cluster_details" | jq --argjson cluster "$cluster_detail" '. + [$cluster]')
    fi
  done

  if [[ "$ecs_cluster_details" == "[]" ]]; then
    echo "No ECS clusters found with $TAG_KEY=$TAG_VALUE."
  else
    echo "$ecs_cluster_details" | jq '.' > "${OUTPUT_DIR}/ecs_clusters.json"
    echo "Saved ECS clusters to ${OUTPUT_DIR}/ecs_clusters.json"
  fi
}

get_apprunner_services() {
  echo "Fetching App Runner services..."
  services=$(aws apprunner list-services --query "ServiceSummaryList" --output json)

  tagged_services="[]"
  for service in $(echo "$services" | jq -c '.[]'); do
    service_arn=$(echo "$service" | jq -r '.ServiceArn')
    tags=$(aws apprunner list-tags-for-resource --resource-arn "$service_arn" \
            --query "Tags[?Key=='$TAG_KEY' && Value=='$TAG_VALUE']")

    if [[ -n "$tags" ]]; then
      # describe service to get more details
      service=$(aws apprunner describe-service --service-arn "$service_arn" --output json | jq '.Service')
      vpc_connector_arn=$(echo "$service" | jq -r '.NetworkConfiguration.EgressConfiguration.VpcConnectorArn')
      if [[ -n "$vpc_connector_arn" ]]; then
        vpc_connector=$(aws apprunner describe-vpc-connector --vpc-connector-arn "$vpc_connector_arn" --output json | jq '.VpcConnector')
        echo "$vpc_connector"
        service=$(echo "$service" | jq --argjson vpc_connector "$vpc_connector" '. + {VpcConnector: $vpc_connector}')
      fi
      tagged_services=$(echo "$tagged_services" | jq --argjson service "$service" '. + [$service]')
    fi
  done

  if [[ "$tagged_services" == "[]" ]]; then
    echo "No App Runner services found with $TAG_KEY=$TAG_VALUE."
  else
    echo "$tagged_services" | jq '.' > "${OUTPUT_DIR}/apprunner_services.json"
    echo "Saved App Runner services to ${OUTPUT_DIR}/apprunner_services.json"
  fi
}

get_vpcs() {
  echo "Fetching VPCs with subnets and route tables..."
  vpcs=$(aws ec2 describe-vpcs --query "Vpcs[?Tags[?Key=='$TAG_KEY' && Value=='$TAG_VALUE']]" --output json)

  if [[ -z "$vpcs" || "$vpcs" == "[]" ]]; then
    echo "No VPCs found with $TAG_KEY=$TAG_VALUE."
  else
    vpc_details="[]"
    for vpc in $(echo "$vpcs" | jq -c '.[]'); do
      vpc_id=$(echo "$vpc" | jq -r '.VpcId')

      # Get subnets associated with this VPC
      subnets=$(aws ec2 describe-subnets --filters Name=vpc-id,Values="$vpc_id" --output json | jq '.Subnets')

      # Get route tables associated with this VPC
      route_tables=$(aws ec2 describe-route-tables --filters Name=vpc-id,Values="$vpc_id" --output json | jq '.RouteTables')

      # Append subnets and route tables to the VPC details
      vpc_with_details=$(echo "$vpc" | jq --argjson subnets "$subnets" --argjson route_tables "$route_tables" '. + {Subnets: $subnets, RouteTables: $route_tables}')
      vpc_details=$(echo "$vpc_details" | jq --argjson vpc "$vpc_with_details" '. + [$vpc]')
    done

    echo "$vpc_details" | jq '.' > "${OUTPUT_DIR}/vpcs.json"
    echo "Saved VPCs with subnets and route tables to ${OUTPUT_DIR}/vpcs.json"
  fi
}

get_load_balancers() {
  echo "Fetching Load Balancers..."
  load_balancers=$(aws elbv2 describe-load-balancers --query "LoadBalancers" --output json)
  tagged_load_balancers="[]"

  for lb in $(echo "$load_balancers" | jq -c '.[]'); do
    lb_arn=$(echo "$lb" | jq -r '.LoadBalancerArn')
    tags=$(aws elbv2 describe-tags --resource-arns "$lb_arn" \
            --query "TagDescriptions[0].Tags[?Key=='$TAG_KEY' && Value=='$TAG_VALUE']")

    if [[ -n "$tags" ]]; then
      tagged_load_balancers=$(echo "$tagged_load_balancers" | jq --argjson lb "$lb" '. + [$lb]')
    fi
  done

  if [[ "$tagged_load_balancers" == "[]" ]]; then
    echo "No load balancers found with $TAG_KEY=$TAG_VALUE."
  else
    echo "$tagged_load_balancers" | jq '.' > "${OUTPUT_DIR}/load_balancers.json"
    echo "Saved Load Balancers to ${OUTPUT_DIR}/load_balancers.json"
  fi
}

get_security_groups() {
  echo "Fetching Security Groups..."
  security_groups=$(aws ec2 describe-security-groups --query "SecurityGroups[?Tags[?Key=='$TAG_KEY' && Value=='$TAG_VALUE']]" --output json)

  if [[ -z "$security_groups" || "$security_groups" == "[]" ]]; then
    echo "No security groups found with $TAG_KEY=$TAG_VALUE."
  else
    echo "$security_groups" | jq '.' > "${OUTPUT_DIR}/security_groups.json"
    echo "Saved Security Groups to ${OUTPUT_DIR}/security_groups.json"
  fi
}

# Main function to generate the inventory
generate_inventory() {
  echo "Generating Inventory..."

  # Gather each type of resource and save to separate JSON files
  get_tagged_resources
  get_ecs_clusters
  get_apprunner_services
  get_vpcs
  get_load_balancers
  get_security_groups

  echo "Inventory generation complete. Files saved to $OUTPUT_DIR"
}

# Run inventory discovery
generate_inventory

# spit out a key file in the base inventory directory so we can easily find the latest inventory
echo "{\"latest\":\"$OUTPUT_DIR\"}" > inventory/latest.json