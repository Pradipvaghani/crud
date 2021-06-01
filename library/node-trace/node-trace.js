'use strict';

exports.register = require('./lib/trace/registry').globalRegistry;
exports.Registry = require('./lib/trace/registry');
exports.contentType = require('./lib/trace/registry').globalRegistry.contentType;

exports.Counter = require('./lib/trace/counter');
exports.Gauge = require('./lib/trace/gauge');
exports.Histogram = require('./lib/trace/histogram');
exports.Summary = require('./lib/trace/summary');
exports.Pushgateway = require('./lib/trace/pushgateway');

exports.linearBuckets = require('./lib/trace/bucketGenerators').linearBuckets;
exports.exponentialBuckets = require('./lib/trace/bucketGenerators').exponentialBuckets;

exports.collectDefaultMetrics = require('./lib/trace/defaultMetrics');

exports.aggregators = require('./lib/trace/metricAggregators').aggregators;
exports.AggregatorRegistry = require('./lib/trace/cluster');
