/**
 * @Author: nilanjan
 * @Date:   2018-11-04T03:23:17+05:30
 * @Email:  nilanjandaw@gmail.com
 * @Filename: broker.js
 * @Last modified by:   nilanjan
 * @Last modified time: 2018-11-08T05:08:04+05:30
 * @Copyright: Nilanjan Daw
 */

const mosca = require('mosca')
const models = require('./models');
const jwt = require('jsonwebtoken');
const config = require('./config');
var ascoltatore = {
    type: 'redis',
    redis: require('redis'),
    db: 12,
    port: 6379,
    return_buffers: true, // to handle binary payloads
    host: "localhost"
};

var moscaSettings = {
    port: 1883,
    backend: ascoltatore,
    persistence: {
      factory: mosca.persistence.Redis
    }
};

var authenticate = function(client, username, password, callback) {
  if (username === 'JWT') {
    jwt.verify(password.toString(), config.jwt_secret, function(err, decoded) {
      if (err)
        callback(null, false)
      else {
        client.workspace_id = decoded.workspace_id
        callback(null, true);
      }
    })
  } else {
    callback(null, false)
  }
}

var authorizePublish = function(client, topic, payload, callback) {
  callback(null, client.workspace_id === topic.split('/')[0]);
}

var authorizeSubscribe = function(client, topic, callback) {
  callback(null, client.workspace_id === topic.split('/')[0]);
}

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function(client) {
	console.log('client connected', client.id);
});

server.on('clientDisconnected', function(client) {
  console.log('Client Disconnected:', client.id);
});


server.on('published', function(packet, client) {
  if (!packet.topic.startsWith("$SYS/")) {
    let payload = packet.payload.toString()
    payload = JSON.parse(payload)
    console.log('Published', packet.topic, payload);
    models.message
      .create(payload)
      .then(message => {
        console.log(message.dataValues);
      })
  }
});

// fired when the mqtt server is ready
function setup() {
  server.authenticate = authenticate;
  server.authorizePublish = authorizePublish;
  server.authorizeSubscribe = authorizeSubscribe;

  console.log('Message broker is up and running')
}
