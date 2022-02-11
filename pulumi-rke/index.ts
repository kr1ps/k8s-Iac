import * as pulumi from "@pulumi/pulumi";
import * as vsphere from "@pulumi/vsphere"

let dc = pulumi.output(vsphere.getDatacenter({
    name: "kr1ps-DC"
}));

let folder = new vsphere.Folder("Pulumi Builds", {
    datacenterId: dc.apply(dc => dc.id),
    path: "Pulumi Builds",
    type: "vm",
    });

let cluster = dc.apply(dc => vsphere.getComputeCluster({
    datacenterId: dc.id,
    name: "kr1ps-cl01"
}));

let resourcePool = new vsphere.ResourcePool("Pulumi ResourcesPool", {
    parentResourcePoolId: cluster.apply(cluster => cluster.resourcePoolId),
});

let datastoreId = dc.apply(dc => vsphere.getDatastore({
    datacenterId: dc.id,
    name: "esx01_ssd-1tb"
}));

let networkId = dc.apply(dc => vsphere.getNetwork({
    datacenterId: dc.id,
    name: "server-net"
}));

let template = dc.apply(dc => vsphere.getVirtualMachine({
    datacenterId: dc.id,
    name: "tpl-ubuntu-2104"
}));


//Create rke-worker01 VMs

let worker01 = new vsphere.VirtualMachine("rke-worker01.kr1ps.com", {
    resourcePoolId: resourcePool.id,
    datastoreId: datastoreId.id,
    folder: folder.path,
    numCpus: 6,
    memory: 8192,
    guestId: template.guestId,
    networkInterfaces: [{
        networkId: networkId.id,
        adapterType: template.networkInterfaceTypes[0],
    }],
    disks: [{
        label: "disk0",
        size: template.disks[0].size,
        eagerlyScrub: template.disks[0].eagerlyScrub,
        thinProvisioned: template.disks[0].thinProvisioned,
    }],
    clone: {
        templateUuid: template.id,
        customize: {
            dnsServerLists: ["172.18.0.1"],
            dnsSuffixLists: ["kr1ps.com"],
            ipv4Gateway: "172.18.0.1",
            linuxOptions: {
                domain: "kr1ps.com",
                hostName: "rke-worker01"
            },
            networkInterfaces: [{
                dnsDomain: "kr1ps.com",
                ipv4Address: "172.18.0.55",
                ipv4Netmask: 24,
                dnsServerLists: ["172.18.0.1"]
            }]
        }
    },
});

//Create rke-worker02 VMs

let worker02 = new vsphere.VirtualMachine("rke-worker02.kr1ps.com", {
    resourcePoolId: resourcePool.id,
    datastoreId: datastoreId.id,
    folder: folder.path,
    numCpus: 6,
    memory: 8192,
    guestId: template.guestId,
    networkInterfaces: [{
        networkId: networkId.id,
        adapterType: template.networkInterfaceTypes[0],
    }],
    disks: [{
        label: "disk0",
        size: template.disks[0].size,
        eagerlyScrub: template.disks[0].eagerlyScrub,
        thinProvisioned: template.disks[0].thinProvisioned,
    }],
    clone: {
        templateUuid: template.id,
        customize: {
            dnsServerLists: ["172.18.0.1"],
            dnsSuffixLists: ["kr1ps.com"],
            ipv4Gateway: "172.18.0.1",
            linuxOptions: {
                domain: "kr1ps.com",
                hostName: "rke-worker02"
            },
            networkInterfaces: [{
                dnsDomain: "kr1ps.com",
                ipv4Address: "172.18.0.56",
                ipv4Netmask: 24,
                dnsServerLists: ["172.18.0.1"]
            }]
        }
    },
});


//Create rke-worker03 VMs

let worker03 = new vsphere.VirtualMachine("rke-worker03.kr1ps.com", {
    resourcePoolId: resourcePool.id,
    datastoreId: datastoreId.id,
    folder: folder.path,
    numCpus: 6,
    memory: 8192,
    guestId: template.guestId,
    networkInterfaces: [{
        networkId: networkId.id,
        adapterType: template.networkInterfaceTypes[0],
    }],
    disks: [{
        label: "disk0",
        size: template.disks[0].size,
        eagerlyScrub: template.disks[0].eagerlyScrub,
        thinProvisioned: template.disks[0].thinProvisioned,
    }],
    clone: {
        templateUuid: template.id,
        customize: {
            dnsServerLists: ["172.18.0.1"],
            dnsSuffixLists: ["kr1ps.com"],
            ipv4Gateway: "172.18.0.1",
            linuxOptions: {
                domain: "kr1ps.com",
                hostName: "rke-worker03"
            },
            networkInterfaces: [{
                dnsDomain: "kr1ps.com",
                ipv4Address: "172.18.0.57",
                ipv4Netmask: 24,
                dnsServerLists: ["172.18.0.1"]
            }]
        }
    },
});

//Create rke-master01 VMs

let master01 = new vsphere.VirtualMachine("rke-master01.kr1ps.com", {
    resourcePoolId: resourcePool.id,
    datastoreId: datastoreId.id,
    folder: folder.path,
    numCpus: 4,
    memory: 4096,
    guestId: template.guestId,
    networkInterfaces: [{
        networkId: networkId.id,
        adapterType: template.networkInterfaceTypes[0],
    }],
    disks: [{
        label: "disk0",
        size: template.disks[0].size,
        eagerlyScrub: template.disks[0].eagerlyScrub,
        thinProvisioned: template.disks[0].thinProvisioned,
    }],
    clone: {
        templateUuid: template.id,
        customize: {
            dnsServerLists: ["172.18.0.1"],
            dnsSuffixLists: ["kr1ps.com"],
            ipv4Gateway: "172.18.0.1",
            linuxOptions: {
                domain: "kr1ps.com",
                hostName: "rke-master01"
            },
            networkInterfaces: [{
                dnsDomain: "kr1ps.com",
                ipv4Address: "172.18.0.50",
                ipv4Netmask: 24,
                dnsServerLists: ["172.18.0.1"]
            }]
        }
    },
});

