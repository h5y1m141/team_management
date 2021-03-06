// __test-utils__/custom-jest-environment.js
// Stolen from: https://github.com/ipfs/jest-environment-aegir/blob/master/src/index.js
// Overcomes error from jest internals.. this thing: https://github.com/facebook/jest/issues/6248

const NodeEnvironment = require('jest-environment-node')

class MyEnvironment extends NodeEnvironment {
  constructor(config) {
    super({
      ...config,
      globals: {
        ...config.globals,
        Uint32Array,
        Uint8Array,
        ArrayBuffer,
      },
    })
  }

  // eslint-disable-next-line class-methods-use-this
  async setup() {}

  // eslint-disable-next-line class-methods-use-this
  async teardown() {}
}

module.exports = MyEnvironment
