import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import CreationAlert from "./src/modules/alert/creationAlert";
import {Creation} from "./src/interfaces/Inteface-alerts";
import ListenAlert from "./src/modules/alert/ListenAlert";

dotenv.config();

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req: Request, res: Response) => {
    res.send("working...");
});

app.post('/creation', (req: Request, res: Response) => {
    const creation: Creation = {
        id: req.body.id,
        quantity: req.body.quantity,
    }
    const creationAlert = new CreationAlert;
    creationAlert.sendAlert(creation.id, creation.quantity , res);
})

app.get('/listen', (req: Request, res: Response) => {
    const listenAlert = new ListenAlert;
    listenAlert.listen(res)
})


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
