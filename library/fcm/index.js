const FCM = require('fcm-push');
const config = require("../../config")
const fcm = new FCM(config.fcm.FCM_SERVER_KEY);

const notifyFcmTpic = (request, callback) => {
let payload;
let resData = {
// action: request.action || 1,
pushType: request.pushType || 1,
title: request.title || '',
categoryIdentifier: "chat.category",
msg: request.msg || '',
data: request.data || []
}

payload = {
to: '/topics/' + request.fcmTopic, // required fill with device token or topics
collapse_key: 'your_collapse_key',
priority: 'high',
"delay_while_idle": true,
"dry_run": false,
"time_to_live": 3600,
"content_available": true,
badge: "1",
data: resData,
categoryIdentifier: "chat.category"
};

payload["notification"] = {
title: request.title,
body: request.msg,
sound: "default",
data: resData,
categoryIdentifier: "chat.category"
};

//promise style
// console.log("payload ", payload)
fcm.send(payload)
.then(function (response) {
console.log("Successfully sent with response: ", response);
return callback(true);
})
.catch(function (err) {
console.log("Something has gone wrong!", err);
return callback(false);
});
}

/**
* Function to send push notification to specified push tokens
* registrationTokens: Array of registration tokens(push tokens)
* payload: must be object
format: {
notification : { body : "string", title : "string", icon : "string" },
data: { field1: 'value1', field2: 'value2' } // values must be string
}
*/
async function sendPushToToken(registrationTokens, payload) {

/**
* Send a message to devices subscribed to the provided topic.
*/

var message = {
to: registrationTokens, // required fill with device token or topics
collapse_key: 'your_collapse_key',
data: payload.data,
notification: payload.notification
};

//callback style
fcm.send(message, function (err) {
if (err) {
console.log("Something has gone wrong!", err);
} else {
console.log("Successfully sent with response: ");
}
});



}
module.exports = {
notifyFcmTpic,
sendPushToToken
}