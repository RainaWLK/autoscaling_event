# Auto Scaling Event

Add/Remove Instances private IP address with Auto Scaling into Route53.
For Service Discovery mechanism of Cluster, such as EMQTT.

## How to use

edit serverless.yml

```
custom:
  HostedZoneId: <HostedZoneId in Route53>
  ClusterDNSName: <DNS Record Name of your cluster>
  AutoScalingGroupName: <Auto Scaling Group Name of your cluster>
```

Add Lifecycle Hook in Auto Scaling Group
Note that 'EC2 Instance Launch Successful' may not work if there exist a 'EC2 Instance-launch Lifecycle Action'
```
  EC2 Instance-terminate Lifecycle Action
```

first deploy
```shell
npm install
npm run create
```

update
```shell
npm run deploy
```