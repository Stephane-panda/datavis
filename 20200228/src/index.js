import * as d3 from 'd3'


console.log(d3)
let width = 1000 
const WIDTH = width
const HEIGHT = width / 3
const MARGIN = 5
const body = d3.select("body")
const svg = body.append("svg").attr('height', HEIGHT).attr('width', WIDTH)

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
const BAR_WIDTH = WIDTH / DATA.length
// maintenant "d" représente un objet


const heightScale = d3.scaleLinear()
    .domain([0, d3.max(DATA, d => d.distance)]) // le maximum de distance
    .range([0, HEIGHT])

svg.selectAll('rect')
    .data(DATA)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * BAR_WIDTH)
    .attr('width', BAR_WIDTH - MARGIN)
    // nous devons passer d.distance à heightScale
    .attr('y', d => HEIGHT - heightScale(d.distance))
    .attr('height', d => heightScale(d.distance))