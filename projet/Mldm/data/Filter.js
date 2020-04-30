const R = require('ramda')
const data = require('./data.json')
const sansTotaux = data.filter(d => d.groupe !== 'total' && d.sousGroupe !== 'X' && d.nom !== '')
const groupes = R.uniq(sansTotaux.map(d => d.groupe))
const sousGroupesParGroupe = groupe =>
    R.uniq(
        sansTotaux
        .filter(d => d.groupe === groupe)
        .map(d => d.sousGroupe)
    )
const metiersParSousGroupe = sousGroupe =>
    sansTotaux
    .filter(d => d.sousGroupe === sousGroupe)
    .map(d => ({
        name: d.nom,
        nombre: Number(d.nombredeplace)
    }))
console.log(
    JSON.stringify({
            name: 'Ingénieur média',
            children: groupes.map(groupe => ({
                name: groupe,
                children: sousGroupesParGroupe(groupe).map(sousGroupe => ({
                    name: sousGroupe,
                    children: metiersParSousGroupe(sousGroupe),
                })),
            }))
        },
        null,
        2
    )
)