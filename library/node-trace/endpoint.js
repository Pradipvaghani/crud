const monitex = require('./node-trace.js')
const collectDefaultMetrics = monitex.collectDefaultMetrics;

collectDefaultMetrics({ timeout: 5000 });

const httpRequestDurationMicroseconds = new monitex.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]  // buckets for response time from 0.1ms to 500ms
})


module.exports.onComplete = function (requestTime, method, path, status) {


  const responseTimeInMs = Date.now() - requestTime;

  httpRequestDurationMicroseconds
    .labels(method, path, status)
    .observe(responseTimeInMs);
}

// Graceful shutdown
// process.on('SIGTERM', () => {
//   clearInterval(metricsInterval)
// })
