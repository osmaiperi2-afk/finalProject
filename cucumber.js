require('dotenv').config();

module.exports = {
  default: {
    // Load TypeScript support
    requireModule: ['ts-node/register'],

    // Load support files and step definitions
    require: [
      'src/support/world.ts',
      'src/support/hooks.ts',
      'src/step-definitions/**/*.ts'
    ],

    // Location of feature files
    paths: ['features/**/*.feature'],

    // Reporters
    format: [
      'progress',
      'html:сucumber-reports/cucumber-report.html',
      'json:сucumber-reports/cucumber-report.json'
    ],

    // Generate async/await snippets
    formatOptions: {
      snippetInterface: 'async-await'
    },

    // Parallel execution
    parallel: 2,

    // Retry failed scenarios
    retry: 1,

    // Step timeout (60 seconds)
    timeout: 60000
  }

  
};
