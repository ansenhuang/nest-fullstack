const path = require('path');
const { spawn } = require('child_process');

const start = () => {
  spawn('yarn', ['build'], {
    cwd: path.join(__dirname, '../client'),
    stdio: 'inherit',
  });
  spawn('yarn', ['build'], {
    cwd: path.join(__dirname, '../server'),
    stdio: 'inherit',
  });
};

start();
