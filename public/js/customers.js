
// Uncaught TypeError: Failed to resolve module specifier "billboard.js". Relative references must start with either "/", "./", or "../".
//npimport bb, { line, areaSpline } from 'billboard.js';


// https://github.com/naver/billboard.js/issues/286
// separated the data to get transformed tick values
let data = [
	["x", "2021-01-01", "2021-01-02", "2021-01-03", "2021-01-04", "2021-01-05", "2021-01-06", "2021-01-07", "2021-01-08", "2021-01-09", "2021-01-10", "2021-01-11", "2021-01-12"],
	["sample1", 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250],
  ["sample2", 10, 20, 10, 40, 15, 25, null, 20, 10, 22, 15, 25]
];

var chart = bb.generate({
  data: {
		x: "x",
		//xFormat: '%Y-%m-%d',
		columns: data,
    type: "line"
	},
	axis: {
		x: {
			type: "timeseries",
			tick: {
        count: 4,
        format: "%Y-%m-%d"
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
	  ["x", "2021-01-03"],
	  ["EXTRA", 330]
  ]
});

export default chart;