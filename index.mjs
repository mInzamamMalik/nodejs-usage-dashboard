import os from 'os'
import osu from 'node-os-utils'
import Inspector from 'inspector-api'


// setInterval(() => {

//     // console.log(os.cpus());
//     console.log(`total memory: ${os.totalmem() / 1024 / 1024} MB`);
//     console.log(`free memory: ${Number(os.freemem() / 1024 / 1024).toFixed(2)} MB`)
//     console.log(`free memory: ${((os.freemem() * 100) / os.totalmem()).toFixed(2)}%`)


//     console.log(`Arch: ${os.arch()} ${os.type()}`)
//     console.log("\n\n")

// }, 1000);



// var cpu = osu.cpu
// var drive = osu.drive
// var mem = osu.mem

// setInterval(() => {
    // cpu.usage()
    //     .then(info => {
    //         console.log(info)
    //     })
    // cpu.free()
    //     .then(info => {
    //         console.log(info)
    //     })


    // mem.info()
    // .then(info => {
    //   console.log(info)
    // })


    // drive.info()
    //     .then(info => {
    //         console.log(info)
    //     })

// }, 1000);
