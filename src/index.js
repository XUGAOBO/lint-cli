const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');
const chalk = require('chalk');
const inquirer = require('inquirer');
const utils = require('./utils');

const rootDir = process.cwd();

const type_enum = {
  js: 'js',
  ts: 'ts',
}

const common_modules = ['eslint@7.5.0', 'eslint-config-airbnb@18.2.0', 'eslint-config-prettier@6.11.0', 'eslint-plugin-import@2.22.0', 'eslint-plugin-jsx-a11y@6.3.1', 'eslint-plugin-prettier@3.1.4', 'eslint-plugin-react@7.20.3', 'eslint-plugin-react-hooks@4.0.8', 'husky@4.2.5', 'lint-staged@10.2.11', 'prettier@2.0.5'];
const js_modules = common_modules.concat(['babel-eslint@10.1.0']);
const ts_modules = common_modules.concat(['@typescript-eslint/eslint-plugin@3.7.1', '@typescript-eslint/parser@3.7.1']);

(function() {
  if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) { // .length of function is 2
        'use strict';
        if (target === null || target === undefined) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
  
        var to = Object(target);
  
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
  
          if (nextSource !== null && nextSource !== undefined) { 
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }
}());

function getModules(type) {
  return type === type_enum.js ? js_modules : ts_modules;
}

// 查找package.json文件是否存在
const packageJsonPath = utils.findPackageJson(rootDir);
if (!packageJsonPath) {
  console.log(chalk.red('找不到package.json文件!'));
  return;
}
console.log(chalk.green('lint检测...'));

// 判断是否配置eslint规范
// 参照https://cn.eslint.org/docs/user-guide/configuring配置规则
function hasEslintConfig() {
  const config = require(packageJsonPath);
  if (config.eslintConfig) return true;
  const extnameList = ['', '.js', '.yml', '.yaml', '.json'];
  let hasEslint = false;

  // 判断根目录下面是否存在eslint配置文件
  fs.readdirSync(rootDir).forEach((name) => {
    if (fs.statSync(`${rootDir}/${name}`)) {
      const extname = path.extname(name);
      const basename = path.basename(name, extname);
      if (basename === '.eslintrc' && extnameList.indexOf(extname.toLowerCase()) > -1) {
        hasEslint = true;
      }
    }
  });
  return hasEslint;
}

// 安装eslint依赖包
function installModules(type) {
  console.log(chalk.green('正在安装...'));
  utils.installSyncSaveDev(getModules(type));
}

// 拷贝eslint配置文件
function copyRulesConfig(type) {
  const rulesPath = path.join(__filename, '../../lib/' + type + '/');
  spawn.sync('cp', ['-r', rulesPath, process.cwd()]);
}

// 修改package.json文件
function modifyPackageJson(projectType) {
  const config = require(packageJsonPath);
  config.husky = {
    hooks: {
      'pre-commit': 'lint-staged',
    },
  };
  config['lint-staged'] = {
    'app/**/*.{js,jsx,ts,tsx,json,css,scss,md}': [
      'prettier --write',
      'git add',
    ],
  };
  config['prettier'] = {
    "singleQuote": true,
    "printWidth": 120,
    "trailingComma": "all",
    "tabWidth": 2,
    "jsxBracketSameLine": false,
    "jsxSingleQuote": false
  };
  if (!config['devDependencies']) {
    config['devDependencies'] = {}
  }
  const modules = getModules(projectType);

  for(var i = 0; i < modules.length; i++) {
    var item = modules[i];
    var moduleArr = item.split('@');
    config['devDependencies'][moduleArr[0]] = '^'+ moduleArr[1];

  }

  if (!config['scripts']) {
    config['scripts'] = {}
  }
  config['scripts']['block-lint'] = './node_modules/.bin/block-lint';

  const fd = fs.openSync(packageJsonPath, 'w');
  fs.writeFileSync(packageJsonPath, JSON.stringify(config, null, 2), 'utf8');
  fs.closeSync(fd);
}

inquirer.prompt([
  {
    type: 'list',
    name: 'projectType',
    message: '项目中使用语言类型?',
    choices: [type_enum.js, type_enum.ts],
    filter: function(val) {
      return val.toLowerCase();
    }
  },
  {
    type: 'confirm',
    name: 'executeInstallation',
    message: '检测到项目中存在eslint配置, 是否覆盖?',
    default: true,
    when() {
      return hasEslintConfig();
    },
  }
]).then((answers) => {
  const { projectType, executeInstallation } = answers;
  if (executeInstallation || executeInstallation === undefined) {
    installModules(projectType);
    copyRulesConfig(projectType);
    modifyPackageJson(projectType);
  }
});
