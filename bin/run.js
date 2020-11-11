#!/usr/bin/env node

// const pleaseUpgradeNode = require('please-upgrade-node');
// const cmd = require('commander');
// const debugLib = require('debug');
// const pkg = require('../package.json');
// const mtfHusky = require('../src');

// // 判断node版本是否支持
// pleaseUpgradeNode(pkg, {
//   message(requiredVersion) {
//     return `Husky requires Node ${requiredVersion}, can't run Git hook.`;
//   },
// });

// const debug = debugLib('mtf.husky:');

// cmd
//   .version(pkg.version)
//   .option('-c, --config [path]', 'Path to configuration file')
//   .option('-r, --relative', 'Pass relative filepaths to tasks')
//   .option('-x, --shell', 'Skip parsing of tasks for better shell support')
//   .option('-q, --quiet', 'Disable lint-staged’s own console output')
//   .option('-d, --debug', 'Enable debug mode')
//   .option(
//     '-p, --concurrent <parallel tasks>',
//     'The number of tasks to run concurrently, or false to run tasks serially',
//     true,
//   )
//   .parse(process.argv);

// debug('Running `mtf.husky@%s`', pkg.version);

// mtfHusky({
//   configPath: cmd.config,
//   relative: !!cmd.relative,
//   shell: !!cmd.shell,
//   quiet: !!cmd.quiet,
//   debug: !!cmd.debug,
//   concurrent: cmd.concurrent,
// })
//   .then((passed) => {
//     process.exitCode = passed ? 0 : 1;
//   })
//   .catch(() => {
//     process.exitCode = 1;
//   });

require("../src");