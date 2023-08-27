# translation-workflow-demo

v6

This is just a demo of new translation workflow for GitHub repos in Vue ecosystem like [Vue Router](https://github.com/vuejs/router), [Pinia](https://github.com/vuejs/pinia), [Vue 3 Migration Guide](https://github.com/vuejs/v3-migration-guide), etc.

You can also refer to these [example PRs](https://github.com/Jinjiang/translation-workflow-demo/pulls?q=is%3Apr).

## Features

- Friendly translation workflow.
- Able to show latest checkpoint for each language on the website.
- Comparing to the current workflow on [Vue Router](https://github.com/vuejs/router/blob/6cc5b00d4ff0b5f45071de6d02c5984b3df3382f/.github/contributing.md#contributing-docs), neither checkpoint branches nor commit log format are required.
- _People just need one more step to keep the `langMap.json` updated when each time they update their translations._

## Usage

### Translation workflow

For contributors/translators:

1. run `node bar.js <lang>` to see checkpoint and changes to be translated
2. create a new git branch
3. do the translation
4. run `ndoe foo.js <lang>` to update the `langMap.json` before the translation commit
5. create a PR on GitHub

For maintainer:

1. review and approve
2. normal merge or squash merge (they both work)

### Local tools

- `node foo.js <lang> [<branch>|<tag>|<commit>]`: update the checkpoint info of a certain language into `langMap.json`.
- `node bar.js <lang> [<branch>|<tag>|<commit>]`: see what translation you need to do to sync up with the original docs.

### Config on Netlify

- Build command: `node foo.js && npm run build`
- Publish directory: `.vitepress/dist`
