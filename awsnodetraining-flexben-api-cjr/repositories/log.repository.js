import { appendFile } from 'fs';

const FILE_NAME = './logs/log.txt';

let LogRepository = {
  write: (data, resolve, reject) => {
    let toWrite = "*".repeat(80) + "\r\n";
    toWrite += "Date/Time: " + new Date().toLocaleDateString() + "\r\n";
    toWrite += "Exception Info: " + JSON.stringify(data) + "\r\n";
    toWrite += "*".repeat(80) + "\r\n";
    appendFile(FILE_NAME, toWrite, (err) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(toWrite);
        }
      });
  }
};

export default LogRepository;