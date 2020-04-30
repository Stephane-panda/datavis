import {
  select,
  pack,
  hierarchy,
} from 'd3'

import data from '../data/filter.json'

console.log(data)

const radius = 700;

const svg = d3.select("#chart").append("svg")
  .attr("width", radius)
  .attr("height", radius)
  .attr("id", "svg");

const g = svg.append("g").attr("transform", "translate(2,2)");

const packLayout = d3.pack()
  .size([radius - 4, radius - 4]) // lié à la translation précédente
  .padding(1.5);

  let root = d3.hierarchy(data)
    .sum(d => d.nombre)
    .sort((a, b) => b.value - a.value);

    root = packLayout(root).descendants();

  