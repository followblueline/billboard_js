//import Chart from 'chart.js/auto';
let chart1 = null;
let self = this;
//import {CrosshairPlugin,Interpolate} from '/libs/chartjs-plugin-crosshair.js'
//Chart.register(CrosshairPlugin);

var colors = ["#e6194b", "#3cb44b", "#42d4f4", "#911eb4", "#f58231", "#bfef45", "#4363d8", "#dcbeff", "#006400", "#800000", "#fabed4", "#ff69b4"];
var ctx1 = document.getElementById('chart1');
import {requests as data} from '/data/requests.js'

let blacklist = [], whitelist = [], none = [];
for(let i=0, j=data.length; i<j;i++){
    let curr = data[i];
    curr.time = curr.time.substring(0,10) + 'T00:00:00Z'
    let dateObj = new Date(curr.time);
    curr.epoch = dateObj.getTime();
    if (curr.type == 'blacklist'){
        blacklist.push(curr);
    } else if (curr.type == 'whitelist'){
        whitelist.push(curr);
    } else {
        none.push(curr);
    }
}

console.log(blacklist);
let chartData = {
    //labels: labels,
    datasets: [{
      label: 'Blacklist',
      data: blacklist,//data.filter(x => x.type == 'blacklist'),
      backgroundColor: colors[0],
      parsing: {
        xAxisKey: 'epoch',
        yAxisKey: 'count'
      }
    }, {
      label: 'Whitelist',
      data: whitelist,//data.filter(x => x.type == 'whitelist'),
      backgroundColor: colors[1],
      parsing: {
        xAxisKey: 'time',
        yAxisKey: 'count'
      }
    }, {
      label: 'None',
      data: none,//data.filter(x => x.type == 'none'),
      backgroundColor: colors[2],
      parsing: {
        xAxisKey: 'time',
        yAxisKey: 'count'
      }
    }]
};
  
let config = {
    type: 'bar',
    data: chartData,
    options: {
        interaction: {
            mode: 'x'
        },
        plugins: {
            title: {
                display: true,
                text: 'Requests distribution'
            },
            tooltip: {
                callbacks: {
                    title: tooltipItems => {
                        return tooltipItems[0].raw.time || '';
                    },
                }
            }
        },
        zoom: {
            enabled: true,                                      // enable zooming
            zoomboxBackgroundColor: 'rgba(66,133,244,0.2)',     // background color of zoom box 
            zoomboxBorderColor: '#48F',                         // border color of zoom box
            zoomButtonText: 'Reset Zoom',                       // reset zoom button text
            zoomButtonClass: 'reset-zoom',                      // reset zoom button class
        },
        crosshair: {
            sync: {
                enabled: false,
                group: 1
            },
            callbacks: {
                beforeZoom: () => function(start, end) {                  
                // called before zoom, return false to prevent zoom
                //  console.log('beforeZoom',start, end, self.chart.data);
                return true;
                },
                afterZoom: (x) => function(start, end) {
                    console.log('afterZoom', start, end, x)
                    setTimeout(function() {
                        // https://chartjs-plugin-crosshair.netlify.app/
                        // https://chartjs-plugin-crosshair.netlify.app/samples/
                        chart1.data.datasets[0].data = blacklist.filter(x => x.epoch >= start && x.epoch <= end);
                        chart1.data.datasets[1].data = whitelist.filter(x => x.epoch >= start && x.epoch <= end);
                        chart1.data.datasets[2].data = none.filter(x => x.epoch >= start && x.epoch <= end);
                        chart1.update();
                    }, 200)
                }
            }
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
                type: 'time',
                time: {
                unit: 'day'
                },
                min: '2021-07-01T00:00:00Z',
                max: '2021-10-31T00:00:00Z'
            },
            y: {
                stacked: true,
                beginAtZero: true,
                grid:{
                    display:true
                },
                ticks: {
                    callback: function(value, index, values) {
                        // only integers
                        if (value % 1 === 0)
                        return value;
                    }
                }
            },
        }
    }   
};

chart1 = new Chart(ctx1, config);

function dateToISOdateString(date) {
if (!date){
    return null;
}
return date.getFullYear() +'-'+ (date.getMonth() +1).toString().padStart(2,'0') +'-'+ date.getDate().toString().padStart(2,'0');
}

export default { chart1 }