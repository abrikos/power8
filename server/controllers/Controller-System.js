import Mongoose from "server/db/Mongoose";
const os = require('os');
const si = require('systeminformation');
si.graphics()
    .then(data => console.log(data))
    .catch(error => console.error(error));

module.exports.controller = function (app) {


    app.post('/api/os/data', async (req, res, next) => {
        const data = {
            cpus: os.cpus(),
            mem: {
                total: os.totalmem(),
                free: os.freemem()
            },
            gpu: await si.graphics()
        }
        res.send(data)
    });


};
