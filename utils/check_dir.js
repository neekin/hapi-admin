const fs = require('fs-extra');


module.exports = {
  createDir(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
  },
  checkDir(dir){
    return fs.existsSync(dir)
  }
};
