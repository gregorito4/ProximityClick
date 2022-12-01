require('dotenv').config();

const app = require('./app');
require('./database');

//---- Code that makes server runs ---//
async function main() {
  await app.listen(app.get('port'));
  console.log(`Server is running in port: ${app.get('port')}`);
}

main();