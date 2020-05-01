
import {
  select,
  hierarchy,
  pack,
  nest
} from 'd3'

import data from '../data/filter.json'

const WIDTH = 1000
const h = hierarchy(data).sum(d => d.value)
// packed
const packedPack = pack().size([WIDTH, WIDTH]).padding(2)(h)


const svg = select('#chart').append('svg')
  .attr('viewBox', `0 0 ${WIDTH} ${WIDTH}`)

  const node = svg.selectAll("g")
  .data(nest().key(d => d.height).entries(packedPack.descendants()))
  .join("g")
  .selectAll("g")
  .data(d => d.values)
  .join("g")
  .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)

  node.append("circle")
  .attr('stroke', 'black')
  .attr('fill', 'none')
  .attr("r", d => d.r)
const leaf = node.filter(d => !d.children)

leaf.append("text")
  .attr('font-size', 8)
  .attr("text-anchor", "middle")
  .selectAll("tspan")
  .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
  .join("tspan")
  .attr("x", 0)
  .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
  .text(d => d)

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

/* canvas width and hight 

pseudo code 
créer des cercle radius 
radius propotionel a value 
max raduis = ingénieurie des medias 
labelé name 
.fill 
.color

mouseover()
.show(nombre)

onclic()
.hide parrents
.remouve attr fill
.add attr strok
max radus = radus element 
.show children 
 */