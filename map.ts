import * as fs from 'fs';
import {
    EcsCluster, LoadBalancer, SecurityGroup, Vpc, Subnet, RouteTable, Route, Association, AppRunnerService
} from "./types";

// Read inventory directory path from the latest.json file
const json = fs.readFileSync('inventory/latest.json', 'utf8');
const { latest } = JSON.parse(json);

// Helper function to read JSON files and parse as type T
function readJson<T>(file: string): T[] {
    if (!fs.existsSync(`${latest}/${file}.json`)) {
        console.warn(`No ${file}.json file found in ${latest}`);
        return [];
    }
    return JSON.parse(fs.readFileSync(`${latest}/${file}.json`, 'utf8'));
}

// Format VPCs and their associated subnets and route tables
function formatVpcSummary(vpcs: Vpc[]) {
    return(!vpcs || vpcs.length == 0) ? '' : vpcs.map(vpc => {
        const subnets = vpc.Subnets.map((subnet: Subnet) => `- Subnet ID: ${subnet.SubnetId}
  - AZ: ${subnet.AvailabilityZone}
  - CIDR: ${subnet.CidrBlock}
  - Public IP on Launch: ${subnet.MapPublicIpOnLaunch}`).join('\n');

        const routeTables = vpc.RouteTables.map((rt: RouteTable) => `- Route Table ID: ${rt.RouteTableId}
  - Routes:${rt.Routes.map((route: Route) => `
    - Destination: ${route.DestinationCidrBlock}, Gateway: ${route.GatewayId}, State: ${route.State}`).join('')}
  - Associations: ${rt.Associations.map((assoc: Association) => `
    - ${assoc.Main ? "Main" : "Secondary"} Association: ${assoc.RouteTableAssociationId}`).join('')}`).join('\n');

        return `
### VPC ID: ${vpc.VpcId} - ${vpc.CidrBlock}
#### Subnets:
${subnets}

#### Route Tables:
${routeTables}`}).join('\n') + "\n\n";
}

// Format ECS Clusters
function formatEcsSummary(clusters: EcsCluster[]) {
    return (!clusters || clusters.length == 0) ? '' : clusters.map(cluster => `
## ECS Cluster: ${cluster.clusterName}
- ARN: ${cluster.clusterArn}
- Status: ${cluster.status}
- Registered Instances: ${cluster.registeredContainerInstancesCount}
- Running Tasks: ${cluster.runningTasksCount}
- Active Services: ${cluster.activeServicesCount}`).join('\n') + "\n\n";
}

// Format Load Balancers
function formatLoadBalancerSummary(loadBalancers: LoadBalancer[]) {
    return (!loadBalancers || loadBalancers.length == 0) ? '' : loadBalancers.map(lb => `
## Load Balancer: ${lb.LoadBalancerName} (${lb.Type})
- ARN: ${lb.LoadBalancerArn}
- DNS Name: ${lb.DNSName}
- Scheme: ${lb.Scheme}
- VPC: ${lb.VpcId}
- Availability Zones: ${lb.AvailabilityZones.map(az => `${az.ZoneName} (Subnet: ${az.SubnetId})`).join(', ')}
- Security Groups: ${lb.SecurityGroups.join(', ')}`).join('\n') + "\n\n";
}

// Format App Runner Services
function formatAppRunnerSummary(appRunnerServices: AppRunnerService[]) {
    return (!appRunnerServices || appRunnerServices.length == 0) ? '' : appRunnerServices.map(service => `
## App Runner Service: ${service.ServiceName} (${service.ServiceArn})
- Status: ${service.Status}
- Subnets: ${service.VpcConnector.Subnets.join(", ")}
- Security Groups: ${service.VpcConnector.SecurityGroups.join(", ")}`).join('\n') + "\n\n";
}

// Format Security Groups
function formatSecurityGroupSummary(securityGroups: SecurityGroup[]) {
    return (!securityGroups || securityGroups.length == 0) ? '' : securityGroups.map(sg => `
## Security Group: ${sg.GroupName} (${sg.GroupId})
- VPC: ${sg.VpcId}
- Description: ${sg.Description}
- Ingress Rules: ${sg.IpPermissions.map(perm => `
  - Protocol: ${perm.IpProtocol}
    - From Port: ${perm.FromPort}, To Port: ${perm.ToPort}
    - CIDR Ranges: ${perm.IpRanges.map(range => range.CidrIp).join(', ')}`).join('\n')}
- Egress Rules: ${sg.IpPermissionsEgress.map(perm => `
    - Protocol: ${perm.IpProtocol}
      - CIDR Ranges: ${perm.IpRanges.map(range => range.CidrIp).join(', ')}`).join('\n')}`).join('\n') + "\n\n";
}

// Create a network summary and save to a human-readable file
function createNetworkSummary() {
    const vpcSummary = formatVpcSummary(vpcs);
    const ecsSummary = formatEcsSummary(ecsClusters);
    const lbSummary = formatLoadBalancerSummary(loadBalancers);
    const sgSummary = formatSecurityGroupSummary(securityGroups);
    const appRunnerSummary = formatAppRunnerSummary(appRunnerServices);

    const summaryContent = `# Network Inventory Summary
    
## VPCs
${vpcSummary}${ecsSummary}${lbSummary}${appRunnerSummary}${sgSummary}`;

    fs.writeFileSync(`${latest}/network_summary.md`, summaryContent, 'utf8');
    console.log(`Network summary saved to ${latest}/network_summary.md`);
}

// Read and parse each resource type
const ecsClusters = readJson<EcsCluster>('ecs_clusters');
const loadBalancers = readJson<LoadBalancer>('load_balancers');
const securityGroups = readJson<SecurityGroup>('security_groups');
const appRunnerServices = readJson<AppRunnerService>('apprunner_services');
const vpcs = readJson<Vpc>('vpcs');

// Run the summary creation
createNetworkSummary();