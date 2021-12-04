const path = require('path');
const { spawn } = require('child_process');

const start = () => {
  spawn('yarn', ['start'], {
    cwd: path.join(__dirname, '../server'),
    stdio: 'inherit',
  });
};

start();
