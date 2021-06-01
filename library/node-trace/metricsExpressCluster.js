const monitx = require('./node-trace.js');
const AggregatorRegistry = monitx.AggregatorRegistry;
const clusterRegistry = new AggregatorRegistry();

module.exports = function (app, express) {
    var Router = express.Router();


   Router.get('/metrics', (req, res) => {
              clusterRegistry.clusterMetrics((err, metrics) => {
                      if (err) console.log(err);
                      res.set('Content-Type', clusterRegistry.contentType);
                      res.send(metrics);
              });
      });
return Router;
}

// const fs = require('fs');
// var request = require('request');

/*
*
*To log the crash stacktrace
*/

// process.on("uncaughtException", function (err) {


//     fs.writeFile(process.env.NODE_MONITOR_CRASH_LOGS_DIRECTORY + "/" + (Date.now()) + '.txt', err.message + "\n" + err.stack, (error) => {

//         if (error) { console.log("Failed to save the crash logs locally", error) };


//         logCrashStackTraceRemotely(err.message + "\n" + err.stack);

//         setTimeout(function () {
//             process.exit(1);
//         }, 5000);
//     });

// });

// function logCrashStackTraceRemotely(error) {
//     try {

//         request.post(
//             'http:\/\/' + process.env.NODE_MONITOR_IP + '/stacktrace',
//             { json: { stacktrace: error } },
//             function (error, response, body) {

//                 if (response && response.statusCode == 200) {
//                     console.log("Crash logs remotely logged succesfully");
//                 }
//                 else {
//                     if (error) { console.log(error) } else { console.log("Failed to log the crash logs remotely"); }
//                 }
//                 process.exit(1);

//             }
//         );

//     } catch (err) {
//         console.log(err);
//         process.exit(1);
//     }
// }
