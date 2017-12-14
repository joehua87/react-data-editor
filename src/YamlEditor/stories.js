// @flow

import React from 'react'

import { storiesOf } from '@storybook/react'

import YamlEditor from './'

const initialData = {
  root: 'pa2',
  items: {
    root: 'root-data',
    title: 'title-data',
    subtitle: 'subtitle-data',
    iconItemList: {
      root: null,
      itemWrapper: {
        item: {
          root: 'root-data',
          title: 'title-data',
          subtitle: 'subtitle-data',
        },
      },
    },
  },
}

class YamlEditorExample extends React.Component<any, any> {
  state = { data: initialData }
  onDataChange = (data) => {
    this.setState({ data })
  }
  render() {
    const { data } = this.state
    return (
      <YamlEditor
        className="w-100 vh-100"
        data={data}
        onDataChange={this.onDataChange}
      />
    )
  }
}

storiesOf('Yaml Data Editor', module).add('default', () => (
  <YamlEditorExample />
))
