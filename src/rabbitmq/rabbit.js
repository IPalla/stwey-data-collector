var amqp = require('amqplib/callback_api');
var elasticService = require('../elastic/elastic');
const config = require('../config/config');

const eventsQueue = config.tweetsQueueName;
const rabbitConfig = { hostname: config.rabbitHost, username: config.rabbitUsr, password: config.rabbitPwd };

module.exports = amqp.connect(rabbitConfig, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    console.log('[x] Listening for incoming messages...');
    channel.assertQueue(eventsQueue, {
      durable: true
    });
    channel.consume(eventsQueue, async (msg) => {
        console.debug("[x] Received %s", msg.content.toString());
        try {
          await elasticService.addNewTweet(JSON.parse(msg.content.toString()));
        } catch (err) {
          channel.nack(msg, false);
        }
        channel.ack(msg);
      }, {
          noAck: false
    });
  });
});
