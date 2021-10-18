import moment from "moment";

const fs = require('fs');
const axios = require('axios')
const convert = require('xml-js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'systemdata';


const modelSchema = new Schema({
    cpuUtil:Number,
    gpuUtil:Number,
    gpuTemp:Number,
    cpuTemp:Number,
    memUsed:Number,
        cpus: [{usr: Number, sys: Number, temp: Number, cpu: Number}],
        gpus: [{mem: Number, sys: Number, temp: Number}],
        mem: {total: Number, used: Number, active: Number, inactive: Number, free: Number},
        centaurus: [Number],
        watts: Number
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

async function fetch(url) {
    return axios(url).catch(e => console.log(e.message, url));
}

modelSchema.statics.fetchData = async function () {
    try {
        const site = process.env.DATA_SITE;
        const gpuRes = await fetch(site + 'gpu.xml')
        const cpu = await fetch(site + 'cpu.json')
        const mem = await fetch(site + 'mem.json')
        const sens = await fetch(site + 'sensors.json')
        const w = await fetch(site + 'watts.txt')
        try {

            const watts = w.data.match(/Average power reading over sample period:(.*) Watts/)

            let ggppu = {}
            try {
                ggppu = JSON.parse(convert.xml2json(gpuRes.data, {compact: true, spaces: 4}))
            } catch (e) {
                //console.log('errrrrrrrrrrrr',e)
            }
            const gpu = ggppu.nvidia_smi_log ? ggppu.nvidia_smi_log.gpu : []
            const cpusData = cpu.data.sysstat.hosts[0].statistics[0]['cpu-load'][0]
            let core;

            let cpuTemp = 0
            for (let core = 0; core < 16; core++) {
                cpuTemp += sens.data["ibmpowernv-isa-0000"]['Core ' + (core * 8)][`temp${core + 1}_input`]
            }

            const data = await this.create({
                watts: watts[1],
                gpuUtil: gpu.map(g=>g.utilization.gpu_util._text.replace('%', '')*1).reduce((a,b)=>a+b,0)/4,
                gpuTemp: gpu.map(g=>g.temperature.gpu_temp._text.replace('C', '')*1).reduce((a,b)=>a+b,0)/4,
                cpuUtil: cpusData.sys,
                cpuTemp:cpuTemp/16,
                gpus: gpu.map(g => {
                    return {
                        sys: g.utilization.gpu_util._text.replace('%', ''),
                        mem: g.utilization.memory_util._text.replace('%', ''),
                        temp: g.temperature.gpu_temp._text.replace('C', '')
                    }
                }),
                mem: {
                    total: mem.data[0].quantity,
                    used: mem.data[1].quantity,
                    active: mem.data[2].quantity,
                    inactive: mem.data[3].quantity,
                    free: mem.data[4].quantity
                }
            })
            return data
        } catch (e) {
            console.log(e)
        }

    } catch (e) {
        console.log(e)
    }

}

export default mongoose.model(name, modelSchema)


