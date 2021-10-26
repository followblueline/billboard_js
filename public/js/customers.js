
// Uncaught TypeError: Failed to resolve module specifier "billboard.js". Relative references must start with either "/", "./", or "../".
//npimport bb, { line, areaSpline } from 'billboard.js';

var chart = bb.generate({
  data: {
    x: "x",
    columns: [
      ["x", "2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05", "2013-01-06"],
      ["data1", 30, 200, 100, 400, 150, 250],
      ["data2", 130, 340, 200, 500, 250, 350]
    ]
  },
  axis: {
    x: {
      type: "timeseries",
      tick: {
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

export default chart;