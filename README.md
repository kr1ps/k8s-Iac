# k8s-Iac
Local K8s iac with pulumi + ansible



## Installation

# first master node


```bash
# The ansible command to create the first master node.
ansible-playbook  -i inventory rke2-install-server.yaml
```