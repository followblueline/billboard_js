
// Uncaught TypeError: Failed to resolve module specifier "billboard.js". Relative references must start with either "/", "./", or "../".
//npimport bb, { line, areaSpline } from 'billboard.js';


// https://github.com/naver/billboard.js/issues/286
// separated the data to get transformed tick values
var data = [
  ["x", "2021-01-08 22:05:00", "2021-02-08 23:12:00", "2021-02-09 00:09:00", "2021-04-09 01:21:00"],
  ["data1", 212, 133, 44, 38]
];

var chart = bb.generate({
  data: {
		x: "x",
		xFormat: '%Y-%m-%d %H:%M:%S',
		columns: data
	},
	axis: {
		x: {
			type: "timeseries",
			tick: {
			    format: "%Y-%m-%d",
		            values: data[0].concat().splice(1).map(function(v) {
                		return v.substring(0,10) + " 00:00:00";
		            })
		    }
		}
	},
  zoom: {
    enabled: true, // for ESM specify as: zoom()
    type: "drag"
  },
  bindto: "#dragZoom"
});

chart.load({
  columns: [
	  ["x", "2021-01-03 00:00:00"],
	  ["EXTRA", 400]
  ]
});

export default chart;