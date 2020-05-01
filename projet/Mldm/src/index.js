import {
  select,
  pack,
  hierarchy,
} from 'd3'

import data from '../data/filter.json'

console.log(data)

const radius = 700;

const svg = select("#chart").append("svg")
  .attr("width", radius)
  .attr("height", radius)
  .attr("id", "svg");

const g = svg.append("g").attr("transform", "translate(2,2)");

const packLayout = pack()
  .size([radius - 4, radius - 4]) // lié à la translation précédente
  .padding(1.5);

  let root = hierarchy(data)
    .sum(d => d.nombre)
    .sort((a, b) => b.value - a.value);

    root = packLayout(root).descendants();

/*
function mouseover(d) {
  d3.select("#amount")
    .text(d.value.toLocaleString('fr-FR', {
      minimumFractionDigits: 0,
      style: 'currency',
      currency: 'EUR'
    }));

  var sequenceArray = d.ancestors().reverse();
  sequenceArray.shift(); // suppression de la racine

  d3.select("#category-amount")
    .text("");
  d3.select("#type-amount")
    .text("");

  sequenceArray.forEach(d => {
    if (d.depth === 1) {
      d3.select("#entreprise")
        .text(d.data.name);
    } else if (d.depth === 2) {
      d3.select("#type-amount")
        .text(d.data.name);
    } else if (d.depth === 3) {
      let text = d.data.name
        .replace("Académies, Fondation, sociétés savantes, organismes de conseils", "Académies, Fondation, ...")
        .replace("Personnes morales assurant la formation initiale ou continue des professionnels de santé", "Personnes morales assurant ...");
      d3.select("#category-amount")
        .text(text);
    }
  });

  d3.selectAll("path") // On grise tous les segments
    .style("opacity", 0.3);

  vis.selectAll("path") // Ensuite on met en valeur uniquement ceux qui sont ancêtres de la sélection
    .filter(function (node) {
      return (sequenceArray.indexOf(node) >= 0);
    })
    .style("opacity", 1);
}*/


/*function mouseleave(d) {
  // On désactive la fonction mouseover le temps de la transition
  d3.selectAll("path").on("mouseover", null);

  // Transition pour revenir à l'état d'origine et on remet le mouseover
  d3.selectAll("path")
    .transition()
    .duration(1000)
    .style("opacity", 1)
    .on("end", function () {
      d3.select(this).on("mouseover", mouseover);
    });
}*/