const fs = require('fs');

class FileEdit {

    static async injectTextToFile(fileName, searchText, text) {
        var result = '';

        const lines = fs.readFileSync(fileName).toString().split('\n');

        for (const line of lines) {
            if (line.indexOf(searchText) != -1) {
                result += `${line}\n`;
                result += text;
            } else {
                result += `${line}\n`;
            }
        }

        fs.writeFileSync(fileName, result);
    }

    static async removeTextFromFile(fileName, searchText) {
        var result = '';

        const lines = fs.readFileSync(fileName).toString().split('\n');

        for (const line of lines) {
            if (line.indexOf(searchText) == -1) {
                result += `${line}\n`;
            }
        }

        fs.writeFileSync(fileName, result);
    }

}

module.exports = FileEdit;