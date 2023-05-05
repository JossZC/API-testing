const { defineConfig } = require("cypress");
const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      initPlugin(on, config);
      return config;
    },
    "baseURL": "",
    "excludeSpecPattern": [
      "**/examples/**",
      "**/__snapshots__/*",
      "**/__image_snapshots__/*",
    ],
    "viewportHeight": 1080,
    "viewportWidth": 1920,
    "video": false,
    retries: {
      runMode: 1, //CI or CD
      openMode: 1 //cypress open
    },
    projectId: "52tuio",
    "env": {
      "cypress-plugin-snapshots": {
        "imageConfig": {
          "threshold": 0.01
        }
      }
    }
  },
});
