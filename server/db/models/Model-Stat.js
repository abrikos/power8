import moment from "moment";

const axios = require('axios')
const parser = require('xml2json');
const convert = require('xml-js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'stat';

const modelSchema = new Schema({
        cpus: [{usr: Number, sys: Number, temp: Number, cpu:Number}],
        gpus: [{mem: Number, sys: Number, temp: Number}],
        mem: {total: Number, used: Number, active: Number, inactive: Number, free: Number},
        centaurus: [Number]
    },
    {
        timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
        //toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

modelSchema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
    })

modelSchema.statics.fetchData = async function () {
    const site = 'https://cc.asrsya.ru/stat/'
    const gpuRes = await axios(site + 'gpu.xml')
    const cpu = await axios(site + 'cpu.json')
    const mem = await axios(site + 'mem.json')
    const sens = await axios(site + 'sensors.json')
    let ggppu = {}
    try {
        ggppu = JSON.parse(convert.xml2json(gpuRes.data, {compact: true, spaces: 4}))
    } catch (e) {
        //console.log('errrrrrrrrrrrr',e)
    }

    const gpu = ggppu.nvidia_smi_log ? ggppu.nvidia_smi_log.gpu : []

    const data = {
        gpu,
        //cpu1: cpu.data,
        cpu: cpu.data.sysstat.hosts[0].statistics[0]['cpu-load'],
        mem: mem.data
    }
    const cpus = cpu.data.sysstat.hosts[0].statistics[0]['cpu-load']
    let core;
    cpus.shift()
    for (const cpu of cpus) {
        if (sens.data["ibmpowernv-isa-0000"][`Core ${cpu.cpu * 1}`]) {
            core = sens.data["ibmpowernv-isa-0000"][`Core ${cpu.cpu * 1}`]

        }

        cpu.temp = core[Object.keys(core)[0]];

    }
    return await this.create({
        gpus: gpu.map(g => {
            return {
                sys: g.utilization.gpu_util._text.replace('%',''),
                mem: g.utilization.memory_util._text.replace('%',''),
                temp: g.temperature.gpu_temp._text.replace('C','')
            }
        }),
        cpus,
        mem: {total: mem.data[0].quantity, used: mem.data[1].quantity, active: mem.data[2].quantity, inactive: mem.data[3].quantity, free: mem.data[4].quantity}
    })

}

export default mongoose.model(name, modelSchema)


