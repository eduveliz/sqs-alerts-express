import {Consumer} from "sqs-consumer";
import AWS from "aws-sdk";
import {config} from "../../services/aws";
import {Response} from "express";

export default class ListenAlert {
    listen = (res: Response<any, Record<string, any>>) => {
        const app = Consumer.create({
            queueUrl: config.queueUrl,
            handleMessage: async (message) => {
                console.log({
                    id: message.MessageId,
                    message: message.Body
                })
            }, sqs: new AWS.SQS(config)
        });

        app.on('error', (err: any) => {
            console.error(err.message);
        });

        app.on('processing_error', (err: any) => {
            console.error(err.message);
        });
        app.start();

        res.send({
            Message: 'Messages is on backend console',
        });
    }
}
