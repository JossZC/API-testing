const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "baseURL": "",
    "excludeSpecPattern": "**/examples/**",
    "viewportHeight": 1080,
    "viewportWidth": 1920,
    "video": false,
    "env": {
      username: "artem.bondar16@gmail.com",
      password: "CypressTest1",
      apiURL: "https://simple-grocery-store-api.glitch.me/"
    },
    retries: {
      runMode: 1, //CI or CD
      openMode: 1 //cypress open
    }
  },
});
