
/**
 * FORKED AND EDITED FROM: https://github.com/chartjs/Chart.js/blob/master/docs/scripts/utils.js
 */

import Chart from 'chart.js/auto';
import { valueOrDefault } from 'chart.js/helpers';
import colorLib from '@kurkle/color';
import { DateTime } from 'luxon'

interface config {
    count?: number
    rmin?: number
    rmax?: number
    min?: number
    max?: number
    decimals?: number
    from?: Array<any>
    continuity?: number
}

var _seed = Date.now();

export function srand(seed: any) {
    _seed = seed;
}

export function rand(min?: number, max?: number) {
    min = valueOrDefault(min, 0);
    max = valueOrDefault(max, 0);
    _seed = (_seed * 9301 + 49297) % 233280;
    return min + (_seed / 233280) * (max - min);
}



function numbers(config: config) {
    var cfg = config || {};
    var min = valueOrDefault(cfg.min, 0);
    var max = valueOrDefault(cfg.max, 100);
    var from = valueOrDefault(cfg.from, []);
    var count = valueOrDefault(cfg.count, 8);
    var decimals = valueOrDefault(cfg.decimals, 8);
    var continuity = valueOrDefault(cfg.continuity, 1);
    var dfactor = Math.pow(10, decimals) || 0;
    var data = [];
    var i, value;

    for (i = 0; i < count; ++i) {
        value = (from[i] || 0) + rand(min, max);
        if (rand() <= continuity) {
            data.push(Math.round(dfactor * value) / dfactor);
        } else {
            data.push(null);
        }
    }

    return data;
}


function points(config: config) {
    const xs = numbers(config);
    const ys = numbers(config);
    return xs.map((x, i) => ({ x, y: ys[i] }));
}


const bubbles = (config: config) => {
    return points(config).map((pt: any) => {
        pt.r = rand(config.rmin, config.rmax);
        return pt;
    });
}




const COLORS = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba'
];

export function color(index: any) {
    return COLORS[index % COLORS.length];
}

export function transparentize(value: any, opacity: any) {
    var alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return colorLib(value).alpha(alpha).rgbString();
}

export const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

const NAMED_COLORS = [
    CHART_COLORS.red,
    CHART_COLORS.orange,
    CHART_COLORS.yellow,
    CHART_COLORS.green,
    CHART_COLORS.blue,
    CHART_COLORS.purple,
    CHART_COLORS.grey,
];

export function namedColor(index: any) {
    return NAMED_COLORS[index % NAMED_COLORS.length];
}

export function newDate(days: any) {
    return DateTime.now().plus({ days }).toJSDate();
}

export function newDateString(days: any) {
    return DateTime.now().plus({ days }).toISO();
}

export function parseISODate(str: any) {
    return DateTime.fromISO(str);
}

const myImage = new Image()
myImage.src = 'img/image.png';

const actions = [
    {
        name: 'Randomize',
        handler(chart: Chart, count: number) {
            chart.data.datasets.forEach(dataset => {
                dataset.data = bubbles({ count, rmin: 5, rmax: 15, min: 0, max: 100, });
            });
            chart.data.labels?.forEach(label => {
                label = '<img src="31" />'
            }) 
            chart.update();
        }
    },
    {
        name: 'Add Dataset',
        handler(chart: Chart, count: number) {
            const chartData = chart.data;
            const dsColor = namedColor(chartData.datasets.length);
            const newDataset = {
                label: 'Dataset ' + (chartData.datasets.length + 1),
                backgroundColor: transparentize(dsColor, 0.5),
                borderColor: dsColor,
                data: bubbles({ count, rmin: 5, rmax: 15, min: 0, max: 100 }),
            };
            chart.data.datasets.push(newDataset);
            chart.update();
        }
    },
    {
        name: 'Add Data',
        handler(chart: Chart, count?: number) {
            const chartData = chart.data;
            if (chartData.datasets.length > 0) {

                for (let index = 0; index < chartData.datasets.length; ++index) {
                    chartData.datasets[index].data.push(bubbles({ count: 1, rmin: 5, rmax: 15, min: 0, max: 100 })[0]);
                }

                chart.update();
            }
        }
    },
    {
        name: 'Remove Dataset',
        handler(chart: Chart, count?: number) {
            chart.data.datasets.pop();
            chart.update();
        }
    },
    {
        name: 'Remove Data',
        handler(chart: Chart, count?: number) {
            chart.data.datasets.forEach(dataset => {
                dataset.data.pop();
            });

            chart.update();
        }
    }
];

export default actions