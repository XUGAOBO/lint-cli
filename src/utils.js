const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');

// 查找package.json文件
function findPackageJson(startDir) {
  let dir = path.resolve(startDir || process.cwd());

  do {
    const pkgFile = path.join(dir, 'package.json');

    if (!fs.existsSync(pkgFile) || !fs.statSync(pkgFile).isFile()) {
      dir = path.join(dir, '..');
      continue;
    }
    return pkgFile;
  } while (dir !== path.resolve(dir, '..'));
  return null;
}

// 安装
function installSyncSaveDev(packages) {
  const packageList = Array.isArray(packages) ? packages : [packages];
  const npmProcess = spawn.sync('npm', ['i', '--save-dev'].concat(packageList),
    { stdio: 'inherit' });
  const error = npmProcess.error;

  if (error && error.code === 'ENOENT') {
    const pluralS = packageList.length > 1 ? 's' : '';

    console.error(`Could not execute npm. Please install the following package${pluralS} with a package manager of your choice: ${packageList.join(', ')}`);
  }
}


module.exports = {
  installSyncSaveDev,
  findPackageJson,
};
