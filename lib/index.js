// const util = require('util')
// const exec = util.promisify(require('child_process').exec)

// async function lsExample () {
//   const { stdout, stderr } = await exec('cd ../; git init')
//   console.log('stdout: ', stdout)
//   console.log('stdout: ', stderr)
// }

// lsExample()
const numCPUs = require('os').cpus().length
const fsPromise = require('fs').promises
const { promisify } = require('util')
const execFile = promisify(require('child_process').execFile)
const { map, compose, split, head } = require('../../fp_rev/util')
const readFile = async filename => {
  try {
    let data = await fsPromise.readFile(filename, 'utf-8')
    return data
  } catch (err) {
    throw Error(err)
  }
}
const child = async package => {
  const {stdout, stderr, error} = await execFile('pip', ['install', await package])
  console.log('stdout:', stdout)
  console.log('stdout:', stderr)
  console.log('error:', error)
}

const fileMeUp = file => readFile(file)
      .then(JSON.parse)
      .then(v => v.Dependencies)
      .then(head)

compose(child, fileMeUp)('input.txt')
