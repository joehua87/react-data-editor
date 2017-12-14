// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import Example from './Example'
import PathPropsExample from './PathPropsExample'

storiesOf('Yaml Data Editor', module)
  .add('not use path props', () => <Example />)
  .add('use path props', () => <PathPropsExample />)
