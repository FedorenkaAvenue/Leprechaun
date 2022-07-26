const fs = require('fs');

if (process.env.NODE_ENV === 'dev') {
  require('dotenv').config({ path: '../.env' });
}

// TO DO
// const environment = process.env.NODE_ENV;
const targetPath = `./src/environments/environment.global.ts`;
const envConfigFile = `
export const environment = {
  langs: "${process.env.LANGS}",
  appName: "${process.env.APP_NAME}"
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
