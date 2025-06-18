/** @type {import('jest').Config} */
const { pathsToModuleNameMapper } = require('ts-jest'); 
const { compilerOptions } = require('./tsconfig'); 

const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: './tsconfig.json' }],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};

module.exports = config;
