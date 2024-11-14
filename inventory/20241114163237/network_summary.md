# Network Inventory Summary
    
## VPCs

### VPC ID: vpc-065047a2390e25a79 - 10.0.0.0/16
#### Subnets:
- Subnet ID: subnet-0c2034b6cf73fe423
  - AZ: us-east-1c
  - CIDR: 10.0.5.0/24
  - Public IP on Launch: true
- Subnet ID: subnet-052f86a7c819ba515
  - AZ: us-east-1b
  - CIDR: 10.0.3.0/24
  - Public IP on Launch: true
- Subnet ID: subnet-07cb3b8866d1644cf
  - AZ: us-east-1a
  - CIDR: 10.0.1.0/24
  - Public IP on Launch: true

#### Route Tables:
- Route Table ID: rtb-05c57d269181d0b86
  - Routes:
    - Destination: 10.0.0.0/16, Gateway: local, State: active
  - Associations: 
    - Main Association: rtbassoc-0441a69797fc89ef6
- Route Table ID: rtb-0db1641753e29afd2
  - Routes:
    - Destination: 10.0.0.0/16, Gateway: local, State: active
    - Destination: 0.0.0.0/0, Gateway: igw-04afb8904912f1e4e, State: active
  - Associations: 


## Security Group: sample2-AppRunnerSecurityGroup-TQQ3OIfxwAOq (sg-0c1a112091d37392a)
- VPC: vpc-065047a2390e25a79
- Description: AppRunner security group
- Ingress Rules: 
  - Protocol: tcp
    - From Port: 80, To Port: 80
    - CIDR Ranges: 0.0.0.0/0
- Egress Rules: 
    - Protocol: -1
      - CIDR Ranges: 0.0.0.0/0

