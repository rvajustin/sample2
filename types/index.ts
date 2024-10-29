export interface EcsCluster {
    clusterArn: string;
    clusterName: string;
    status: string;
    registeredContainerInstancesCount: number;
    runningTasksCount: number;
    pendingTasksCount: number;
    activeServicesCount: number;
    statistics: any[];
    tags: any[];
    settings: any[];
    capacityProviders: any[];
    defaultCapacityProviderStrategy: any[];
}

export interface LoadBalancer {
    LoadBalancerArn:       string;
    DNSName:               string;
    CanonicalHostedZoneId: string;
    CreatedTime:           Date;
    LoadBalancerName:      string;
    Scheme:                string;
    VpcId:                 string;
    State:                 State;
    Type:                  string;
    AvailabilityZones:     AvailabilityZone[];
    SecurityGroups:        string[];
    IpAddressType:         string;
}

export interface AvailabilityZone {
    ZoneName:              string;
    SubnetId:              string;
    LoadBalancerAddresses: any[];
}

export interface State {
    Code?: string;
    State?: string;
}

export interface SecurityGroup {
    Description:         string;
    GroupName:           string;
    IpPermissions:       IPPermission[];
    OwnerId:             string;
    GroupId:             string;
    IpPermissionsEgress: IPPermissionsEgress[];
    Tags:                Tag[];
    VpcId:               string;
}

export interface IPPermission {
    FromPort:         number;
    IpProtocol:       string;
    IpRanges:         IPRange[];
    Ipv6Ranges:       any[];
    PrefixListIds:    any[];
    ToPort:           number;
    UserIdGroupPairs: any[];
}

export interface IPRange {
    CidrIp: string;
}

export interface IPPermissionsEgress {
    IpProtocol:       string;
    IpRanges:         IPRange[];
    Ipv6Ranges:       any[];
    PrefixListIds:    any[];
    UserIdGroupPairs: any[];
}

export interface Tag {
    Key:   string;
    Value: string;
}

export interface TaggedResource {
    ARN:  string;
    Tags: Tag[];
}

export interface Vpc {
    CidrBlock:               string;
    DhcpOptionsId:           string;
    State:                   string;
    VpcId:                   string;
    OwnerId:                 string;
    InstanceTenancy:         string;
    CidrBlockAssociationSet: CIDRBlockAssociationSet[];
    IsDefault:               boolean;
    Tags:                    Tag[];
    Subnets:                 Subnet[];
    RouteTables:             RouteTable[];
}

export interface CIDRBlockAssociationSet {
    AssociationId:  string;
    CidrBlock:      string;
    CidrBlockState: State;
}

export interface RouteTable {
    Associations:    Association[];
    PropagatingVgws: any[];
    RouteTableId:    string;
    Routes:          Route[];
    Tags:            Tag[];
    VpcId:           string;
    OwnerId:         string;
}

export interface Association {
    Main:                    boolean;
    RouteTableAssociationId: string;
    RouteTableId:            string;
    AssociationState:        State;
}

export interface Route {
    DestinationCidrBlock: string;
    GatewayId:            string;
    Origin:               string;
    State:                string;
}

export interface Subnet {
    AvailabilityZone:              string;
    AvailabilityZoneId:            string;
    AvailableIpAddressCount:       number;
    CidrBlock:                     string;
    DefaultForAz:                  boolean;
    MapPublicIpOnLaunch:           boolean;
    MapCustomerOwnedIpOnLaunch:    boolean;
    State:                         string;
    SubnetId:                      string;
    VpcId:                         string;
    OwnerId:                       string;
    AssignIpv6AddressOnCreation:   boolean;
    Ipv6CidrBlockAssociationSet:   any[];
    Tags:                          Tag[];
    SubnetArn:                     string;
    EnableDns64:                   boolean;
    Ipv6Native:                    boolean;
    PrivateDnsNameOptionsOnLaunch: PrivateDNSNameOptionsOnLaunch;
}

export interface PrivateDNSNameOptionsOnLaunch {
    HostnameType:                    string;
    EnableResourceNameDnsARecord:    boolean;
    EnableResourceNameDnsAAAARecord: boolean;
}
export interface AppRunnerService {
    ServiceName:                     string;
    ServiceId:                       string;
    ServiceArn:                      string;
    ServiceUrl:                      string;
    CreatedAt:                       Date;
    UpdatedAt:                       Date;
    Status:                          string;
    SourceConfiguration:             SourceConfiguration;
    InstanceConfiguration:           InstanceConfiguration;
    HealthCheckConfiguration:        HealthCheckConfiguration;
    AutoScalingConfigurationSummary: AutoScalingConfigurationSummary;
    NetworkConfiguration:            NetworkConfiguration;
    ObservabilityConfiguration:      ObservabilityConfiguration;
    VpcConnector:                    VpcConnector;
}

export interface AutoScalingConfigurationSummary {
    AutoScalingConfigurationArn:      string;
    AutoScalingConfigurationName:     string;
    AutoScalingConfigurationRevision: number;
}

export interface HealthCheckConfiguration {
    Protocol:           string;
    Path:               string;
    Interval:           number;
    Timeout:            number;
    HealthyThreshold:   number;
    UnhealthyThreshold: number;
}

export interface InstanceConfiguration {
    Cpu:             string;
    Memory:          string;
    InstanceRoleArn: string;
}

export interface NetworkConfiguration {
    EgressConfiguration:  EgressConfiguration;
    IngressConfiguration: IngressConfiguration;
    IpAddressType:        string;
}

export interface EgressConfiguration {
    EgressType:      string;
    VpcConnectorArn: string;
}

export interface IngressConfiguration {
    IsPubliclyAccessible: boolean;
}

export interface ObservabilityConfiguration {
    ObservabilityEnabled: boolean;
}

export interface SourceConfiguration {
    ImageRepository:             ImageRepository;
    AutoDeploymentsEnabled:      boolean;
    AuthenticationConfiguration: AuthenticationConfiguration;
}

export interface AuthenticationConfiguration {
    AccessRoleArn: string;
}

export interface ImageRepository {
    ImageIdentifier:     string;
    ImageConfiguration:  ImageConfiguration;
    ImageRepositoryType: string;
}

export interface ImageConfiguration {
    RuntimeEnvironmentVariables: any;
    Port:                        string;
    RuntimeEnvironmentSecrets:   any;
}

export interface VpcConnector {
    VpcConnectorName:     string;
    VpcConnectorArn:      string;
    VpcConnectorRevision: number;
    Subnets:              string[];
    SecurityGroups:       string[];
    Status:               string;
    CreatedAt:            Date;
}
