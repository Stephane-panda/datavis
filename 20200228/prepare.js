const fs = require('fs')

const fichier = fs.readFileSync('data.csv', 'utf-8')



const unique = (value, index, self) => {
    return self.indexOf(value) === index
}

const result = fichier
    .split('\n')
    .map(ligne => ligne.split(','))
    .map(p => ({
        nom: p[0],
        distance: p[1],
    }))
    //.filter(p.nom => distinct)

// hummm 

  /*   for (const p of list) {
        if (!map.has(p.id)) {
            map.set(p.id, true); // set any value to Map
            list.push({
                id: p.id,
                name: p.name
            });
        }
    } */



    console.log(result)
    
 

 console.log(
    JSON.stringify(result, null, 2)
)
 