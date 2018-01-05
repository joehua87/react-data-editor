// @flow

import React from 'react'
import Loadable from 'react-loadable'
import cn from 'classnames'
import dotProp from 'dot-prop-immutable'
import AceEditor from 'AceEditor'
import yaml from '../yaml'

type YamlEditorProps = {
  data: any,
  onDataChange: Function,
  path?: string[],
  onPathChange?: Function,
  submitBindKey?: { win: string, mac: string },
  cancelBindKey?: { win: string, mac: string },
  className?: string,
}

const Tag = Loadable({
  loader: () => import('antd/lib/tag'),
  loading: () => null,
  delay: 200,
  timeout: 10000,
})

function YamlError({
  error,
}: {
  error: {
    message: string,
    parsedLine: number,
    snippet: string,
  }
}) {
  const {
    message,
    parsedLine,
    snippet,
  } = error
  return (
    <div className="dark-red f7">
      <div>{message} (Line {parsedLine}). Snippet: <code className="dark-green">{snippet}</code></div>
    </div>
  )
}

class YamlEditor extends React.Component<YamlEditorProps, any> {
  static defaultProps = {
    submitBindKey: { win: 'Ctrl-S', mac: 'Command-S' },
    cancelBindKey: { win: 'Ctrl-C', mac: 'Command-C' },
  }
  constructor(props: any, context: any) {
    super(props, context)
    const path = []
    const { keys, ymlValue } = this.getSelectedData(path)
    this.state = {
      path: [],
      keys,
      ymlValue,
      pristine: true,
      error: null,
    }
  }

  componentWillReceiveProps({ data }: YamlEditorProps) {
    if (data !== this.props.data) {
      const path = this.props.path || this.state.path
      const { keys, ymlValue } = this.getSelectedData(path, data)
      this.setState({
        path,
        keys,
        ymlValue,
        pristine: true,
      })
    }
  }

  commands = [
    {
      name: 'onSubmit',
      bindKey: this.props.submitBindKey,
      exec: () => this.submitYmlChange(),
    },
    {
      name: 'onCancel',
      bindKey: this.props.cancelBindKey,
      exec: () => this.cancelYmlChange(),
    },
  ]

  /*
   * path: path to change
   * data: in case when we need to get selected data when props changed (via componentWillReceiveProps)
   */
  getSelectedData = (path: string[], data?: any): { keys: string[], ymlValue: string } => {
    const selectedData = dotProp.get(data || this.props.data, path)
    const ymlValue = yaml.stringify(selectedData)
    const keys = Object.keys(selectedData).filter(
      key => typeof selectedData[key] === 'object',
    )
    return {
      keys,
      ymlValue,
    }
  }

  removeKey = (idx: number) => {
    const path = this.state.path.slice(0, idx)
    if (this.props.onPathChange) this.props.onPathChange(path)
    const { keys, ymlValue } = this.getSelectedData(path)
    this.setState({
      key: '',
      path,
      ymlValue,
      keys,
    })
  }

  onKeySelect = (e: any) => {
    const key = e.target.value
    if (!key) return
    const path = [...this.state.path, key]
    if (this.props.onPathChange) this.props.onPathChange(path)
    const { keys, ymlValue } = this.getSelectedData(path)
    this.setState({
      key,
      path,
      ymlValue,
      keys,
    })
  }

  onYmlValueChange = (ymlValue: string) => {
    this.setState({ ymlValue, pristine: false })
  }

  submitYmlChange = () => {
    const { path, ymlValue } = this.state
    try {
      const selectedData = yaml.parse(ymlValue)
      const data = dotProp.set(this.props.data, path, selectedData)
      this.setState({ pristine: true, error: null }, () => {
        this.props.onDataChange(data)
      })
    } catch (error) {
      this.setState({ error })
    }
  }

  cancelYmlChange = () => {
    const { ymlValue } = this.getSelectedData(this.state.path)
    this.setState({ ymlValue, pristine: true })
  }

  renderNavContent = () => {
    const { key, keys, pristine } = this.state
    const path = this.props.path || this.state.path
    return (
      <React.Fragment>
        <div className="flex flex-wrap">
          {!pristine && <div className="mr2">*</div>}
          {path.map((k, idx) => (
            <Tag key={idx} closable onClose={() => this.removeKey(idx)}>
              {k}
            </Tag>
          ))}
          <select value={key} onChange={this.onKeySelect} disabled={!pristine}>
            <option value="">Select</option>
            {keys.map(k => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
      </React.Fragment>
    )
  }

  render() {
    const { ymlValue } = this.state
    return (
      <div className={cn('flex flex-column', this.props.className)}>
        <div className="flex-none pa2 bb b--light-gray">
          {this.renderNavContent()}
        </div>
        <div className="flex-auto relative">
          <div className="absolute absolute--fill">
            <AceEditor
              value={ymlValue}
              onChange={this.onYmlValueChange}
              commands={this.commands}
            />
          </div>
        </div>
        {this.state.error && (
          <div className="flex-none pa2 bb b--light-gray">
            <YamlError error={this.state.error} />
          </div>
        )}
      </div>
    )
  }
}

export default YamlEditor
