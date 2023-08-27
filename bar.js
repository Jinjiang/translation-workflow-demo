const fs = require('fs')
const SimpleGit = require('simple-git')

const git = SimpleGit()

const HELP_INFO = `
This command is used to compare the difference between the last checkpoint of a certain language and the current commit.

Usage:
node bar.js <lang> <hash|branch|tag>

Example:
node bar.js zh 1234567
node bar.js zh main
node bar.js zh v1.0.0
`.trim()

const getLangHash = async (lang) => {
  try {
    const content = fs.readFileSync('./langMap.json', 'utf8')
    const langJson = JSON.parse(content)
    return langJson[lang]?.hash
  } catch (err) {
    console.log('No previous langMap.json')
  }
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

  const hash = await getLangHash(lang)
  if (hash) {
    console.log(`The last checkpoint of docs(${lang}) is ${hash}.\n`)
    const result = await git.diff([`${hash}..${commit}`, 'README.md'])
    console.log(result)
    console.log(`\nAfter finishing the translation, you can run "node foo.js ${lang} ${hash}" or "node foo.js ${lang}${commit !== 'main' ? ' ' + commit : ''}" to update the checkpoint.`)
  } else {
    console.log(`No docs(${lang}) checkpoint found.\n`)
    console.log(HELP_INFO)
  }
}

run()
