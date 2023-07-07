export default {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'], // Add any other file extensions you're using
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
