const path = require('path');
const { spawn } = require('child_process');

const start = () => {
  spawn('yarn', ['dev'], {
    cwd: path.join(__dirname, '../client'),
    stdio: 'inherit',
  });
  spawn('yarn', ['start:dev'], {
    cwd: path.join(__dirname, '../server'),
    stdio: 'inherit',
  });
};

start();
