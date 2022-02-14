# k8s-Iac
Local K8s iac with pulumi + ansible



## Installation

### 1- Install the first master node

```bash
# The ansible command to create the first master node.
ansible-playbook -i inventory rke2-install-server.yml
```

### 2- Encrypt the node token in the token.env file

```bash
# The ansible command to encrypt the the token
ansible-vault encrypt ./token.env
New Vault password:
Confirm New Vault password:
Encryption successful
```

### 3- Install workers

```bash
# The ansible command to install kube-vip on the first master node.
ansible-playbook -i inventory kube-vip.yaml
```
