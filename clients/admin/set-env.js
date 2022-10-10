const fs = require("fs");

if (!process.env.APP_NAME) {
  require("dotenv").config({ path: "../../.env" });
}

const { APP_NAME, LANGS, DOMAIN_API, DOMAIN_MEDIA } = process.env;

const TARGET_PATH = `./src/environments/environment.global.ts`;
const envConfigFile = `
export const environment = {
  langs: "${LANGS}",
  appName: "${APP_NAME}",
  apiEndpoint: "${DOMAIN_API}",
  mediaEndpoint: "${DOMAIN_MEDIA}",
};
`;

fs.writeFile(TARGET_PATH, envConfigFile, function (err) {
  if (err) console.error(err);

  console.log(`Output generated at ${TARGET_PATH}`);
});
