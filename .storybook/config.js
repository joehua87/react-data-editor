import { configure } from '@storybook/react'

function loadStories() {
  require('../src/AceEditor/stories')
  require('../src/YamlEditor/stories')
}

configure(loadStories, module)
