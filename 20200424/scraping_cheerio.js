const cheerio = require('cheerio')
const fs = require('fs')

const page = fs.readFileSync('page.html', 'utf-8')

const $ = cheerio.load(page)



//logique 
let result = []

const row = $('body > div.wrapper > div.container.test-site > div > div.col-md-9 > div')
const element = $('div', row)
element.each((index, h4) => {
    if (index !== 0) {
        result.push({
            nom: $('  div > div.caption', h4.title).text(),
            prix: $('  div > div.caption', h4.price).text(),
            
        })
    }
    console.log(element)
})
console.log(result)
console.log(
    JSON.stringify(
        result.map(d => ({
            ...d,
            titres: Number(d.titres)
        }))
    )
) 