'use strict'

const logger = require('winston');
const rabbitMq = require('../../library/rabbitMq');
const db = require('../../library/mongodb');

rabbitMq.connect(async () => {
    await db.connect();
    prepareConsumer(rabbitMq.getChannel(), rabbitMq.emailservice_queue, rabbitMq.get());
});

/**
 * Preparing Consumer for Consuming email Queue
 * @param {*} channel emailservice Channel
 * @param {*} queue  emailservice Queue
 * @param {*} amqpConn RabbitMQ connection
 */
function prepareConsumer(channel, queue, amqpConn) {
    channel.assertQueue(queue.name, queue.options, function (err) {
        if (err) {
            throw err;
            // process.exit();
        } else {
            channel.consume(queue.name, async function (msg) {
                var data = JSON.parse(msg.content.toString());

                logger.info("data ", data)
               


            }, { noAck: true }, function () {
                if (queue.worker.alwaysRun) {
                    // keep worker running
                } else {
                    //To check if need to exit worker
                    rabbitMq.exitWokerHandler(channel, queue, amqpConn);
                }
            });
        }
    });
}