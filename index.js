const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const date = require('date-fns');
const dirPath = __dirname;
const logFolder = "Log";
const logFile = 'log.txt';
fs.watch(dirPath, [recursive = true], async function (event, fileName) {
    const logData = `${path.basename(fileName)}\t${date.format(new Date(), "dd/MM/yyyy\t HH:mm:ss")}\t type: `;
    let type;
    if (!fs.existsSync(path.join(dirPath, logFolder)))
        await fsPromises.mkdir(path.join(dirPath, logFolder));
    if (path.basename(fileName) === logFile || fileName.startsWith(logFolder))
        return false;
    if (fileName) {
        switch (event) {
            case "rename":
                if (fs.existsSync(fileName))
                    type = "create";
                else
                    type = "delete"
                break;
            case "change":
                type = "modify"
                break;
        };
        await fsPromises.appendFile(path.join(dirPath, logFolder, logFile), logData + type + "\n");
    }
});



