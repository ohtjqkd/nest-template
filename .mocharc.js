module.exports = {
  extension: ['ts'],
  spec: ['src/**/*.mocha.spec.ts', 'test/**/*.mocha.spec.ts'],
  require: ['ts-node/register', 'tsconfig-paths/register'],
};
