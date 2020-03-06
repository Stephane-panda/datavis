import * as d3 from 'd3'

const WIDTH = 1000
const HEIGHT = 500


const svg = d3.select('body')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)

const DATA = [
  { nom: 'Lausanne', population: 138905 },
  { nom: 'Yverdon', population: 30143 },
  { nom: 'Montreux', population: 26574 },
  { nom: 'Renens', population: 21036 },
  { nom: 'Nyon', population: 20533 },
  { nom: 'Vevey', population: 19827 },
]

let getPieData = d3.pie().value(d => d.value)
let pieData = getPieData(DATA)

   const arcCreator = d3.arc()
        .innerRadius(20)
        .outerRadius(HEIGHT / 2 - 10) // pour que tout le camembert soit visible

      const color = ({
        data
      }) => {
        switch (data.name) {
          case 'Lausanne':
            return 'gold'
          case 'Yverdon':
            return 'grey'
            case 'Montreux':
            return 'blue'
            case 'Renens':
            return 'magenta'
            case 'Nyon':
            return 'black'
          default:
            return 'indianred'
        }
      }

      const pie = svg.append('g')
        .attr('transform', `translate(${HEIGHT / 2}, ${HEIGHT / 2})`)

       pie.selectAll('path')
      .data(pieData)
      .enter()
      .append('path')
      .attr('d', arcCreator)
      .attr('fill', color)

      // un texte pour chaque tranche
      pie.selectAll('text')
      .data(pieData)
      .enter()
      .append('text')
      // .centroid permet de trouver le centre de la tranche
      .attr('transform', d => `translate(${arcCreator.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data.value)

      // la légende
      const legend = svg.append('g')
        .attr('transform', `translate(${HEIGHT-10})`)

      const RECT_WIDTH = 20

      // les carrés de couleur
      legend.selectAll('rect')
      .data(pieData)
      .enter()
      .append('rect')
      .attr('y', (d, i) => i * RECT_WIDTH)
      .attr('width', RECT_WIDTH)
      .attr('height', RECT_WIDTH)
      .attr('fill', color)

      // les noms de fruits
      legend.selectAll('text')
      .data(pieData)
      .enter()
      .append('text')
      .attr('x', RECT_WIDTH * 1.5)
      .attr('y', (d, i) => i * RECT_WIDTH + RECT_WIDTH * 0.75)
      .attr('width', RECT_WIDTH)
      .attr('height', RECT_WIDTH)
      .text(d => d.data.name)  