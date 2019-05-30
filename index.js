const request = require('request')
const fs = require('fs')
const { join } = require('path')
const pokemon = require('./pokemon-names.json')

const baseURL = 'https://play.pokemonshowdown.com/sprites/'

const versions = [
  { version: 'bwani', format: 'gif', nameTransform: simpleCase },
  { version: 'xyani', format: 'gif', nameTransform: simpleCase }
]

pokemon.forEach(name => console.log(simpleCase(name)))

versions.forEach(({ version, format, nameTransform }) => {
  console.log(`# ${version}\n`)
  pokemon.forEach(name => {
    var fileName = `${nameTransform(name)}.${format}`
    var path = join(__dirname, `sprites/${version}/${fileName}`)

    request(`${baseURL}/${version}/${fileName}`)
      .on('error', console.log)
      .pipe(fs.createWriteStream(path))
  })
})

function simpleCase (name) {
  return name
    .toLowerCase()
    .replace(' ', '')
    .replace("'", '')
    .replace(/female$/, 'f')
    .replace(/male$/, 'm')
}
