const request = require('request')
const fs = require('fs')
const { join } = require('path')
const pokemon = require('./pokemon-names.json')

const baseURL = 'https://play.pokemonshowdown.com/sprites/'

const versions = [
  { version: 'bwani', format: 'gif', nameTransform: simpleCase },
  { version: 'xyani', format: 'gif', nameTransform: simpleCase }
]

versions.forEach((config) => {
  pokemon.forEach((name, i) => {
    if (typeof name === 'string') download({ name, number: i + 1, config })
    else name.forEach(n => download({ name: n, number: i + 1, config }))
    // nidoran has a male and female version but the same number...
  })
})

function download ({ name, number, config }) {
  const { version, format, nameTransform } = config

  var path = join(
    __dirname,
    `sprites/${version}/${simpleFilename(name, number)}.${format}`
  )

  request(`${baseURL}/${version}/${nameTransform(name)}.${format}`)
    .on('error', console.log)
    .pipe(fs.createWriteStream(path))
}

function simpleCase (name) {
  // this is the format that our baseUrl happens to use.
  return name
    .toLowerCase()
    .replace(' ', '')
    .replace("'", '')
    .replace(/female$/, 'f')
    .replace(/male$/, 'm')
}

function simpleFilename (name, number) {
  var _number = Array.from(String(number))
  while (_number.length < 3) _number.unshift(0)

  _number = _number.join('')

  const _name = name
    .toLowerCase()
    .replace(' ', '-')
    .replace("'", '-')

  return `${_number}.${_name}`
}
