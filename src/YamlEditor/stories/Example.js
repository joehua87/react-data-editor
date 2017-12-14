// @flow

import React from 'react'
import YamlEditor from '../'
import initialData from './data.yml'

class YamlEditorExample extends React.Component<any, any> {
  state = { data: initialData }
  onDataChange = (data: any) => {
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

export default YamlEditorExample
