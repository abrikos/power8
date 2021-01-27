import Mongoose from "server/db/Mongoose";
const CronJob = require('cron').CronJob;



module.exports.controller = function (app) {
    const job = new CronJob('0 * * * * *', async function () {
        const data = await Mongoose.stat.fetchData()
    }, null, true, 'America/Los_Angeles');

    Mongoose.stat.fetchData()


    app.post('/api/os/data', async (req, res, next) => {
        Mongoose.stat.findOne()
            .sort({createdAt: -1})
            .then(r=>res.send(r))
    });


};
