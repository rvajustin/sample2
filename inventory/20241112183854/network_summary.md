# Network Inventory Summary
    
## VPCs

### VPC ID: vpc-022093e17848dbe97 - 10.0.0.0/16
#### Subnets:
- Subnet ID: subnet-0190e67dc70838aa1
  - AZ: us-east-1a
  - CIDR: 10.0.1.0/24
  - Public IP on Launch: true
- Subnet ID: subnet-0dd11526c07295b63
  - AZ: us-east-1c
  - CIDR: 10.0.5.0/24
  - Public IP on Launch: true
- Subnet ID: subnet-0462841660812c675
  - AZ: us-east-1b
  - CIDR: 10.0.3.0/24
  - Public IP on Launch: true

#### Route Tables:
- Route Table ID: rtb-0466bb90aa04671f4
  - Routes:
    - Destination: 10.0.0.0/16, Gateway: local, State: active
    - Destination: 0.0.0.0/0, Gateway: igw-02f11980342305fac, State: active
  - Associations: 
- Route Table ID: rtb-0e525c1debd6f620b
  - Routes:
    - Destination: 10.0.0.0/16, Gateway: local, State: active
  - Associations: 
    - Main Association: rtbassoc-025c446494cf970ae


## Security Group: sample2-AppRunnerSecurityGroup-dPb5pi9GiSSx (sg-0d043ca4f9c328022)
- VPC: vpc-022093e17848dbe97
- Description: AppRunner security group
- Ingress Rules: 
  - Protocol: tcp
    - From Port: 80, To Port: 80
    - CIDR Ranges: 0.0.0.0/0
- Egress Rules: 
    - Protocol: -1
      - CIDR Ranges: 0.0.0.0/0

