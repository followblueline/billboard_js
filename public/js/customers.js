
// Uncaught TypeError: Failed to resolve module specifier "billboard.js". Relative references must start with either "/", "./", or "../".
//npimport bb, { line, areaSpline } from 'billboard.js';


// https://github.com/naver/billboard.js/issues/286
// separated the data to get transformed tick values
let data = [
	["x", 
  "2021-01-01", "2021-01-02", "2021-01-03", "2021-01-04", "2021-01-05", "2021-01-06", "2021-01-07", "2021-01-08", "2021-01-09", "2021-01-10", "2021-01-11", "2021-01-12",
  "2021-02-01", "2021-02-02", "2021-02-03", "2021-03-04", "2021-04-05", "2021-05-06", "2021-06-07", "2021-06-08", "2021-06-09", "2021-06-10", "2021-06-11", "2021-06-12"],
	["sample1", 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250],
  ["sample2", 10, 20, 10, 40, 15, 25, null, 20, 10, 22, 15, 25, null, 10, 20, 10, 40, 15, 25, null, 20, 10, 22, 15, 25]
];

var chart = bb.generate({
  data: {
    xs: {
      'aaa': "x1",
      'bbb': "x2",
      'ccc': "x3"
    },
          xFormat: `%Y-%m-%d`,
          columns: [
      ["x1", "2021-01-01", "2021-02-01", "2021-03-01", "2021-04-01", "2021-05-01", "2021-06-01"],
      ["x2", "2021-01-01", "2021-02-04", "2021-03-10", "2021-04-01", "2021-05-11", "2021-06-21"],
      ["x3", "2021-01-01", "2021-02-11", "2021-03-16", "2021-04-01", "2021-05-22", "2021-06-19"],
      ["aaa", 75, 120, 80, 90, 100, 111],
      ["bbb", 50, 50, 95, 70, 150, 131],
      ["ccc", 25, 70, 110, 90, 59, 75],
    ],
    type: 'line',
    // can't group:
    // The data bound to different xs, will make data to be rendered as in different x scales for each data series.
    // well, this mainly comes from treating xs as different scale space even they're having same x tick values.
    // https://github.com/naver/billboard.js/issues/2098
    // stacking sample https://github.com/naver/billboard.js/issues/392
    // groups: [
    //   [
    //     "aaa",
    //     "bbb",
    //     "ccc"
    //   ]
    // ]
	},
	axis: {
		x: {
			type: "timeseries",
			tick: {
        //count: 4, can't control placement // https://naver.github.io/billboard.js/demo/#Axis.XAxisTickCount
        format: "%b\n%d",//"%Y-%m-%d",
        values: [
          "2021-01-01",
          "2021-02-01",
          "2021-03-01",
          "2021-04-01",
          "2021-05-01",
          "2021-06-01",
          "2021-07-01",
        ]
      }
		}
	},
  // tooltip: {
  //   format: {
  //     title: function(d) {
  //       // d = Date obj
	// 	    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  //     },
  //     value: function(value, ratio, id) {
  //       // var format = id === "sample1" ? 'S1: '+ d3.format(',') : 'Other: ' + d3.format(',');
  //       var format = id === "sample1" ? d3.format(',') : d3.format('$');
  //       return format(value);
  //     }
  //   }
  //},
  zoom: {
    enabled: true, // for ESM specify as: zoom()
    type: "drag"
  },
  bindto: "#dragZoom"
});

// chart.load({
//   columns: [
// 	  ["x", "2021-01-03"],
// 	  ["EXTRA", 330]
//   ]
// });

export default chart;