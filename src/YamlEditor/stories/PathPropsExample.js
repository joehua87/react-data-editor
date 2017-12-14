// @flow

import React from 'react'
import { action } from '@storybook/addon-actions'
import YamlEditor from '../'
import initialData from './data.yml'

class PathPropExample extends React.Component<any, any> {
  state = { data: initialData, path: [] }

  onDataChange = (data: any) => {
    this.setState({ data }, () => {
      action('change data')(data)
    })
  }

  onPathChange = (path: string[]) => {
    this.setState({ path }, () => {
      action('change path')(path)
    })
  }

  render() {
    const { data, path } = this.state
    return (
      <YamlEditor
        className="w-100 vh-100"
        data={data}
        onDataChange={this.onDataChange}
        path={path}
        onPathChange={this.onPathChange}
      />
    )
  }
}
export default PathPropExample
