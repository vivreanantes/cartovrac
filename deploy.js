#!/usr/bin/env node
const fs = require('fs');
// const Client = require('ssh2').Client;
const glob = require('glob');

const basePath = './dist';
const destinationPath = '/www/';
const config = {
  host: process.env.FTP_HOST,
  password: process.env.FTP_PASSWORD,
  username: process.env.FTP_USER,
};

var numberOfOpLaunched = 0;
var numberOfOpTerminated = 0;

let Client = require('ssh2-sftp-client');
let sftp = new Client();

// Check if the path is a directory and
// either create the directory on the server
// if it is a directory, or upload the file
// if it is a file.
function handlePath(path) {
  const relativeFile = path.replace(`${basePath}/`, '');
  const destination = `${destinationPath}/${relativeFile}`;

  if (fs.lstatSync(path).isDirectory()) {
    return createDirectory(destination);
  }

  return uploadFile(path, destination);
}

function createDirectory(destination) {
  console.log(`createDirectory=${destination}`);
  numberOfOpLaunched++;
  return sftp.mkdir(destination).then(() => {
    manageTerminatedOperation();
  }).catch((err) => {
    manageTerminatedOperation();
  });
}

function uploadFile(file, destination) {
  console.log(`uploadFile ${file}`);
  numberOfOpLaunched++;
  return sftp.put(file, destination).then(() => {
    manageTerminatedOperation();
  }).catch((err) => {
    manageTerminatedOperation();
  });
}

function manageTerminatedOperation() {
  numberOfOpTerminated++;
  if (numberOfOpTerminated >= numberOfOpLaunched) {
    console.log(`Process terminated with ${numberOfOpTerminated}`);
    sftp.end();
  } else {
    console.log(`Op terminated ; numberOfOpTerminated=${numberOfOpTerminated} ; numberOfOpLaunched=${numberOfOpLaunched}`);
  }
}

sftp.connect(config).then(() => {
    glob.sync(`${basePath}/**/*`).forEach(handlePath);
}).catch((err) => {
    console.log(err, 'catch error');
});