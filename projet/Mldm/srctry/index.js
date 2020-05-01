import {
  select,
  hierarchy,
  pack,
  nest,
  event,
  interpolateZoom,

} from 'd3' // import all the d3. of observable 

import data from '../data/filter.json' // import data from correct folder 

console.log(data) // debug infos

const WIDTH = 1000
const h = hierarchy(data).sum(d => d.value) 

const packedPack = pack().size([WIDTH, WIDTH]).padding(2)(h) // packed data 
let focus = packedPack; // initial view
let view;

const svg = select('#chart').append('svg') //basique caneva + pointer et click interaction 
  .attr('viewBox', `0 0 ${WIDTH} ${WIDTH}`)
      .style("overflow", "visible")
        .attr("text-anchor", "middle")
        .style("display", "block")
          .style("margin", "0 -14px")
.style("cursor", "pointer")
  .on("click", () => console.log('click') /* zoom(packedPack) */ ); 
  //click sur rien retourne à la position de base 


  const node = svg.selectAll("g")
  .data(nest().key(d => d.height).entries(packedPack.descendants())) // créer l'architecture rentre dans les obejet
  .join("g")
  .selectAll("g")
  .data(d => d.values)
  .join("g")
  .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`) // decale légérement les point pour pas qu'il se chevauche 


   node.append("circle")
  .attr('stroke', 'black')
  .attr('fill', 'none')
  .attr("r", d => d.r)
  .attr("pointer-events", d => !d.children ? "none" : null) // si pas d'enfant pas de zoom
    
  .on("mouseover", function () { // marche pas 
      select(this).attr("stroke", "#000");
      console.log('souris in')
    })
    .on("mouseout", function () { // marche pas 
      select(this).attr("stroke", null);
      console.log('souris out')
    })
    .on("click", d => focus !== d && (zoom(d), event.stopPropagation()));

    const leaf = node.filter(d => !d.children)

/* node.append("text") // add text to parents 
.attr('font-size', 8)
    .attr("text-anchor", "middle")
    
    
    console.log(data.name) // trouve le premier puis bug  
    .attr("x", 0)
    .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
    .text(d => d) */

// créer les cercles 

 leaf.append("text")
  .attr('font-size', 8)
  .attr("text-anchor", "middle")
  .attr("pointer-events", "none")
  .selectAll("tspan")
  .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
  .join("tspan") 
  /*.style("fill-opacity", d => d.parent === packedPack ? 1 : 0) // transparent si pas de parent
  .style("display", d => d.parent === packedPack ? "inline" : "none") // nom invisible si il a un parent  */
  .attr("x", 0)
  .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
  .text(d => d)  
  

  




// zoomTo([packedPack.x, packedPack.y, packedPack.r * 2]); // j'ai pas compris à quoi ça sert mais si on le décomante on voit le 4 de la page 

function zoomTo(v) {
  const k = WIDTH / v[2];

  view = v;

  leaf.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
  node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
  node.attr("r", d => d.r * k);
}



function zoom(d) {
  const focus0 = focus;

  focus = d;

  const transition = svg.transition()
    .duration(event.altKey ? 7500 : 750)
    .tween("zoom", d => {
      const i = interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
      return t => zoomTo(i(t));
    });

  label 
    .filter(function (d) {
      return d.parent === focus || this.style.display === "inline";
    })
    .transition(transition)
    .style("fill-opacity", d => d.parent === focus ? 1 : 0)
    .on("start", function (d) {
      if (d.parent === focus) this.style.display = "inline";
    })
    .on("end", function (d) {
      if (d.parent !== focus) this.style.display = "none";
    });
}


/*

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