module.exports = {
    preset: 'js-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest' 
    },
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  };
  