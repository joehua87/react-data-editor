// @flow

import 'yamljs/dist/yaml'

export default {
  stringify: (object: any): string => {
    const yml = window.YAML.stringify(object, 16, 2)
    return yml
  },
  parse: (yml: string) => window.YAML.parse(yml),
}
