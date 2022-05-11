import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import Alerts from "./src/modules/alert/alert";

dotenv.config();

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    const alert = new Alerts;
    alert.sendAlert();
    res.send('send sqs message');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
