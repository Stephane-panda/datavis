import {
    geoPath,
    geoMercator,
    select
} from 'd3'

import routes from '/routes.json'
import batiments from '/batiments.json'
import moi from '/chezmoi.json'




const WIDTH = 800
const HEIGHT = 500

// la projection
const projection = geoMercator()
    .fitExtent([
        [0, 0],
        [WIDTH, HEIGHT]
    ], batiments) // centrer la carte sur les bâtiments

// le constructeur d'attribut "d" pour les éléments <path>
const pathCreator = geoPath().projection(projection)

// le svg
const svg = select('body').append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)

// un groupe pour les routes
const groupeRoutes = svg.append('g')

// un <path> par route
groupeRoutes.selectAll('path')
    .data(routes.features)
    .enter()
    .append('path')
    .attr('d', pathCreator)
    .attr('fill', 'none')
    .attr('stroke', 'lightgray')
    .attr('stroke-width', 3)

// un groupe pour les bâtiments
const groupeBatiments = svg.append('g')

// un <path> par bâtiment
groupeBatiments.selectAll('path')
    .data(batiments.features)
    .enter()
    .append('path')
    .attr('d', pathCreator)
    .attr('fill', 'indianred')
    .attr('stroke', 'black')


    console.log(moi.features)
const chezmoi = svg.append('g')
chezmoi.selectAll('path')
    .data(moi.features)
    .enter()
    .append('path')
        .attr('d', pathCreator)
    
        .attr('stroke', 'black')
    .attr('fill', 'forestgreen')