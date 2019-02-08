#!/usr/bin/env node
const fs = require('fs');
const FtpClient = require('ftp');
const glob = require('glob');

const basePath = './dist';
const destinationPath = '/www/';
const config = {
  host: process.env.FTP_HOST,
  password: process.env.FTP_PASSWORD,
  user: process.env.FTP_USER,
};

const ftpClient = new FtpClient();

function createDirectory(destination) {
  return ftpClient.mkdir(destination, true, (error) => {
    if (error) throw error;

    ftpClient.end();
  });
}

function uploadFile(file, destination) {
  ftpClient.put(file, destination, (error) => {
    if (error) throw error;

    console.log(`${file} => ${destination}`);
    ftpClient.end();
  });
}

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

function sendFilesToFtp() {
  glob.sync(`${basePath}/**/*`).forEach(handlePath);
}

ftpClient.on('ready', () => {
  // Get an array of all files and directories
  // in the given base path and send them to the
  // `handlePath()` function to decide if a
  // directory is created on the server or the
  // file is uploaded.
  console.log(`Sending files`);
  sendFilesToFtp();
});

ftpClient.connect(config);