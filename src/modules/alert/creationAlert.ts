import AWS from 'aws-sdk';

const sqsConfig = {
    apiVersion: "",
    accessKeyId: "",
    secretAccessKey: "",
    region: ''
}

export default class CreationAlert {

    sendAlert = (id: string, quantity: string) => {
        const sqs = new AWS.SQS(sqsConfig);
        const params = {
            MessageAttributes: {
                'Alert-Type': {
                    DataType: 'String',
                    StringValue: 'Creation'
                },
                'User': {
                    DataType: 'String',
                    StringValue: id
                },
                'date': {
                    DataType: 'String',
                    StringValue: (new Date()).toISOString()
                },
                'quantity': {
                    DataType: 'String',
                    StringValue: quantity
                },
            },
            MessageBody: JSON.stringify({
                message: 'New register',
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
