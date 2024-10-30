const { defineConfig } = require("cypress");

const DEFAULT_TIMEOUT = 500000;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://jira.ivorreic.com/project/board",
    env: {
      baseUrl: "https://jira.ivorreic.com/",
    },
    defaultCommandTimeout: DEFAULT_TIMEOUT,
    execTimeout: DEFAULT_TIMEOUT,
    taskTimeout: DEFAULT_TIMEOUT,
    pageLoadTimeout: DEFAULT_TIMEOUT,
    requestTimeout: DEFAULT_TIMEOUT,
    responseTimeout: DEFAULT_TIMEOUT,
  },
});
