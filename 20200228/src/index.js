import * as d3 from 'd3'
import {
    selectAll
} from 'd3'


console.log(d3)
let width = 1000
const WIDTH = width
const HEIGHT = width / 3
const MARGIN = 5
const body = d3.select("body")
const svg = body.append("svg").attr('height', HEIGHT).attr('width', WIDTH)

svg.append('g')
    .append('rect')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .attr ('fill' , "none" )



const DATA = [{
        "nom": "CT Cha b",
        "distance": "165.0"
    },
    {
        "nom": "CHXR 73 b",
        "distance": "161.5"
    },
    {
        "nom": "HIP 78530 b",
        "distance": "156.7"
    },
    {
        "nom": "1RXS J160929.1-210524 b",
        "distance": "150.0"
    },
    {
        "nom": "GSC 06214-00210 b",
        "distance": "145.0"
    }
]

const MARGIN_left = 100
const MARGIN_bottom = 50
const BAR_WIDTH = (WIDTH - MARGIN_left) / DATA.length
// maintenant "d" représente un objet


const heightScale = d3.scaleLinear()
    .domain([0, d3.max(DATA, d => d.distance)]) // le maximum de distance
    .range([HEIGHT - MARGIN_bottom, 0 ])

const batons = svg.append('g')
.attr('transform', `translate(${MARGIN_left}, 0)`)


batons.selectAll('rect')
    .data(DATA)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * BAR_WIDTH)
    .attr('width', BAR_WIDTH - MARGIN)
    // nous devons passer d.distance à heightScale
    .attr('y', d =>  heightScale(d.distance))
    .attr('height', d => HEIGHT - MARGIN_bottom - heightScale(d.distance))
    .attr('fill', 'steelblue')

batons.selectAll('text')
    .data(DATA)
    .enter()
    .append('text')
    .text(d => d.nom)
    .attr('x', (d, i) => i * BAR_WIDTH + BAR_WIDTH/2)
    .attr('y', HEIGHT - MARGIN_bottom /2)
    .attr('text-anchor', 'middle')

    const axis = d3.axisLeft(heightScale)
        .ticks(5)
        .tickFormat(d => `${d}k`)

        const gAxis = svg.append('g')
            .attr('transform', `translate(${MARGIN_left  * 0.7}, 0)`)
            .call(axis)