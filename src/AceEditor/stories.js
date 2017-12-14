// @flow

import React from 'react'

import { storiesOf } from '@storybook/react'

import AceEditor from './'

const yamlValue = `
root: pa2
iconItemList:
  root: pa2
`.trim()

const cssValue = `
.name {
  font-family: Roboto;
}
`.trim()

storiesOf('Ace Editor', module)
  .add('Ace Mode', () => (
    <div className="w-100 h5">
      <AceEditor value={yamlValue} />
    </div>
  ))
  .add('Css Mode', () => (
    <div className="w-100 h5">
      <AceEditor mode="css" value={cssValue} />
    </div>
  ))
  .add('Use inside flex-auto', () => (
    <div className="vh-100 flex flex-column">
      <div className="flex-none pa2 bb b--light-gray">
        This is the Navigation
      </div>
      <div className="flex-auto relative">
        <div className="absolute absolute--fill">
          <AceEditor className="" value={yamlValue} />
        </div>
      </div>
    </div>
  ))
