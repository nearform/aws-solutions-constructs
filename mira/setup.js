const cp = require('child_process');
const args = require('minimist')(process.argv.slice(2));
const fs = require('fs');
if (!args['_'][0]) {
    console.warn('No app path supplied: node setup [appName]')
    process.exit();
}
const src = `${__dirname}/../source/use_cases/${args['_'][0]}`;
// Now, install the app.
cp.execSync('npm i', {
    cwd: src,
    encoding: 'utf8'
});
// Now, build the app.
cp.execSync('npm run build', {
    cwd: src
});
try { fs.mkdirSync(`${src}/config`); } catch (e) { }
try { fs.symlinkSync(`${__dirname}/config/default.json`, `${src}/config/default.json`); } catch (e) { }