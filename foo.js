const SimpleGit = require('simple-git')
const git = SimpleGit()

const langList = ['zh']

const getLangMap = async () => {
  const langMap = new Map()
  const log = await git.log(['-n', '100', '--date=short'])
  if (log && log.all) {
    let langLeft = langList.length
    log.all.some(({ date, message }) => {
      const matched = message.match(/^docs\((.+)\)\: sync to (\w+)$/)
      if (matched) {
        const lang = matched[1]
        const hash = matched[2]
        if (!langMap.has(lang)) {
          langMap.set(lang, {
            hash,
            // format: 'YYYY-MM-DD'
            date: new Date(date).toISOString().slice(0, 10),
          })
          langLeft--
          if (langLeft === 0) {
            return true
          }
        }
      }
      return false
    })
  }
  return langMap
}

const writeLangMap = async (langMap) => {
  const langObj = {}
  langMap.forEach((value, key) => {
    langObj[key] = value
  })

  const fs = require('fs')
  fs.writeFileSync('./langMap.json', JSON.stringify(langObj, null, 2))
}

const run = async () => {
  const langMap = await getLangMap()
  await writeLangMap(langMap)
}

run()
