<template>
  <div id="my_dataviz"></div>
</template>

<script setup>

import { onMounted, watch, toRefs, reactive } from "vue";

import * as d3 from 'd3'

onMounted(()=> {
// set the dimensions and margins of the graph
const margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
const parseTime = d3.timeParse("%Y-%m-%d");

// set the ranges
const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

// define the line
const valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
const svg = d3.select("#my_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv").then(function(data) {

  // format the data
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.value = +d.value;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

})
    });
</script>


<style scoped lang="scss">
#graph {
  width: auto;
  height: 40vh;
}
#canvas {
  width: auto;
  height: 40vh;
}
.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}
path { 
    stroke: steelblue;
    stroke-width: 2;
    fill: none;
}
</style>