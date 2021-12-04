const path = require('path');
const { spawn, spawnSync } = require('child_process');

const start = () => {
  spawn('yarn', ['build'], {
    cwd: path.join(__dirname, '../server'),
    stdio: 'inherit',
  });

  // 同步执行，然后拷贝打包产物
  spawnSync('yarn', ['build'], {
    cwd: path.join(__dirname, '../client'),
    stdio: 'inherit',
  });
  spawnSync('mv', ['dist', '../server/public'], {
    cwd: path.join(__dirname, '../client'),
    stdio: 'inherit',
  });
};

start();
