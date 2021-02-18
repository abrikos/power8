import Mongoose from "server/db/Mongoose";

const CronJob = require('cron').CronJob;


module.exports.controller = function (app) {
    const job = new CronJob('0 * * * * *', async function () {
        const data = await Mongoose.stat.fetchData()
    }, null, true, 'America/Los_Angeles');

    //Mongoose.stat.fetchData().then(console.log)


    app.post('/api/os/data', async (req, res, next) => {
        Mongoose.stat.findOne()
            .sort({createdAt: -1})
            .then(r => res.send(r))
    });


    async function aggregateDay(type, limit) {
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
                    hour: {$dateToString: {format: "%Y-%m-%d", date: "$first", timezone:"Asia/Yakutsk"}},
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

    //Mongoose.stat.find({createdAt: {"$gt": new Date(Date.now() - 24 * 60 * 60 * 1000)}}).then(r=>console.log(r.map(c=>c.cpus)))

    async function aggregateHour() {

        const aggregate = [
            {$unwind: "$cpus"},
            {$unwind: "$gpus"},
            {$match: {createdAt: {"$gt": new Date(Date.now() - 24 * 60 * 60 * 1000)}}},
            {
                $group: {
                    _id: {
                        hour: {$hour: "$createdAt"},
                    },
                    first: {$min: "$createdAt"},
                    gpus: {$avg: "$gpus.sys"},
                    cpus: {$avg: "$cpus.usr"},
                    watts: {$avg: "$watts"},
                },

            },
            {$limit: 24},
            {$sort: {first: 1}},
            {
                $project: {
                    hour: {$dateToString: {format: "%H", date: "$first", timezone:"Asia/Yakutsk"}},
                    gpus: {$round: ["$gpus", 1]},
                    cpus: {$round: ["$cpus", 1]},
                    watts: {$round: ["$watts", 1]},
                }
            }
        ]
        //aggregate.unshift({$unwind: "$cpus"})
        //aggregate.unshift({$unwind: "$gpus"})

        const ret = await Mongoose.stat.aggregate(aggregate);
        //console.log(ret)
        return ret;
    }

    aggregateHour( )        .then(console.log)

    app.post('/api/daily/:type/:limit', async (req, res, next) => {
        res.send(await aggregateDay(req.params.type, req.params.limit))
    });

    app.post('/api/hourly', async (req, res, next) => {
        res.send(await aggregateHour( ))
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
