const express = require('express')
var cluster = require('cluster');
var Server = require('./lib/Server');

class BootStrap {
    constructor(numOfProcess = 1) {
        this.numOfProcess = numOfProcess;
    }

    boot() {
        if(cluster.isMaster) {
            this.bootAsMaster()
        } else {
            this.bootAsWorker()
        }
    }

    bootAsMaster() {
        for(var i = 0; i < this.numOfProcess; ++i) {
            cluster.fork();
        }
    }
    bootAsWorker() {
        new Server().boot();
    }
}

function main(numOfProcess) {
    new BootStrap(numOfProcess).boot();
}

if (require.main === module) {
    main()
}

