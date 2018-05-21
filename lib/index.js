const numCPUs = require('os').cpus().length
const fsPromise = require('fs').promises
const { promisify } = require('util')
const execFile = promisify(require('child_process').execFile)
const { map, compose, split, head, printLn } = require('../../fp_rev/util')
const readFile = async filename => {
  try {
    let data = await fsPromise.readFile(filename, 'utf-8')
    return data
  } catch (err) {
    console.error(err)
  }
}
const installPackage = async v => {
  try {
    let {stdout, stderr, error} = await execFile('pip', ['install', v])
    let obj = {
      package: v,
      stdout: stdout,
      stderr: stderr,
      error: error
    }
    return obj
  } catch (err) {
      console.error(err)
  }
}
const child = async packages => {
  let pkgs = await packages
  let array = await pkgs.map(installPackage)
  array.map(async v => {
    let value = await v  
    console.log(value)
  })
}

const fileMeUp = file => readFile(file)
      .then(JSON.parse)
      .then(v => v.Dependencies)

compose(child, fileMeUp)('input.txt')
