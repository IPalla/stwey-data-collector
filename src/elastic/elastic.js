var elasticsearch = require('elasticsearch');
const config = require('../config/config');

var client = new elasticsearch.Client({
    hosts: [config.esHost]
});

const eventTypes = {
    '3h-analysis': '3h-analysis',
    '8h-analysis': '8h-analysis',
    '12h-analysis': '12h-analysis',
    '24h-analysis': '24h-analysis',
    '48h-analysis': '48h-analysis',
    '36h-analysis': '36h-analysis',
};

function addNewTweet(event){
    const { type, payload} = event;
    return client.index({
        index: 'processed-tweet',
        body: {
            "creationDate": new Date(),
            "type": eventTypes[type],
            payload
        }
    }, function(err, resp, status) {
        return status;
    });
}

module.exports = {
    addNewTweet
}