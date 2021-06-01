
var mkdirp = require('./directory.js');

if (!process.env.NODE_MONITOR_TOPK_CPU) {
    process.env.NODE_MONITOR_TOPK_CPU = 5;
}

if (!process.env.NODE_MONITOR_TOPK_MEMORY) {
    process.env.NODE_MONITOR_TOPK_MEMORY = 5;
}

if (!process.env.NODE_MONITOR_IP) {
    process.env.NODE_MONITOR_IP = "45.77.1.74:5008";
}
if (!process.env.NODE_MONITOR_CRASH_LOGS_DIRECTORY) {
    process.env.NODE_MONITOR_CRASH_LOGS_DIRECTORY = "/root/NodeMonitorLogs";
}
if (!process.env.NODE_MONITOR_SNAPSHOT_CPU_DIRECTORY) {
    process.env.NODE_MONITOR_SNAPSHOT_CPU_DIRECTORY = "/root/NodeMonitorSnapshot/Cpu";
}
if (!process.env.NODE_MONITOR_SNAPSHOT_MEMORY_DIRECTORY) {
    process.env.NODE_MONITOR_SNAPSHOT_MEMORY_DIRECTORY = "/root/NodeMonitorSnapshot/Memory";
}

mkdirp(process.env.NODE_MONITOR_CRASH_LOGS_DIRECTORY, function (err) {
    if (err) { console.error(err); }
});

mkdirp(process.env.NODE_MONITOR_SNAPSHOT_CPU_DIRECTORY, function (err) {
    if (err) { console.error(err); }
});

mkdirp(process.env.NODE_MONITOR_SNAPSHOT_MEMORY_DIRECTORY, function (err) {
    if (err) { console.error(err); }
});


exports.Endpoint = require('./endpoint.js');
exports.stacktrace = require('./stacktrace.js');


 exports.Metrics = require('./metrics.js');
 exports.Snapshot = require('./snapshot.js');


exports.MetricsNotCluster = require('./metricsExpress.js');
exports.SnapshotExpress = require('./snapshotExpress.js');
exports.MetricsCluster = require('./metricsExpressCluster.js');

