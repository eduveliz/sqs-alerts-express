import AWS from 'aws-sdk';

const sqsConfig = {
    apiVersion: "",
    accessKeyId: "",
    secretAccessKey: "",
    region: 'us-east-1'
}

export default class Alerts {

    sendAlert = () => {
        const sqs = new AWS.SQS(sqsConfig);
        const params = {
            MessageBody: JSON.stringify({
                order_id: 789,
                date: (new Date()).toISOString()
            }),
            QueueUrl: ''
        };
        sqs.sendMessage(params, (err, data) => {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Successfully added message", data.MessageId);
            }
        });
    }
}
