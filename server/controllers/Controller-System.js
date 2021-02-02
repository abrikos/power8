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
            .then(r => res.send(r))
    });


    async function aggregate(type, limit) {
        const types = {
            gpus: {unwind: "$gpus", temp: "$gpus.temp", util: "$gpus.sys", mem: "$gpus.mem"},
            cpus: {unwind: "$cpus", temp: "$cpus.temp", util: "$cpus.sys"},
            watts: {util: "$watts"},

        }
        if (!types[type] || !(limit > 0)) return []
        const aggregate = [
            {
                $group: {
                    _id: {
                        month: {$month: "$createdAt"},
                        day: {$dayOfMonth: "$createdAt"},
                        year: {$year: "$createdAt"}
                    },
                    first: {$min: "$createdAt"},
                    watts: {$sum: "$watts"},
                    temp: {$avg: types[type].temp},
                    util: {$avg: types[type].util},
                    mem: {$avg: types[type].mem},
                },

            },
            {$limit: limit * 1},
            {$sort: {first: 1}},
            {
                $project: {
                    date: {$dateToString: {format: "%Y-%m-%d", date: "$first"}},
                    temp: {$round: ["$temp", 1]},
                    util: {$round: ["$util", 1]},
                    mem: {$round: ["$mem", 1]},
                    watts: {$round: [{$divide: ["$watts", 1440]}, 1]}
                }
            }
        ]
        if (types[type].unwind) aggregate.unshift({$unwind: types[type].unwind})
        const ret = await Mongoose.stat.aggregate(aggregate);
        //console.log(ret)
        return ret;
    }

    //aggregate('gpus', 10)        .then(console.log)

    app.post('/api/daily/:type/:limit', async (req, res, next) => {
        res.send(await aggregate(req.params.type, req.params.limit))
    });

    app.post('/api/online/:limit', async (req, res, next) => {
        Mongoose.stat.find()
            .sort({createdAt: -1})
            .limit(req.params.limit * 1)
            .then(r => {
                res.send(r.reverse())
            })
    });


};
