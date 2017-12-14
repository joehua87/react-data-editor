/* eslint-disable global-require */

// @flow

import React from 'react'
import Loadable from 'react-loadable'
import Loader from 'Loader'

const Editor = Loadable({
  loader: () => import('react-ace'),
  loading: Loader,
})

type AceEditorProps = {
  mode?: string,
  theme?: string,
  value: string,
  onChange: (value: string) => void,
  onSave?: Function,
  onPreview?: Function,
}

export default class AceEditor extends React.PureComponent<
  AceEditorProps,
  any,
> {
  static defaultProps = {
    mode: 'yaml',
    theme: 'monokai',
    commands: [],
  }

  editor: any
  loadTheme = () => {
    require('brace/theme/monokai')
    require('brace/theme/github')
    require('brace/theme/tomorrow')
    require('brace/theme/kuroir')
    require('brace/theme/twilight')
    require('brace/theme/xcode')
    require('brace/theme/textmate')
    require('brace/theme/solarized_dark')
    require('brace/theme/solarized_light')
    require('brace/theme/terminal')
  }

  loadMode = () => {
    // console.log(`Load ${mode}`)
    require('brace/mode/yaml')
    require('brace/mode/css')
    // TODO: The script below don't works when change mode, the Editor doesn't reload
    /*
    switch (mode) {
      case 'yaml':
        require('brace/mode/yaml')
        break
      case 'css':
        require('brace/mode/css')
        break
      default:
        break
    }
    */
  }

  componentDidMount() {
    require('brace')
    require('brace/ext/language_tools')
    this.loadTheme()
    this.loadMode()
  }

  /*
   * Enable this if fixed loadMode
  componentWillReceiveProps({ mode }: AceEditorProps) {
    if (mode !== this.props.mode) {
      this.loadMode()
    }
  }
  */

  render() {
    const {
      value,
      onChange,
      onSave,
      onPreview,
      ...props
    } = this.props
    const setOptions = {
      tabSize: 2,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    }

    return (
      <Editor
        ref={(editor) => {
          this.editor = editor
        }}
        editorProps={{
          $blockScrolling: Infinity,
        }}
        mode={this.props.mode}
        theme={this.props.theme}
        width="100%"
        height="100%"
        wrapEnabled
        value={value || ''}
        onChange={onChange}
        setOptions={setOptions}
        {...props}
      />
    )
  }
}
