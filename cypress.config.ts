export default {
  projectId: 'lemon-mart',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on: any, config: any) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://lemonmart.angularforenterprise.com',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
}
