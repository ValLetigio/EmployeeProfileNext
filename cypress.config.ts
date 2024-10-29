import { defineConfig } from "cypress";
import {plugins} from "cypress-social-logins";
const { GoogleSocialLogin } = plugins;
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        GoogleSocialLogin,
      });
      return config;
    },
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
  },
  env:{
    googleClientId : process.env.GOOGLE_CLIENT_ID,
    googleClientSecret : process.env.GOOGLE_CLIENT_SECRET,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
