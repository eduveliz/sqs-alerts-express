import AWS from 'aws-sdk';
import {Response} from 'express';
import {config} from "../../services/aws";

export default class CreationAlert {
    sendAlert = (id: string, quantity: string, res: Response<any, Record<string, any>>) => {
        const sqs = new AWS.SQS(config);
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
                id: id,
                date: (new Date()).toISOString(),
                quantity: quantity
            }),
            QueueUrl: config.queueUrl
        };
        sqs.sendMessage(params, (err, data) => {
            if (err) {
                console.log("Error", err);
                res.send({
                    status: 'error',
                    error: err
                });
            } else {
                console.log("Successfully added message", data.MessageId);
                res.send({
                    status: 'Complete',
                    data: data,
                    message: {
                        id: id,
                        date: (new Date()).toISOString(),
                        quantity: quantity
                    }
                });
            }
        });
    }
}
