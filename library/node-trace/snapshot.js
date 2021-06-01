const fs = require('fs');
var _ = require('lodash');
var ps = require('./processes-snapshot.js');
var request = require('request');

/**
*To get the snapshot of the currently running processes
*
*/

module.exports = [
        {
                method: 'GET',
                path: '/snapshot',
                config: {
                        validate: {},

                        handler: function (req, res) {


                                ps.get(function (err, processes) {

                                        var topkCpu = _.sortBy(processes, 'cpu').reverse().splice(0, process.env.NODE_MONITOR_TOPK_CPU);

                                        fs.writeFile(process.env.NODE_MONITOR_SNAPSHOT_CPU_DIRECTORY + "/" + (Date.now()) + '.txt', JSON.stringify(topkCpu), (err) => {
                                                if (err) {
                                                        console.log("Failed to save the process snapshot sorted by CPU usage locally");

                                                }
                                        });

                                        var topkMemory = _.sortBy(processes, 'mem.usage').reverse().splice(0, process.env.NODE_MONITOR_TOPK_MEMORY);

                                        fs.writeFile(process.env.NODE_MONITOR_SNAPSHOT_MEMORY_DIRECTORY + "/" + (Date.now()) + '.txt', JSON.stringify(topkMemory), (err) => {
                                                if (err) {
                                                        console.log("Failed to save the process snapshot sorted by Memory usage locally");

                                                }
                                        });



                                        res({ snapshot: topkCpu }).code(200);

                                });


                        }
                }
        }];




