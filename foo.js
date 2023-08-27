const fs = require('fs')
const SimpleGit = require('simple-git')

const git = SimpleGit()

const HELP_INFO = `
This command is used to set the checkpoint of a certain language and save it into langMap.json.

Usage:
node foo.js <lang> <hash|branch|tag>

Example:
node foo.js zh 1234567
node foo.js zh main
node foo.js zh v1.0.0
`.trim()

const getCommitInfo = async (commit) => {
  try {
    const log = await git.log([commit, '-n', '1'])
    const { hash, date } = log.latest
    return { hash, date: new Date(date).toISOString().substring(0, 10) }
  } catch (err) {
    throw new Error(`Cannot get commit info for ${commit}`)
  }
}

const writeLangMap = async (lang, hash, date) => {
  const langJson = {}
  try {
    const previousContent = fs.readFileSync('./langMap.json', 'utf8')
    const previousJson = JSON.parse(previousContent)
    Object.assign(langJson, previousJson)
  }
  catch (err) {
    console.log('No previous langMap.json')
  }
  langJson[lang] = {
    hash,
    date,
  }
  fs.writeFileSync('./langMap.json', JSON.stringify(langJson, null, 2))
}

const run = async () => {
  if (process.argv.length < 3) {
    console.log(HELP_INFO)
    return
  }
  if (process.argv[2] === '-h' || process.argv[2] === '--help') {
    console.log(HELP_INFO)
    return
  }
  const lang = process.argv[2]
  const commit = process.argv[3] || 'main'
  const { hash, date } = await getCommitInfo(commit)
  await writeLangMap(lang, hash, date)
}

run()
