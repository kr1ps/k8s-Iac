# pulumi iac
pulumi iac hosts ubuntu base



## Installation

### 1- npm install on pulumi-rke dir to get all plugins

```bash
npm install
```

### 2- config the variable to connect to vcenter with "pulumi config set vsphere:" command

```bash
pulumi config set vsphere:user administrator@kr1ps.com
pulumi config set vsphere:allowUnverifiedSsl true
pulumi config set vsphere:vsphere_server vcsa.kr1ps.com
pulumi config set vsphere:password P@ssw0rd --secret 
```

### 3- do the "pulumi up" to bring up the infrastructure

```bash
pulumi up
```
