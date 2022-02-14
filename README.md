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
```

### 3- Install workers

```bash
# The ansible command to install the workers node with the --ask-vault-pass for decrypt token.env file.
ansible-playbook -i inventory rke2-add-worker-node.yaml --ask-vault-pass
```
