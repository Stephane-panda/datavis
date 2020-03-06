/* const R = require('ramda')
let url = "https: //jsonplaceholder.typicode.com" */


/* fetch(`${url}/posts`)
    .then(r => r.json())
    .then(console.log)

fetch(`${url}/users`)
    .then(r => r.json())
    .then(console.log) */

const fetch = require('node-fetch')
const R = require('ramda')
const url = 'https://jsonplaceholder.typicode.com'

const urlPosts = `${url}/posts`
const urlUsers = `${url}/users`

const fixUser = user => ({
    ville: R.path(['address', 'city'], user),
    nom_utilisateur: R.prop('username', user),
    nom_companie: R.path(['company', 'name'], user)
})

const fixPost = post => ({
    ville: R.path(['address', 'city'], post),
    nom_utilisateur: R.prop('username', post),
    nom_companie: R.path(['company', 'name'], post)
})



let getUsers = fetch(urlUsers)
    .then(r => r.json())
    .then(users => {
        console.log(users.map(fixUser))
    })

let getPost = fetch(urlPosts)
    .then(r => r.json())
    .then(R.map(R.pick(['userId', 'title']))
        .then(console.log))
    .catch(console.log)

Promise.all([
        getUsers(),
        getPost()
    ])
    .then()
    .catch(console.log)