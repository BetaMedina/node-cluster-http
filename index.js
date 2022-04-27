import os from "os"
import cluster from "cluster"
import { initializeServer } from "./server.js"

(() => {
  if (!cluster.isPrimary) {
    initializeServer()
    return;
  }
  const cpusNumber = os.cpus().length
  console.log(`[Primary] ${process.pid} is running`)
  console.log(`[Forking] server for ${cpusNumber} CPU\n`)
  for (let index = 0; index < cpusNumber; index++) {
    cluster.fork()
  }

  //Apenas em servidores sem o kubernetes por baixo dos panos
  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`[Worker] PID:${worker.process.pid} died`)
      cluster.fork()
    }
  })
})()