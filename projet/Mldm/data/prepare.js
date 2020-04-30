const fs = require('fs')

const fichier = fs.readFileSync('Metier_des_media_ NOGA_x6_2018.csv', 'utf-8')



const unique = (value, index, self) => {
    return self.indexOf(value) === index
}

const result = fichier
    .split('\n')
    .map(ligne => ligne.split(';'))
    .map(p => ({
        groupe: p[0],
        sousGroupe: p[1],
        nom: p[2],
        nombredeplace: p[4]
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


 console.log(
    JSON.stringify(result, null, 2)
)
 