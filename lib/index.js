const fsPromise = require('fs').promises
const { promisify } = require('util')
const execFile = promisify(require('child_process').execFile)

const readFile = async filename => {
  try {
    return await fsPromise.readFile(filename, 'utf-8')
  } catch (err) {
    throw err
  }
}

const installPackage = async (v, i) => {
  try {
    let { stdout, stderr } = await execFile('pip', ['install', v])
    if (stdout.includes('Requirement already satisfied')) console.log(`Package: ${v} already installed`)
    else console.log(`Package: ${v} successfully installed`)
    return ({stdout: stdout, stderr: stderr})
  } catch (err) {
    console.log(`Package: ${v} failed to install\n${err}`)
  }
}

const fileMeUp = file =>
      readFile(file)
      .then(JSON.parse)
      .then(v => v.Dependencies)
      .then(v => v.map(installPackage))
      .catch(err => console.error(err))

fileMeUp('input.txt')
