const SimpleGit = require('simple-git')
const git = SimpleGit()

const getLangMap = async (targetLang) => {
  const log = await git.log(['-n', '100', '--date=short'])
  let targetHash = ''
  if (log && log.all) {
    log.all.some(({ date, message }) => {
      const matched = message.match(/^docs\((.+)\)\: sync to (\w+)/)
      if (matched && matched[1] === targetLang) {
        targetHash = matched[2]
        return true
      }
      return false
    })
  }
  return targetHash
}

const run = async () => {
  const targetLang = process.argv[2]
  if (targetLang) {
    const targetHash = await getLangMap(targetLang)
    if (targetHash) {
      console.log(`The last checkpoint of docs(${targetLang}) is ${targetHash}.\n`)
      const result = await git.diff([`${targetHash}..main`, 'README.md'])
      console.log(result)
    } else {
      console.log(`No docs(${targetLang}) checkpoint found.\n`)
    }
  } else {
    console.log('Usage: node bar.js <lang>')
  }
}

run()
