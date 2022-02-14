# k8s-Iac
Local K8s iac with pulumi + ansible



## Installation

### 1- Install the first master node

```bash
# The ansible command to create the first master node.
ansible-playbook -i inventory rke2-install-server.yml
```

### 2- Install kube-vip on first master node (optional, just if you will have more than 3 node)

```bash
# The ansible command to install kube-vip on the first master node.
ansible-playbook -i inventory kube-vip.yaml
```
