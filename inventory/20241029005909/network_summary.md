# Network Inventory Summary
    
## VPCs

### VPC ID: vpc-0ba8a2c356a26ee58 - 10.0.0.0/16
#### Subnets:
- Subnet ID: subnet-0ba3c8c03454b4583
  - AZ: us-east-1b
  - CIDR: 10.0.3.0/24
  - Public IP on Launch: true
- Subnet ID: subnet-0f1b1e9e60704573d
  - AZ: us-east-1a
  - CIDR: 10.0.1.0/24
  - Public IP on Launch: true
- Subnet ID: subnet-09044e312f189a3bb
  - AZ: us-east-1c
  - CIDR: 10.0.5.0/24
  - Public IP on Launch: true

#### Route Tables:
- Route Table ID: rtb-05fe0651f260d261f
  - Routes:
    - Destination: 10.0.0.0/16, Gateway: local, State: active
  - Associations: 
    - Main Association: rtbassoc-0bac57d522fd756af
- Route Table ID: rtb-0b61be8e1fe80a365
  - Routes:
    - Destination: 10.0.0.0/16, Gateway: local, State: active
    - Destination: 0.0.0.0/0, Gateway: igw-08b926628db6e5f41, State: active
  - Associations: 


## Security Group: sample2-AppRunnerSecurityGroup-VKP6VFMDd8dD (sg-06dbfe811dfe719b3)
- VPC: vpc-0ba8a2c356a26ee58
- Description: AppRunner security group
- Ingress Rules: 
  - Protocol: tcp
    - From Port: 80, To Port: 80
    - CIDR Ranges: 0.0.0.0/0
- Egress Rules: 
    - Protocol: -1
      - CIDR Ranges: 0.0.0.0/0

