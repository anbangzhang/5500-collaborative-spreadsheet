// a restful api server
// 1. create a server
// 2. create a router
// 3. create a controller
// 4. create a model
// 5. create a database
// 6. create a view
// 7. create a client
// 8. create a test
// 9. create a deployment

import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PortsGlobal } from './PortsGlobal';

import Database from './database';
import ManagerService from './service/ManagerService';
import GetSheetRequest from './service/request/GetSheetReqeust';
import CreateSheetRequest from './service/request/CreateSheetRequest';
import DeleteSheetRequest from './service/request/DeleteSheetRequest';
import LockCellRequest from './service/request/LockCellRequest';
import UpdateCellRequest from './service/request/UpdateCellRequest';

// define a debug flag to turn on debugging
const debug = true;

// define a shim for console.log so we can turn off debugging
if (!debug) {
    console.log = () => { };
}

const app = express();
app.use(bodyParser.json());

// Add a middleware function to log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(cors());



const db = new Database();
const managerService = new ManagerService();

app.post('/getSheetList', (req: express.Request, res: express.Response) => {
    const response = managerService.getSheetList();
    res.json(response);
});

app.post('/getSheet', (req: express.Request, res: express.Response) => {
    const request =  new GetSheetRequest(req.body.sheet_id);
    const response = managerService.getSheet(request);
    res.json(response);
});

app.post('/createSheet', (req: express.Request, res: express.Response) => {
    let token = req.headers.token;
    const request = new CreateSheetRequest(req.body.sheet_name, '');
    const response = managerService.createSheet(request);
    res.json(response);
});

app.post('/deleteSheet', (req: express.Request, res: express.Response) => {
    let token = req.headers.token;
    const request = new DeleteSheetRequest(req.body.sheet_id, '');
    const response = managerService.deleteSheet(request);
    res.json(response);
});

app.post('/lockCell', (req: express.Request, res: express.Response) => {
    let token = req.headers.token;
    const request = new LockCellRequest(req.body.sheet_id, req.body.cell_label, '');
    const success = managerService.lockCell(request);
    res.json(success);
});

app.post('/releaseCell', (req: express.Request, res: express.Response) => {
    let token = req.headers.token;
    const request = new LockCellRequest(req.body.sheet_id, req.body.cell_label, '');
    const success = managerService.releaseCell(request);
    res.json(success);
});

app.post('/updateCell', (req: express.Request, res: express.Response) => {
    let token = req.headers.token;
    const request = new UpdateCellRequest(req.body.sheet_id, req.body.cell_label, req.body.operator, '');
    const success = managerService.updateCell(request);
    res.json(success);
});


// get /tasks returns a list of all the tasks
app.post('/tasks', (req: express.Request, res: express.Response) => {
    let tasks = [];
    let documentName = req.body.documentName
    let test = req.body.test
    for (let [id, task] of db.getTasks(documentName)) {
        tasks.push({
            id: id,
            name: task.name,
            time: task.time,
            complete: task.complete,
            owner: task.owner
        });
    }
    res.json(tasks);
});


// get the port we should be using
const port = PortsGlobal.serverPort;
// start the app and test it
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

